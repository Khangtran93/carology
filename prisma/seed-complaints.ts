import { PrismaClient } from '../src/generated/prisma'
import Anthropic from '@anthropic-ai/sdk'

const prisma = new PrismaClient()
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// ── Real documented issues (Australian market focus) ────────────────────────
interface KnownIssue {
  brand: string
  model: string
  years: number[]
  issue: string
  severity: 'minor' | 'major' | 'severe'
  count: number // how many complaints to generate
}

const KNOWN_ISSUES: KnownIssue[] = [
  // Toyota DPF class action
  {
    brand: 'Toyota', model: 'HiLux',
    years: [2015, 2016, 2017, 2018, 2019, 2020],
    issue: 'Defective diesel particulate filter (DPF) — vehicle fills with white smoke, DPF fails to regenerate in city driving, repeated dealer visits, oil dilution',
    severity: 'major', count: 15,
  },
  {
    brand: 'Toyota', model: 'LandCruiser Prado',
    years: [2015, 2016, 2017, 2018, 2019, 2020],
    issue: 'DPF regeneration issues on the 1GD-FTV diesel — black smoke, warning lights, dealer claims it is normal',
    severity: 'major', count: 8,
  },
  {
    brand: 'Toyota', model: 'Fortuner',
    years: [2015, 2016, 2017, 2018, 2019, 2020],
    issue: 'DPF clogging and white smoke from exhaust on 2.8L diesel',
    severity: 'major', count: 6,
  },

  // Ford Powershift class action
  {
    brand: 'Ford', model: 'Focus',
    years: [2011, 2012, 2013, 2014, 2015, 2016],
    issue: 'Powershift DPS6 dual-clutch transmission — shuddering, hesitation when taking off, jerky gear changes, eventual clutch failure',
    severity: 'major', count: 12,
  },
  {
    brand: 'Ford', model: 'Fiesta',
    years: [2011, 2012, 2013, 2014, 2015, 2016],
    issue: 'Powershift transmission shuddering and slipping, especially at low speeds',
    severity: 'major', count: 8,
  },
  {
    brand: 'Ford', model: 'EcoSport',
    years: [2013, 2014, 2015, 2016],
    issue: 'Powershift dual-clutch transmission failures and rough engagement',
    severity: 'major', count: 5,
  },

  // VW/Audi/Skoda DSG
  {
    brand: 'Volkswagen', model: 'Golf',
    years: [2010, 2011, 2012, 2013, 2014, 2015],
    issue: 'DSG transmission mechatronic unit failure — loss of drive, juddering, expensive repair out of warranty',
    severity: 'major', count: 10,
  },
  {
    brand: 'Volkswagen', model: 'Polo',
    years: [2010, 2011, 2012, 2013, 2014, 2015],
    issue: 'DSG gearbox issues — jerky shifts, hesitation, eventual mechatronic failure',
    severity: 'major', count: 6,
  },
  {
    brand: 'Volkswagen', model: 'Tiguan',
    years: [2010, 2011, 2012, 2013, 2014, 2015],
    issue: 'DSG transmission failure and loss of power in traffic',
    severity: 'major', count: 5,
  },
  {
    brand: 'Skoda', model: 'Octavia',
    years: [2010, 2011, 2012, 2013, 2014],
    issue: 'DSG dual-clutch transmission failures',
    severity: 'major', count: 4,
  },

  // Nissan CVT
  {
    brand: 'Nissan', model: 'X-Trail',
    years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
    issue: 'CVT (continuously variable transmission) shuddering, vibrating under acceleration, eventual transmission replacement needed',
    severity: 'major', count: 12,
  },
  {
    brand: 'Nissan', model: 'Pathfinder',
    years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
    issue: 'CVT belt slipping, overheating, juddering on hills',
    severity: 'major', count: 8,
  },
  {
    brand: 'Nissan', model: 'Pulsar',
    years: [2012, 2013, 2014, 2015, 2016],
    issue: 'CVT transmission issues and unusual whining noises',
    severity: 'major', count: 5,
  },
  {
    brand: 'Nissan', model: 'Qashqai',
    years: [2014, 2015, 2016, 2017, 2018, 2019],
    issue: 'CVT transmission shuddering and unreliable acceleration',
    severity: 'major', count: 6,
  },

  // Hyundai/Kia Theta II oil consumption
  {
    brand: 'Hyundai', model: 'Tucson',
    years: [2015, 2016, 2017, 2018, 2019],
    issue: 'Theta II 2.0L/2.4L engine — excessive oil consumption, engine knocking, eventual engine seizure',
    severity: 'severe', count: 10,
  },
  {
    brand: 'Hyundai', model: 'Santa Fe',
    years: [2013, 2014, 2015, 2016, 2017, 2018],
    issue: 'Engine oil consumption issue, burning oil between services',
    severity: 'major', count: 7,
  },
  {
    brand: 'Hyundai', model: 'i30',
    years: [2012, 2013, 2014, 2015, 2016],
    issue: 'Engine oil consumption and rough idle issues',
    severity: 'major', count: 5,
  },
  {
    brand: 'Kia', model: 'Sportage',
    years: [2015, 2016, 2017, 2018, 2019],
    issue: 'Theta II engine oil consumption — adding a litre between oil changes',
    severity: 'major', count: 8,
  },
  {
    brand: 'Kia', model: 'Sorento',
    years: [2014, 2015, 2016, 2017, 2018],
    issue: 'Engine oil burning, engine bearing failures reported',
    severity: 'major', count: 6,
  },

  // Holden issues
  {
    brand: 'Holden', model: 'Cruze',
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016],
    issue: 'Multiple electrical faults, water pump failures, timing chain stretch, transmission problems',
    severity: 'major', count: 10,
  },
  {
    brand: 'Holden', model: 'Captiva',
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
    issue: 'Engine timing chain failures, DPF problems on diesel, oil leaks, transmission breakdowns, electrical issues',
    severity: 'severe', count: 12,
  },
  {
    brand: 'Holden', model: 'Colorado',
    years: [2012, 2013, 2014, 2015, 2016],
    issue: 'DPF issues, turbo failures, harsh ride',
    severity: 'major', count: 5,
  },

  // Mazda diesel issues
  {
    brand: 'Mazda', model: 'CX-5',
    years: [2012, 2013, 2014, 2015, 2016],
    issue: 'DPF regeneration problems on 2.2L diesel, oil dilution, expensive repairs',
    severity: 'major', count: 8,
  },
  {
    brand: 'Mazda', model: 'BT-50',
    years: [2012, 2013, 2014, 2015, 2016, 2017],
    issue: 'DPF issues, EGR cooler failure on diesel',
    severity: 'major', count: 5,
  },

  // BMW diesel timing chain
  {
    brand: 'BMW', model: '3 Series',
    years: [2007, 2008, 2009, 2010, 2011, 2012, 2013],
    issue: 'N47 diesel timing chain failure — chain located at rear of engine, requires engine removal for replacement',
    severity: 'severe', count: 6,
  },
  {
    brand: 'BMW', model: '5 Series',
    years: [2007, 2008, 2009, 2010, 2011, 2012, 2013],
    issue: 'N47 timing chain stretch and failure on diesel models',
    severity: 'severe', count: 4,
  },

  // Subaru
  {
    brand: 'Subaru', model: 'Forester',
    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009],
    issue: 'Head gasket failures on EJ25 engine, coolant leaks',
    severity: 'major', count: 5,
  },
  {
    brand: 'Subaru', model: 'Liberty',
    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009],
    issue: 'Head gasket leaks and oil consumption',
    severity: 'major', count: 4,
  },

  // Tesla quality issues
  {
    brand: 'Tesla', model: 'Model 3',
    years: [2019, 2020, 2021, 2022, 2023],
    issue: 'Panel gaps, paint defects, rattles, phantom braking, software glitches affecting daily use',
    severity: 'minor', count: 8,
  },
  {
    brand: 'Tesla', model: 'Model Y',
    years: [2022, 2023, 2024],
    issue: 'Build quality issues — uneven panel gaps, interior rattles, paint chips',
    severity: 'minor', count: 6,
  },

  // Mitsubishi Triton
  {
    brand: 'Mitsubishi', model: 'Triton',
    years: [2015, 2016, 2017, 2018, 2019, 2020],
    issue: 'DPF regeneration issues, turbo problems, harsh gear changes on auto',
    severity: 'major', count: 6,
  },

  // Isuzu D-Max
  {
    brand: 'Isuzu', model: 'D-Max',
    years: [2012, 2013, 2014, 2015, 2016, 2017],
    issue: 'Injector failures, EGR issues, occasional limp mode',
    severity: 'major', count: 5,
  },

  // Ford Ranger
  {
    brand: 'Ford', model: 'Ranger',
    years: [2015, 2016, 2017, 2018, 2019],
    issue: 'Gearbox issues on the 6-speed auto, oil pump failures, intercooler ice issues',
    severity: 'major', count: 7,
  },

  // Jeep reliability
  {
    brand: 'Jeep', model: 'Grand Cherokee',
    years: [2011, 2012, 2013, 2014, 2015, 2016],
    issue: 'Electrical faults, transmission issues, expensive repair bills',
    severity: 'major', count: 6,
  },
  {
    brand: 'Jeep', model: 'Cherokee',
    years: [2014, 2015, 2016, 2017, 2018],
    issue: '9-speed transmission rough shifting and faults',
    severity: 'major', count: 4,
  },

  // Land Rover
  {
    brand: 'Land Rover', model: 'Discovery',
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016],
    issue: 'Air suspension failures, electrical gremlins, oil leaks',
    severity: 'major', count: 5,
  },
  {
    brand: 'Land Rover', model: 'Range Rover Evoque',
    years: [2012, 2013, 2014, 2015, 2016],
    issue: 'Timing chain stretch on 2.0L Ingenium diesel, multiple electrical issues',
    severity: 'major', count: 5,
  },

  // Honda CRV
  {
    brand: 'Honda', model: 'CR-V',
    years: [2017, 2018, 2019],
    issue: '1.5L turbo engine — fuel diluting oil, especially in cold weather and short trips',
    severity: 'major', count: 5,
  },
]

