import { PrismaClient, CarType, FuelType, Drivetrain } from '../src/generated/prisma'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

// ── Data imports ────────────────────────────────────────────────────────────
import brandsData from '../src/seed-data/brands.json'
import brandModelsData from '../src/seed-data/brand-models.json'
import brandModelCartypesData from '../src/seed-data/brand-model-cartypes.json'
import carModelYearsData from '../src/seed-data/car-model-years.json'
import specsBatch from '../src/seed-data/specs-batch.json'

// ── Types ───────────────────────────────────────────────────────────────────
interface BrandModelEntry {
  brand: string
  models: string[]
}

interface BrandModelCartypeEntry {
  brand: string
  models: { name: string; carType: string }[]
}

interface CarModelYearEntry {
  brand: string
  models: { name: string; years: number[] }[]
}

interface SpecsEntry {
  brand: string
  model: string
  specs: {
    engineSize?: number | null
    power?: number | null
    torque?: number | null
    fuelType?: string | null
    fuelEconomy?: number | null
    transmission?: string | null
    drivetrain?: string | null
    seats?: number | null
    bootCapacity?: number | null
    startingPrice?: number | null
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

// ── User generators ─────────────────────────────────────────────────────────
const firstNames = [
  'Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Benjamin', 'Lucas',
  'Henry', 'Theodore', 'Jack', 'Levi', 'Alexander', 'Jackson', 'Mateo',
  'Daniel', 'Michael', 'Mason', 'Sebastian', 'Ethan', 'Logan', 'Owen',
  'Samuel', 'Jacob', 'Asher', 'Aiden', 'John', 'Joseph', 'Wyatt', 'David',
  'Olivia', 'Emma', 'Charlotte', 'Amelia', 'Sophia', 'Isabella', 'Ava',
  'Mia', 'Evelyn', 'Luna', 'Harper', 'Sofia', 'Camila', 'Eliana', 'Elena',
  'Aria', 'Ella', 'Gianna', 'Aurora', 'Mila', 'Layla', 'Scarlett', 'Chloe',
  'Penelope', 'Riley', 'Zoey', 'Nora', 'Lily', 'Eleanor', 'Hannah',
  'Dinh', 'Minh', 'Khoa', 'Linh', 'Trang', 'Hieu', 'Nam', 'An', 'Bao', 'Quan',
  'Raj', 'Priya', 'Arjun', 'Aisha', 'Wei', 'Mei', 'Hiroshi', 'Yuki',
]

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson',
  'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee',
  'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez',
  'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright',
  'Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Vo', 'Dang', 'Bui', 'Do',
  'Patel', 'Singh', 'Kumar', 'Shah', 'Chen', 'Wang', 'Li', 'Zhang',
  'Murphy', 'Kelly', 'Ryan', 'OBrien', 'Walsh', 'Sullivan',
]

const funnyHandles = [
  'carenthusiast', 'wrenchmonkey', 'turboboost', 'dieselhead', 'gearhead99',
  'revlimiter', 'oilsleuth', 'checkengine', 'mrreliable', 'lemondetector',
  'aussiedriver', 'sydneycommuter', 'melbournemate', 'outbackexplorer',
  'utelife', 'hiluxhater', 'corollalover', 'dpfsurvivor', 'cvtvictim',
]

const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com']

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateUsers(count: number): { name: string; email: string }[] {
  const users: { name: string; email: string }[] = []
  const usedEmails = new Set<string>()

  while (users.length < count) {
    const first = randomFrom(firstNames)
    const last = randomFrom(lastNames)
    const name = `${first} ${last}`

    const useFunny = Math.random() < 0.25
    let email: string
    if (useFunny) {
      const handle = randomFrom(funnyHandles)
      email = `${handle}${Math.floor(Math.random() * 999)}@${randomFrom(domains)}`
    } else {
      const sep = Math.random() < 0.5 ? '.' : ''
      const num = Math.random() < 0.5 ? Math.floor(Math.random() * 99) : ''
      email = `${first.toLowerCase()}${sep}${last.toLowerCase()}${num}@${randomFrom(domains)}`
    }

    if (usedEmails.has(email)) continue
    usedEmails.add(email)
    users.push({ name, email })
  }

  return users
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🗑️  Wiping existing data...')

  await prisma.complaint.deleteMany()
  await prisma.modelImage.deleteMany()
  await prisma.trim.deleteMany()
  await prisma.carModel.deleteMany()
  await prisma.specs.deleteMany()
  await prisma.brandModel.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Wipe complete\n')

  // ── Users ────────────────────────────────────────────────────────────────
  console.log('🌱 Seeding users...')
  const hashedPassword = await bcrypt.hash('87654321!', 8)

  await prisma.user.create({
    data: {
      email: 'admin1@gmail.com',
      name: 'Admin One',
      password: hashedPassword,
      isAdmin: true,
    },
  })
  await prisma.user.create({
    data: {
      email: 'admin2@gmail.com',
      name: 'Admin Two',
      password: hashedPassword,
      isAdmin: true,
    },
  })

  const regularUsers = generateUsers(98)
  for (const u of regularUsers) {
    await prisma.user.create({
      data: {
        email: u.email,
        name: u.name,
        password: hashedPassword,
        isAdmin: false,
      },
    })
  }
  console.log('✅ Users done (2 admins + 98 regular)\n')

  // ── Brands ──────────────────────────────────────────────────────────────
  console.log(`🌱 Seeding ${brandsData.length} brands...`)
  for (const b of brandsData as { name: string }[]) {
    await prisma.brand.create({
      data: { name: b.name, slug: toSlug(b.name) },
    })
  }
  console.log('✅ Brands done\n')

  // ── BrandModels ─────────────────────────────────────────────────────────
  const carTypeMap = new Map<string, CarType>()
  for (const entry of brandModelCartypesData as BrandModelCartypeEntry[]) {
    for (const m of entry.models) {
      carTypeMap.set(`${entry.brand}||${m.name}`, m.carType as CarType)
    }
  }

  let brandModelCount = 0
  for (const entry of brandModelsData as BrandModelEntry[]) {
    const brand = await prisma.brand.findUnique({
      where: { slug: toSlug(entry.brand) },
    })
    if (!brand) {
      console.warn(`  ⚠️  Brand not found: ${entry.brand}`)
      continue
    }

    for (const modelName of entry.models) {
      const carType = carTypeMap.get(`${entry.brand}||${modelName}`) ?? null
      await prisma.brandModel.create({
        data: {
          name: modelName,
          slug: toSlug(modelName),
          brandId: brand.id,
          carType: carType ?? undefined,
        },
      })
      brandModelCount++
    }
  }
  console.log(`✅ BrandModels done (${brandModelCount} created)\n`)

  // ── CarModels ───────────────────────────────────────────────────────────
  let carModelCount = 0
  for (const entry of carModelYearsData as CarModelYearEntry[]) {
    const brand = await prisma.brand.findUnique({
      where: { slug: toSlug(entry.brand) },
    })
    if (!brand) continue

    for (const modelEntry of entry.models) {
      const brandModel = await prisma.brandModel.findFirst({
        where: { brandId: brand.id, name: modelEntry.name },
      })
      if (!brandModel) {
        console.warn(`  ⚠️  BrandModel not found: ${entry.brand} ${modelEntry.name}`)
        continue
      }

      for (const year of modelEntry.years) {
        await prisma.carModel.create({
          data: {
            name: `${modelEntry.name}`,
            year,
            slug: `${year}`,
            brandModelId: brandModel.id,
          },
        })
        carModelCount++
      }
    }
  }
  console.log(`✅ CarModels done (${carModelCount} created)\n`)

  // ── Specs ───────────────────────────────────────────────────────────────
  console.log(`🌱 Seeding ${(specsBatch as SpecsEntry[]).length} specs...`)
  let specsCount = 0
  let specsFailed = 0

  for (const item of specsBatch as SpecsEntry[]) {
    try {
      const brand = await prisma.brand.findUnique({
        where: { slug: toSlug(item.brand) },
      })
      if (!brand) { specsFailed++; continue }

      const brandModel = await prisma.brandModel.findFirst({
        where: { brandId: brand.id, name: item.model },
      })
      if (!brandModel) { specsFailed++; continue }

      await prisma.specs.upsert({
        where: { brandModelId: brandModel.id },
        update: {
          engineSize: item.specs.engineSize ?? null,
          power: item.specs.power ?? null,
          torque: item.specs.torque ?? null,
          fuelType: (item.specs.fuelType as FuelType | null) ?? null,
          fuelEconomy: item.specs.fuelEconomy ?? null,
          transmission: item.specs.transmission ?? null,
          drivetrain: (item.specs.drivetrain as Drivetrain | null) ?? null,
          seats: item.specs.seats ?? null,
          bootCapacity: item.specs.bootCapacity ?? null,
          startingPrice: item.specs.startingPrice ?? null,
        },
        create: {
          brandModelId: brandModel.id,
          engineSize: item.specs.engineSize ?? null,
          power: item.specs.power ?? null,
          torque: item.specs.torque ?? null,
          fuelType: (item.specs.fuelType as FuelType | null) ?? null,
          fuelEconomy: item.specs.fuelEconomy ?? null,
          transmission: item.specs.transmission ?? null,
          drivetrain: (item.specs.drivetrain as Drivetrain | null) ?? null,
          seats: item.specs.seats ?? null,
          bootCapacity: item.specs.bootCapacity ?? null,
          startingPrice: item.specs.startingPrice ?? null,
        },
      })
      specsCount++
    } catch (err) {
      specsFailed++
      console.warn(`  ⚠️  Specs failed: ${item.brand} ${item.model} — ${err instanceof Error ? err.message : err}`)
    }
  }
  console.log(`✅ Specs done (${specsCount} seeded, ${specsFailed} skipped)\n`)

  console.log('🎉 Seed complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })