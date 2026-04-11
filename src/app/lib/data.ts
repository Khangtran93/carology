'use server'
import prisma from "../../../lib/prisma"

export async function getAllBrands() {
  try {
    const brands = await prisma.brand.findMany()
    return brands
  } catch(error) {
    console.error(error)
    throw new Error("Failed to fetch car brands")
  }
}
export async function getBrandModels(brandId:string) {
  console.log("getBrandModels")
  console.log("brandId ", brandId)
  try {
    const brandModels = await prisma.brandModel.findMany({
      where: {
        brandId: brandId
      },
      orderBy: {
        name: 'asc'
      }
    })
    return brandModels
  } catch (error) {
    console.error(error)
    throw new Error("Failed to fetch brand models")
  }
}

export async function getCarModel(brandSlug: string, brandModelSlug: string, carModelSlug: string) {
  try {
    const carModel = await prisma.carModel.findFirst({
      where: {
        slug: carModelSlug,
        brandModel: {
          slug: brandModelSlug,
          brand: {
            slug: brandSlug
          }
        }
      },
      include: {
        brandModel: {
          include: {
            brand: true
          }
        },
        complaints: {
          include: {
            user: true
          }
        }
      }
    })
    return carModel
  } catch (error) {
    console.error(error)
    throw new Error("Failed to fetch car model")
  }
}

export async function getCarModels(brandModelId:string) {
  try {
    const carModels = prisma.carModel.findMany({
      where: {
        brandModelId: brandModelId
      },
      orderBy: {
        year: 'asc'
      }
    })
    return carModels
  } catch(error) {
    console.error(error)
    throw new Error("Failed to fetch car models")
  }
}


export async function searchAll(query: string) {
  if (!query || query.length < 2) return { brands: [], carModels: [], complaints: [] }
  console.log(`query ${query}`)
  const [brands, carModels, complaints] = await Promise.all([
    prisma.brand.findMany({
      where: { name: { contains: query, mode: 'insensitive' } },
      take: 5
    }),
    prisma.carModel.findMany({
      where: { name: { contains: query, mode: 'insensitive' } },
      include: {
        brandModel: { 
          include: {
            brand: true
            }
          },
        },
      take: 5
    }),
    prisma.complaint.findMany({
      where: { title: { contains: query, mode: 'insensitive' } },
      include: { carModel: { include: { brandModel: { include: { brand: true } } } } },
      take: 5
    })
  ])

  return { brands, carModels, complaints }
}