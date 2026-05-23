import { PrismaClient, IssueCategory } from '../src/generated/prisma'
import Anthropic from '@anthropic-ai/sdk'

const prisma = new PrismaClient()
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// ── Known issues focused on OLDER models (pre-2015) ─────────────────────────
interface KnownIssue {
  brand: string
  model: string
  years: number[]
  issue: string
  count: number
}

const KNOWN_ISSUES: KnownIssue[] = [
  // ─── Toyota — sludge, oil consumption ────────────────────────────────────
  {
    brand: 'Toyota', model: 'Camry',
    years: [2002, 2003, 2004, 2005, 2006, 2007, 2008],
    issue: 'Oil sludge buildup in 1MZ-FE V6 engine, premature engine wear, sometimes catastrophic engine failure if servicing missed',
    count: 30,
  },
  {
    brand: 'Toyota', model: 'Corolla',
    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
    issue: 'Excessive oil consumption on 2ZR-FE engine, burning a litre between services, occasional rough idle and check engine light',
    count: 25,
  },
  {
    brand: 'Toyota', model: 'RAV4',
    years: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008],
    issue: 'Automatic transmission failures, harsh shifting, occasional limp mode on the 4-speed auto',
    count: 18,
  },
  {
    brand: 'Toyota', model: 'Yaris',
    years: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
    issue: 'Premature clutch wear on manual, dashboard rattles, AC blowing warm air in summer',
    count: 15,
  },

  // ─── Holden — older Commodore woes ────────────────────────────────────────
  {
    brand: 'Holden', model: 'Commodore',
    years: [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013],
    issue: 'VE/VZ V6 timing chain stretch, oil leaks from rocker covers, intake manifold gaskets failing, transmission shudder',
    count: 35,
  },
  {
    brand: 'Holden', model: 'Astra',
    years: [2004, 2005, 2006, 2007, 2008, 2009],
    issue: 'Thermostat failures, water pump leaks, electric power steering motor going out, dashboard pixel failures',
    count: 18,
  },
  {
    brand: 'Holden', model: 'Barina',
    years: [2005, 2006, 2007, 2008, 2009, 2010, 2011],
    issue: 'Multiple electrical faults, ABS module failures, dashboard warning lights coming on randomly',
    count: 15,
  },

  // ─── Ford Falcon ──────────────────────────────────────────────────────────
  {
    brand: 'Ford', model: 'Falcon',
    years: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
    issue: 'BA/BF/FG inlet manifold runner failures, ZF 6-speed auto shuddering, oil leaks from rear main seal, coil pack failures',
    count: 30,
  },
  {
    brand: 'Ford', model: 'Territory',
    years: [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
    issue: 'Ball joint failures (known recall), oil leaks, transmission issues, expensive ongoing repairs',
    count: 22,
  },

  // ─── Subaru — head gaskets ────────────────────────────────────────────────
  {
    brand: 'Subaru', model: 'Impreza',
    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009],
    issue: 'EJ25 head gasket failure, coolant leaks, oil consumption, expensive engine repair',
    count: 20,
  },
  {
    brand: 'Subaru', model: 'Outback',
    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009],
    issue: 'Head gasket leaks on EJ25, CV joint clicking, suspension knocking over bumps',
    count: 15,
  },

  // ─── Mitsubishi older models ──────────────────────────────────────────────
  {
    brand: 'Mitsubishi', model: 'Magna',
    years: [2003, 2004, 2005],
    issue: 'Auto transmission failures (known issue), oil leaks, AC compressor failures',
    count: 10,
  },
  {
    brand: 'Mitsubishi', model: 'Lancer',
    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
    issue: 'CVT transmission problems on later models, manual gearbox notchy shifts, rust around wheel arches',
    count: 18,
  },
  {
    brand: 'Mitsubishi', model: 'Pajero',
    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
    issue: 'Auto transmission overheating, diesel injector failures, ball joint wear',
    count: 15,
  },

  // ─── BMW E46 / E90 ────────────────────────────────────────────────────────
  {
    brand: 'BMW', model: '3 Series',
    years: [2000, 2001, 2002, 2003, 2004, 2005, 2006],
    issue: 'E46 cooling system failures (water pump, thermostat, expansion tank), subframe cracks, rear window regulator failures',
    count: 22,
  },
  {
    brand: 'BMW', model: '5 Series',
    years: [2001, 2002, 2003, 2004, 2005, 2006],
    issue: 'E39/E60 valve cover oil leaks, electrical gremlins, iDrive failures, expensive repair bills',
    count: 15,
  },
  {
    brand: 'BMW', model: 'X5',
    years: [2002, 2003, 2004, 2005, 2006, 2007, 2008],
    issue: 'Transfer case actuator failures, air suspension leaks, transmission gasket leaks',
    count: 12,
  },

  // ─── Audi B6/B7 ───────────────────────────────────────────────────────────
  {
    brand: 'Audi', model: 'A4',
    years: [2002, 2003, 2004, 2005, 2006, 2007, 2008],
    issue: '1.8T/2.0T oil sludge and consumption, timing chain tensioner failures on FSI, multitronic CVT failures',
    count: 20,
  },
  {
    brand: 'Audi', model: 'A6',
    years: [2002, 2003, 2004, 2005, 2006, 2007],
    issue: 'Timing chain tensioner failure on 2.0T, multitronic CVT problems, electrical control module faults',
    count: 12,
  },

  // ─── VW older — TSI carbon, ignition coils ───────────────────────────────
  {
    brand: 'Volkswagen', model: 'Passat',
    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009],
    issue: 'Coil pack failures, timing chain tensioner on 2.0T, water pump failures, electrical faults',
    count: 18,
  },
  {
    brand: 'Volkswagen', model: 'Jetta',
    years: [2005, 2006, 2007, 2008, 2009],
    issue: 'Coil pack failures, ABS module faults, intake manifold issues',
    count: 12,
  },

  // ─── Honda older ──────────────────────────────────────────────────────────
  {
    brand: 'Honda', model: 'Accord',
    years: [2003, 2004, 2005, 2006, 2007],
    issue: 'V6 automatic transmission failures (subject to extended warranty/recall), VTEC oil pressure switch leaks',
    count: 18,
  },
  {
    brand: 'Honda', model: 'Civic',
    years: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008],
    issue: 'Automatic transmission failures on 1.7L models, AC compressor failures, ignition issues',
    count: 15,
  },
  {
    brand: 'Honda', model: 'CR-V',
    years: [2002, 2003, 2004, 2005, 2006],
    issue: 'AC condenser failures, rear differential whine on 4WD, oil leaks',
    count: 12,
  },

  // ─── Nissan older ─────────────────────────────────────────────────────────
  {
    brand: 'Nissan', model: 'Patrol',
    years: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
    issue: 'GU diesel injector failures, fuel pump issues, automatic transmission failures',
    count: 15,
  },
  {
    brand: 'Nissan', model: 'Navara',
    years: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
    issue: 'D40 timing chain failure on YD25 diesel, chassis rust at rear, gearbox failures',
    count: 20,
  },
  {
    brand: 'Nissan', model: 'Maxima',
    years: [2003, 2004, 2005, 2006, 2007, 2008],
    issue: 'CVT transmission failures, oxygen sensor failures, dashboard cracks',
    count: 10,
  },

  // ─── Mazda older ──────────────────────────────────────────────────────────
  {
    brand: 'Mazda', model: 'Mazda3',
    years: [2004, 2005, 2006, 2007, 2008, 2009],
    issue: 'Rust on rear wheel arches and tailgate, AC compressor failure, dashboard rattles',
    count: 18,
  },
  {
    brand: 'Mazda', model: 'Mazda6',
    years: [2003, 2004, 2005, 2006, 2007, 2008],
    issue: 'Rust around wheel arches, oil leaks, AC issues, occasional manual gearbox synchro problems',
    count: 14,
  },
  {
    brand: 'Mazda', model: 'CX-7',
    years: [2007, 2008, 2009, 2010, 2011, 2012],
    issue: 'Turbo failures on 2.3L turbo engine, timing chain stretch, expensive engine rebuild bills',
    count: 18,
  },

  // ─── Hyundai/Kia older ────────────────────────────────────────────────────
  {
    brand: 'Hyundai', model: 'Getz',
    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
    issue: 'Manual gearbox failures, electrical faults, AC blowing warm, rust on rear quarters',
    count: 14,
  },
  {
    brand: 'Hyundai', model: 'Elantra',
    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
    issue: 'Engine oil consumption, ignition coil failures, timing belt issues on older models',
    count: 12,
  },
  {
    brand: 'Kia', model: 'Rio',
    years: [2005, 2006, 2007, 2008, 2009, 2010, 2011],
    issue: 'Premature clutch wear, AC condenser leaks, electrical issues with central locking',
    count: 12,
  },
  {
    brand: 'Kia', model: 'Cerato',
    years: [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
    issue: 'Engine oil consumption, rough idle, timing belt failures',
    count: 12,
  },

  // ─── Suzuki ───────────────────────────────────────────────────────────────
  {
    brand: 'Suzuki', model: 'Swift',
    years: [2005, 2006, 2007, 2008, 2009, 2010],
    issue: 'CVT transmission issues, electric power steering failures, rust on rear hatch',
    count: 10,
  },

  // ─── Land Rover / Range Rover older ──────────────────────────────────────
  {
    brand: 'Land Rover', model: 'Defender',
    years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008],
    issue: 'Oil leaks from everywhere, electrical faults, chassis rust, expensive parts and repair bills',
    count: 10,
  },
  {
    brand: 'Land Rover', model: 'Discovery',
    years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
    issue: 'Air suspension failures, BMW M62 engine head gasket on early models, electrical gremlins',
    count: 14,
  },

  // ─── Volvo ────────────────────────────────────────────────────────────────
  {
    brand: 'Volvo', model: 'XC90',
    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009],
    issue: 'Transmission failures, electrical faults, expensive parts, AWD system issues',
    count: 10,
  },
  {
    brand: 'Volvo', model: 'S40',
    years: [2004, 2005, 2006, 2007, 2008],
    issue: 'Coil pack failures, ABS module faults, electrical issues',
    count: 8,
  },

  // ─── Peugeot / Renault / Citroen ─────────────────────────────────────────
  {
    brand: 'Peugeot', model: '307',
    years: [2003, 2004, 2005, 2006, 2007, 2008],
    issue: 'EGR valve failures, electrical gremlins, automatic transmission problems',
    count: 10,
  },
  {
    brand: 'Renault', model: 'Megane',
    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
    issue: 'Electrical faults, ECU failures, transmission problems, expensive parts',
    count: 10,
  },
  {
    brand: 'Citroen', model: 'C4',
    years: [2005, 2006, 2007, 2008, 2009, 2010],
    issue: 'Electrical faults, BSI (body computer) failures, EGR valve issues',
    count: 8,
  },

  // ─── Older Ford Focus / Mondeo ───────────────────────────────────────────
  {
    brand: 'Ford', model: 'Focus',
    years: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
    issue: 'Coil pack failures, automatic transmission issues, electrical faults, rust around rear wheel arches',
    count: 20,
  },
  {
    brand: 'Ford', model: 'Mondeo',
    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
    issue: 'Diesel injector failures, dual mass flywheel issues, electrical faults',
    count: 12,
  },

  // ─── Older Holden Captiva / Cruze (different angles) ─────────────────────
  {
    brand: 'Holden', model: 'Captiva',
    years: [2007, 2008, 2009],
    issue: 'Early model timing chain issues, transmission rebuild required around 80,000km',
    count: 12,
  },

  // ─── Older Daihatsu, ageing Korean ────────────────────────────────────────
  {
    brand: 'Daihatsu', model: 'Sirion',
    years: [2005, 2006, 2007, 2008, 2009],
    issue: 'Timing belt failure on 1.3L, manual gearbox synchro wear, AC compressor failures',
    count: 6,
  },
]

// ── Universal minor issues for older cars (different from existing) ─────────
const MINOR_ISSUES = [
  'Power window regulator failed and window stuck halfway down',
  'Speedometer dropping to zero intermittently',
  'Sun visor falling down on its own',
  'Door handles snapping off when pulled',
  'Dashboard cluster pixels missing or fading',
  'Glovebox latch broken, lid drops open',
  'Wheel arch rust starting to show through paint',
  'Central locking working only on some doors',
  'Rear demister grid not working',
  'Boot/tailgate strut failing, lid wont stay up',
  'Headlight lens hazing badly, hard to drive at night',
  'Heater blowing cold air on driver side only',
  'Fuel gauge reading inaccurately',
  'Power steering whining noise when cold',
  'CV joint clicking on full lock',
  'Brake pedal feeling spongy after 100k km',
  'Engine bay corrosion on bolts and brackets',
  'Door rubber seals perished and leaking',
  'Dashboard cracking from sun damage',
  'Catalytic converter rattling internally',
  'Manual gearbox synchros worn, baulks into 2nd',
  'Diff whine getting louder with mileage',
]

// ── Personas ─────────────────────────────────────────────────────────────────
const personas = [
  'frustrated tradie who relies on this vehicle for work',
  'first-time car owner feeling let down',
  'family parent worried about safety',
  'long-time owner of the brand losing trust',
  'sceptical buyer who saw it coming',
  'mechanic owner who knows what they are talking about',
  'rural Australian driver doing high kilometres',
  'city commuter dealing with daily frustrations',
  'budget buyer who bought it used cheap',
  'pensioner regretting the purchase',
]

