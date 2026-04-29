'use server'

import { Brand } from "@/generated/prisma"
import prisma from "../../../lib/prisma"
import { unstable_cacheTag as cacheTag } from 'next/cache'

export async function getAllBrands() {
  'use cache'
  cacheTag('brands')
  try {
    const brands: Brand[] = await prisma.brand.findMany({
      orderBy: {
        slug: "asc"
      }
    }
    )
    return brands
  } catch(error) {
    console.error(error)
    throw new Error("Failed to fetch car brands")
  }
}
export async function getBrandModels(brandId:string) {
  'use cache'
  cacheTag('brandModels')
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

export async function getBrandModelsByBrandSlug(brandSlug:string | undefined) {
  'use cache'
  cacheTag('_brandModels')
  if (brandSlug) {
    try {
      const brandModels = await prisma.brand.findUnique({
        where: {
          slug: brandSlug,
        },
        include: {
          brandModels: true, 
        },
      })

      return brandModels
    } catch (error) {
      console.log(error)
    }
  }
  
}

export async function getCarModel(brandSlug: string, brandModelSlug: string, carModelSlug: string) {
  'use cache'
  cacheTag('carModel')
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
  'use cache'
  cacheTag('carModels')
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

export async function getCarModelsBySlug(brandSlug: string, brandModelSlug: string) {
  'use cache'
  cacheTag('_carModels')
  try {
    const carModels = await prisma.brandModel.findFirst({
      where: {
        slug: brandModelSlug,
        brand: {
          slug: brandSlug
        }
      },
      include: {
        brand: true,
        carModels: {
          include: {
            _count: {
              select: {
                complaints: true
              }
            }
          },
          orderBy: {
            year: 'asc'
          }
        } // prefetch_related
      }
    })
    return carModels
  } catch (error) {
    console.log(error)
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