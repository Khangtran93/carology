import prisma from "../../lib/prisma"
import slugify from 'slugify'
import brandModels from './brand-models.json'

export async function seedBrandModels() {
  console.log(`Seeding models for ${brandModels.length} brands...`)

  for (const entry of brandModels) {
    const brandSlug = slugify(entry.brand, { lower: true, strict: true })

    const brand = await prisma.brand.findUnique({
      where: { slug: brandSlug }
    })

    if (!brand) {
      console.log(`  ⚠ Brand not found: ${entry.brand} — skipping`)
      continue
    }

    for (const modelName of entry.models) {
      const modelSlug = slugify(modelName, { lower: true, strict: true })

      await prisma.brandModel.upsert({
        where: { brandId_slug: { brandId: brand.id, slug: modelSlug } },
        update: {},
        create: {
          name: modelName,
          slug: modelSlug,
          brandId: brand.id,
        },
      })
    }

    console.log(`  ✓ ${entry.brand} — ${entry.models.length} models`)
  }

  console.log('Done!')
}
