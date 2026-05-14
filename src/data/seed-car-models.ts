import prisma from "../../lib/prisma"
import slugify from 'slugify'
import carModelYears from './car-model-years.json'
import { revalidateTag } from "next/cache"

export async function seedCarModels() {
  console.log(`Seeding car model years for ${carModelYears.length} brands...`)

  for (const entry of carModelYears) {
    const brandSlug = slugify(entry.brand, { lower: true, strict: true })

    const brand = await prisma.brand.findUnique({
      where: { slug: brandSlug },
      include: { brandModels: true }
    })

    if (!brand) {
      console.log(`  ⚠ Brand not found: ${entry.brand} — skipping`)
      continue
    }

    for (const modelEntry of entry.models) {
      const modelSlug = slugify(modelEntry.name, { lower: true, strict: true })

      const brandModel = brand.brandModels.find(bm => bm.slug === modelSlug)

      if (!brandModel) {
        console.log(`  ⚠ BrandModel not found: ${entry.brand} ${modelEntry.name} — skipping`)
        continue
      }

      for (const year of modelEntry.years) {
        const carModelSlug = `${year}`

        await prisma.carModel.upsert({
          where: { brandModelId_slug: { brandModelId: brandModel.id, slug: carModelSlug } },
          update: {},
          create: {
            name: `${modelEntry.name}`,
            year,
            slug: carModelSlug,
            brandModelId: brandModel.id,
          },
        })
      }

      console.log(`  ✓ ${entry.brand} ${modelEntry.name} — ${modelEntry.years.length} years`)
    }
  }
  
  revalidateTag('brands')
  revalidateTag('brandModels')
  revalidateTag('_carModels')
  revalidateTag('carModel')
  revalidateTag('carModels')
  console.log('Done!')
}
