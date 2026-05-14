import prisma from "../../lib/prisma"
import slugify from 'slugify'
import brands from './brands.json'

export async function seedBrands() {
  console.log(`Seeding ${brands.length} brands...`)

  for (const brand of brands) {
    const slug = slugify(brand.name, { lower: true, strict: true })

    await prisma.brand.upsert({
      where: { slug },
      update: {},
      create: {
        name: brand.name,
        slug,
      },
    })

    console.log(`  ✓ ${brand.name}`)
  }

  console.log('Done!')
}