// ── Minor universal issues for breadth ──────────────────────────────────────
const MINOR_ISSUES = [
  'Infotainment system freezing and rebooting randomly',
  'Brake squeal noise at low speeds',
  'Paint chipping on bonnet and front bumper',
  'Excessive road noise in the cabin',
  'Bluetooth disconnects frequently',
  'AC blowing warm air intermittently',
  'Boot/tailgate seal leak letting water in',
  'Driver seat squeaking when accelerating',
  'Cruise control disengaging without warning',
  'Reverse camera image distorted',
  'Suspension knocking noise over bumps',
  'Steering wheel slightly off-centre when driving straight',
  'Wiper blades juddering across windscreen',
  'Headlights condensation buildup inside the housing',
  'Auto stop-start malfunctioning',
  'Tyre wear uneven despite regular rotation',
]

// ── Prompt template ─────────────────────────────────────────────────────────
const personas = [
  'frustrated tradie who relies on this vehicle for work',
  'first-time car owner feeling let down',
  'family parent worried about safety',
  'long-time owner of the brand losing trust',
  'sceptical buyer who saw it coming',
  'mechanic owner who knows what they are talking about',
  'rural Australian driver doing high kilometres',
  'city commuter dealing with daily frustrations',
]

interface ComplaintOutput {
  title: string
  content: string
}

