import { IssueCategory, PrismaClient } from '../src/generated/prisma'
import Anthropic from '@anthropic-ai/sdk'

const prisma = new PrismaClient()
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// ── Types ────────────────────────────────────────────────────────────────────
interface ClassifyOutput {
  id: string
  category: IssueCategory
  severity: number // 1–10
}

// ── Classify a batch of complaints ───────────────────────────────────────────
async function classifyBatch(
  complaints: { id: string; title: string; content: string }[],
): Promise<ClassifyOutput[]> {
  const prompt = `You are classifying car complaints for a database. For each complaint, assign:

1. A category (pick ONE from this exact list):
ENGINE, TRANSMISSION, BRAKES, SUSPENSION, STEERING, ELECTRICAL, INFOTAINMENT, BATTERY, BODY, RUST, AIR_CONDITIONING, SAFETY, NOISE, FUEL_SYSTEM, COOLING, OTHER

2. A severity score from 1–10:
1-3 = minor annoyance (rattle, squeak, cosmetic)
4-6 = moderate issue (affects comfort or convenience, not dangerous)
7-8 = major issue (expensive repair, affects driveability)
9-10 = severe/safety-critical (engine failure, brake failure, risk of accident)

Complaints to classify:
${complaints.map((c, i) => `[${i}] ID: ${c.id}\nTitle: ${c.title}\nContent: ${c.content}`).join('\n\n')}

Return ONLY valid JSON, no markdown, no explanation:
{
  "results": [
    { "id": "...", "category": "...", "severity": 5 }
  ]
}`

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = response.content
    .filter((b) => b.type === 'text')
    .map((b) => (b as { type: 'text'; text: string }).text)
    .join('\n')
    .trim()
    .replace(/```json|```/g, '')
    .trim()

  try {
    const parsed = JSON.parse(text)
    return parsed.results as ClassifyOutput[]
  } catch (err) {
    console.error('Failed to parse response:', text.slice(0, 200))
    return []
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  // Fetch all complaints missing category or severity
  const complaints = await prisma.complaint.findMany({
    where: {
      OR: [
        { category: null },
        { severity: null },
      ],
    },
    select: { id: true, title: true, content: true },
  })

  console.log(`📋 Found ${complaints.length} complaints to classify\n`)

  if (complaints.length === 0) {
    console.log('✅ All complaints already classified.')
    return
  }

  const BATCH_SIZE = 10
  let updated = 0
  let failed = 0

  for (let i = 0; i < complaints.length; i += BATCH_SIZE) {
    const batch = complaints.slice(i, i + BATCH_SIZE)

    try {
      const results = await classifyBatch(batch)

      for (const result of results) {
        await prisma.complaint.update({
          where: { id: result.id },
          data: {
            category: result.category,
            severity: result.severity,
          },
        })
        updated++
      }

      console.log(`  ✓ Batch ${Math.floor(i / BATCH_SIZE) + 1} — ${results.length} classified (${updated}/${complaints.length})`)
    } catch (err) {
      console.error(`  ✗ Batch failed — ${err instanceof Error ? err.message : err}`)
      failed += batch.length
    }
  }

  console.log(`\n🎉 Done! Updated ${updated} complaints (${failed} failed)`)
}

main()
  .catch((e) => {
    console.error('❌ Script failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })