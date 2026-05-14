import { Drivetrain, FuelType } from '@/generated/prisma'
import prisma from '../../lib/prisma'
import specsBatch from './specs-batch.json'

interface SpecsData {
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

export async function seedSpecs() {
  const data: SpecsData[] = specsBatch

  console.log(`Seeding ${data.length} specs...`)

  for (const item of data) {
    try {
      const brand = await prisma.brand.findUnique({
        where: { slug: item.brand.toLowerCase() },
      })

      if (!brand) {
        console.log(`  ✗ ${item.brand} ${item.model} - brand not found`)
        continue
      }

      const brandModel = await prisma.brandModel.findFirst({
        where: {
          brandId: brand.id,
          name: item.model,
        },
      })

      if (!brandModel) {
        console.log(
          `  ✗ ${item.brand} ${item.model} - brand model not found`
        )
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

      console.log(`  ✓ ${item.brand} ${item.model}`)
    } catch (err) {
      console.log(
        `  ✗ ${item.brand} ${item.model} - ${
          err instanceof Error ? err.message : 'unknown error'
        }`
      )
    }
  }

  console.log('Done!')
}