async function generateComplaints(
  brand: string,
  model: string,
  year: number,
  issue: string,
  variations: number,
): Promise<ComplaintOutput[]> {
  const persona = personas[Math.floor(Math.random() * personas.length)]

  const prompt = `You are helping seed a car complaints database for an Australian platform called Carology. Write ${variations} realistic complaints about this specific issue:

Car: ${year} ${brand} ${model}
Issue: ${issue}
Persona: ${persona}

Requirements:
- Each complaint is from the perspective of an Australian owner
- Use Australian spelling (kilometres, tyres, bonnet, boot, petrol, AUD)
- Reference specific details where natural: odometer readings, dealership interactions, repair costs in AUD, time of ownership
- Vary tone: some angry, some resigned, some technical, some confused
- Include realistic typos or casual language occasionally — these are real people venting, not press releases
- Length: 2-5 sentences each
- Each complaint has a short title (max 10 words) and a content body

Return ONLY valid JSON in this exact format, no markdown fences, no explanation:
{
  "complaints": [
    { "title": "...", "content": "..." }
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
    return parsed.complaints as ComplaintOutput[]
  } catch (err) {
    console.error('Failed to parse response:', text.slice(0, 200))
    return []
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🗑️  Wiping existing complaints...')
  await prisma.complaint.deleteMany()
  console.log('✅ Complaints wiped\n')

  // Get all non-admin users
  const users = await prisma.user.findMany({
    where: { isAdmin: false },
    select: { id: true },
  })

  if (users.length === 0) {
    console.error('❌ No users found. Run user seeding first.')
    process.exit(1)
  }
  console.log(`📋 Found ${users.length} users to attach complaints to\n`)

  const randomUserId = () => users[Math.floor(Math.random() * users.length)].id

  let totalCreated = 0
  let totalFailed = 0

  // ── 1. Known issues ─────────────────────────────────────────────────────
  console.log('🌱 Generating complaints for known issues...\n')

  for (const issue of KNOWN_ISSUES) {
    const brand = await prisma.brand.findFirst({
      where: { name: issue.brand },
    })
    if (!brand) {
      console.warn(`  ⚠️  Brand not found: ${issue.brand}`)
      continue
    }

    const brandModel = await prisma.brandModel.findFirst({
      where: { brandId: brand.id, name: issue.model },
    })
    if (!brandModel) {
      console.warn(`  ⚠️  Model not found: ${issue.brand} ${issue.model}`)
      continue
    }

    // Generate in batches of 5 to keep API calls reasonable
    let generated = 0
    while (generated < issue.count) {
      const batchSize = Math.min(5, issue.count - generated)
      const year = issue.years[Math.floor(Math.random() * issue.years.length)]

      const carModel = await prisma.carModel.findFirst({
        where: { brandModelId: brandModel.id, year },
      })
      if (!carModel) {
        console.warn(`  ⚠️  CarModel not found: ${issue.brand} ${issue.model} ${year}`)
        generated += batchSize
        continue
      }

      try {
        const complaints = await generateComplaints(
          issue.brand,
          issue.model,
          year,
          issue.issue,
          batchSize,
        )

        for (const c of complaints) {
          await prisma.complaint.create({
            data: {
              title: c.title,
              content: c.content,
              userId: randomUserId(),
              carModelId: carModel.id,
            },
          })
          totalCreated++
        }
        console.log(`  ✓ ${issue.brand} ${issue.model} ${year} — ${complaints.length} complaints`)
      } catch (err) {
        console.error(`  ✗ ${issue.brand} ${issue.model} — ${err instanceof Error ? err.message : err}`)
        totalFailed += batchSize
      }

      generated += batchSize
    }
  }

  console.log(`\n📊 Known issues done — ${totalCreated} complaints so far\n`)

  // ── 2. Minor issues spread across random models ─────────────────────────
  const TARGET_TOTAL = 1000
  const remaining = TARGET_TOTAL - totalCreated
  console.log(`🌱 Generating ${remaining} minor/spread complaints...\n`)

  const allCarModels = await prisma.carModel.findMany({
    include: { brandModel: { include: { brand: true } } },
  })

  for (let i = 0; i < remaining; ) {
    const carModel = allCarModels[Math.floor(Math.random() * allCarModels.length)]
    const minorIssue = MINOR_ISSUES[Math.floor(Math.random() * MINOR_ISSUES.length)]
    const batchSize = Math.min(3, remaining - i)

    try {
      const complaints = await generateComplaints(
        carModel.brandModel.brand.name,
        carModel.brandModel.name,
        carModel.year ?? 2020,
        minorIssue,
        batchSize,
      )

      for (const c of complaints) {
        await prisma.complaint.create({
          data: {
            title: c.title,
            content: c.content,
            userId: randomUserId(),
            carModelId: carModel.id,
          },
        })
        totalCreated++
        i++
      }
      console.log(`  ✓ ${carModel.brandModel.brand.name} ${carModel.brandModel.name} ${carModel.year} — ${complaints.length} (${totalCreated}/${TARGET_TOTAL})`)
    } catch (err) {
      console.error(`  ✗ Failed batch — ${err instanceof Error ? err.message : err}`)
      totalFailed += batchSize
      i += batchSize
    }
  }

  console.log(`\n🎉 Done! Created ${totalCreated} complaints (${totalFailed} failed)`)
}

main()
  .catch((e) => {
    console.error('❌ Script failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
