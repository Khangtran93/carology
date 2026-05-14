import prisma from "../../lib/prisma"
import slugify from 'slugify'
import carTypes from "./brand-model-cartypes.json"
import { CarType } from "@/generated/prisma"

export async function seedCarTypes() {
  for (const entry of carTypes) {
    const brandSlug = slugify(entry.brand, { lower: true, strict: true })
    const brand = await prisma.brand.findUnique({
      where: { slug: brandSlug }
    })

    if (!brand) {
      console.log(`  ⚠ Brand not found: ${entry.brand} — skipping`)
      continue
    }

    for (const modelName of entry.models) {
      const modelSlug = slugify(modelName.name, { lower: true, strict: true })
      const carTypeEnum = modelName.carType as CarType;

      await prisma.brandModel.update({
        where: {brandId_slug: {brandId: brand.id, slug: modelSlug}},
        data: {
          carType: carTypeEnum
        }
      })
    }

    console.log(`  ✓ ${entry.brand} — ${entry.models.length} models`)
  }
  console.log('Done!')
}