// ── Output type — now includes category and severity ───────────────────────
interface ComplaintOutput {
  title: string
  content: string
  category: IssueCategory
  severity: number // 1–10
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
- Reference specific details where natural: odometer readings (older cars tend to have 150,000–300,000km), dealership interactions, repair costs in AUD, time of ownership
- Vary tone: some angry, some resigned, some technical, some confused
- Include realistic typos or casual language occasionally — these are real people venting, not press releases
- Length: 2-5 sentences each
- Each complaint has a short title (max 10 words) and a content body

For EACH complaint also assign:
1. category — pick ONE from: ENGINE, TRANSMISSION, BRAKES, SUSPENSION, STEERING, ELECTRICAL, INFOTAINMENT, BATTERY, BODY, RUST, AIR_CONDITIONING, SAFETY, NOISE, FUEL_SYSTEM, COOLING, OTHER
2. severity — an integer 1–10:
   1-3 = minor annoyance (rattle, cosmetic)
   4-6 = moderate (affects comfort or convenience, not dangerous)
   7-8 = major (expensive repair, affects driveability)
   9-10 = severe/safety-critical (must always be < 10, so cap at 9; engine failure, brake failure, accident risk)

Return ONLY valid JSON in this exact format, no markdown fences, no explanation:
{
  "complaints": [
    { "title": "...", "content": "...", "category": "ENGINE", "severity": 7 }
  ]
}`

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2500,
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
  console.log('🔍 Checking existing complaints to avoid overlap...\n')

  // Get existing complaint counts per (brand, model)
  const existing = await prisma.complaint.groupBy({
    by: ['carModelId'],
    _count: { id: true },
  })

  const existingCountByCarModel = new Map<string, number>()
  for (const row of existing) {
    existingCountByCarModel.set(row.carModelId, row._count.id)
  }

  console.log(`📊 ${existing.length} car models already have complaints\n`)

  // Get users
  const users = await prisma.user.findMany({
    where: { isAdmin: false },
    select: { id: true },
  })
  if (users.length === 0) {
    console.error('❌ No users found. Run user seeding first.')
    process.exit(1)
  }
  console.log(`📋 Found ${users.length} users\n`)
  const randomUserId = () => users[Math.floor(Math.random() * users.length)].id

  let totalCreated = 0
  let totalFailed = 0
  let totalSkipped = 0

  // ── 1. Known issues ─────────────────────────────────────────────────────
  console.log('🌱 Generating complaints for older-model known issues...\n')

  for (const issue of KNOWN_ISSUES) {
    const brand = await prisma.brand.findFirst({ where: { name: issue.brand } })
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

      // Skip if this specific (model, year) is already saturated
      const existingForThis = existingCountByCarModel.get(carModel.id) ?? 0
      if (existingForThis >= 10) {
        console.log(`  ⏭  Skipping ${issue.brand} ${issue.model} ${year} — already has ${existingForThis}`)
        totalSkipped += batchSize
        generated += batchSize
        continue
      }

      try {
        const complaints = await generateComplaints(
          issue.brand, issue.model, year, issue.issue, batchSize,
        )

        for (const c of complaints) {
          await prisma.complaint.create({
            data: {
              title: c.title,
              content: c.content,
              category: c.category,
              severity: Math.min(c.severity, 9), // hard cap at 9
              userId: randomUserId(),
              carModelId: carModel.id,
            },
          })
          totalCreated++
        }
        // update in-memory tracker so subsequent loops respect this
        existingCountByCarModel.set(
          carModel.id,
          (existingCountByCarModel.get(carModel.id) ?? 0) + complaints.length,
        )
        console.log(`  ✓ ${issue.brand} ${issue.model} ${year} — ${complaints.length} complaints (${totalCreated} total)`)
      } catch (err) {
        console.error(`  ✗ ${issue.brand} ${issue.model} — ${err instanceof Error ? err.message : err}`)
        totalFailed += batchSize
      }

      generated += batchSize
    }
  }

  console.log(`\n📊 Known issues done — ${totalCreated} created so far\n`)

  // ── 2. Minor issues spread across random OLDER car models ───────────────
  const TARGET_TOTAL = 2000
  const remaining = TARGET_TOTAL - totalCreated
  console.log(`🌱 Generating ${remaining} more minor/spread complaints (older models)...\n`)

  // Only target older cars (year <= 2014) and skip already-saturated
  const allCarModels = await prisma.carModel.findMany({
    where: { year: { lte: 2014, not: null } },
    include: { brandModel: { include: { brand: true } } },
  })

  console.log(`📦 ${allCarModels.length} car models available (pre-2015)\n`)

  for (let i = 0; i < remaining; ) {
    const carModel = allCarModels[Math.floor(Math.random() * allCarModels.length)]
    const existingForThis = existingCountByCarModel.get(carModel.id) ?? 0
    if (existingForThis >= 10) {
      // skip silently — common in random sampling
      continue
    }

    const minorIssue = MINOR_ISSUES[Math.floor(Math.random() * MINOR_ISSUES.length)]
    const batchSize = Math.min(5, remaining - i)

    try {
      const complaints = await generateComplaints(
        carModel.brandModel.brand.name,
        carModel.brandModel.name,
        carModel.year ?? 2010,
        minorIssue,
        batchSize,
      )

      for (const c of complaints) {
        await prisma.complaint.create({
          data: {
            title: c.title,
            content: c.content,
            category: c.category,
            severity: Math.min(c.severity, 9),
            userId: randomUserId(),
            carModelId: carModel.id,
          },
        })
        totalCreated++
        i++
      }
      existingCountByCarModel.set(
        carModel.id,
        (existingCountByCarModel.get(carModel.id) ?? 0) + complaints.length,
      )
      console.log(`  ✓ ${carModel.brandModel.brand.name} ${carModel.brandModel.name} ${carModel.year} — ${complaints.length} (${totalCreated}/${TARGET_TOTAL})`)
    } catch (err) {
      console.error(`  ✗ Failed batch — ${err instanceof Error ? err.message : err}`)
      totalFailed += batchSize
      i += batchSize
    }
  }

  console.log(`\n🎉 Done! Created ${totalCreated} complaints (${totalFailed} failed, ${totalSkipped} skipped)`)
}

main()
  .catch((e) => {
    console.error('❌ Script failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
