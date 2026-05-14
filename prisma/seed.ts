import { PrismaClient, CarType, FuelType, Drivetrain } from '../src/generated/prisma'

const prisma = new PrismaClient()

// ── Data imports ────────────────────────────────────────────────────────────
import brandsData from '../src/data/brands.json'
import brandModelsData from '../src/data/brand-models.json'
import brandModelCartypesData from '../src/data/brand-model-cartypes.json'
import carModelYearsData from '../src/data/car-model-years.json'
import specsBatch from '../src/data/specs-batch.json'

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

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🗑️  Wiping existing data...')

  // Delete in dependency order (children first)
  await prisma.complaint.deleteMany()
  await prisma.modelImage.deleteMany()
  await prisma.trim.deleteMany()
  await prisma.carModel.deleteMany()
  await prisma.specs.deleteMany()
  await prisma.brandModel.deleteMany()
  await prisma.brand.deleteMany()

  console.log('✅ Wipe complete\n')

  // ── 1. Brands ──────────────────────────────────────────────────────────────
  console.log(`🌱 Seeding ${brandsData.length} brands...`)
  for (const b of brandsData as { name: string }[]) {
    await prisma.brand.create({
      data: {
        name: b.name,
        slug: toSlug(b.name),
      },
    })
  }
  console.log('✅ Brands done\n')

  // ── 2. BrandModels (with carType) ──────────────────────────────────────────
  // Build a lookup: brand → model name → carType
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
      const slug = toSlug(modelName)

      await prisma.brandModel.create({
        data: {
          name: modelName,
          slug,
          brandId: brand.id,
          carType: carType ?? undefined,
        },
      })
      brandModelCount++
    }
  }
  console.log(`✅ BrandModels done (${brandModelCount} created)\n`)

  // ── 3. CarModels (year rows) ───────────────────────────────────────────────
  let carModelCount = 0
  for (const entry of carModelYearsData as CarModelYearEntry[]) {
    const brand = await prisma.brand.findUnique({
      where: { slug: toSlug(entry.brand) },
    })
    if (!brand) {
      console.warn(`  ⚠️  Brand not found: ${entry.brand}`)
      continue
    }

    for (const modelEntry of entry.models) {
      const brandModel = await prisma.brandModel.findFirst({
        where: {
          brandId: brand.id,
          name: modelEntry.name,
        },
      })

      if (!brandModel) {
        console.warn(`  ⚠️  BrandModel not found: ${entry.brand} ${modelEntry.name}`)
        continue
      }

      for (const year of modelEntry.years) {
        const slug = `${year}`
        await prisma.carModel.create({
          data: {
            name: `${modelEntry.name} ${year}`,
            year,
            slug,
            brandModelId: brandModel.id,
          },
        })
        carModelCount++
      }
    }
  }
  console.log(`✅ CarModels done (${carModelCount} created)\n`)

  // ── 4. Specs ───────────────────────────────────────────────────────────────
  console.log(`🌱 Seeding ${(specsBatch as SpecsEntry[]).length} specs...`)
  let specsCount = 0
  let specsFailed = 0

  for (const item of specsBatch as SpecsEntry[]) {
    try {
      const brand = await prisma.brand.findUnique({
        where: { slug: toSlug(item.brand) },
      })
      if (!brand) {
        specsFailed++
        continue
      }

      const brandModel = await prisma.brandModel.findFirst({
        where: { brandId: brand.id, name: item.model },
      })
      if (!brandModel) {
        specsFailed++
        continue
      }

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
