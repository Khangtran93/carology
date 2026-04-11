import React from 'react'
import prisma from '@/../lib/prisma'
import Link from 'next/link'

async function Page({params}: {params: Promise<{brandSlug: string, brandModelSlug: string}>}) {
  const {brandSlug, brandModelSlug} = await params

  //fetch 1 brand model and display all years with corresponding number of complaints
  const brandModel = await prisma.brandModel.findFirst({
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
  // const brand = await prisma.brand.findUnique({
  //   where: { slug: brandSlug }
  // })
  
  // const carModels = await prisma.brandModel.findUnique({
  //   where: {
  //     brandId_slug: {
  //       brandId: brand.id,
  //       slug: modelSlug
  //     }
  //   },
  //   include: {
  //     brand: true, // select_related
  //     carModels: {
  //       include: {
  //         _count: {
  //           select: {
  //             complaints: true
  //           }
  //         }
  //       },
  //       orderBy: {
  //         year: 'asc'
  //       }
  //     } // prefetch_related
  //   }
  // })

  console.log("carModels: ", brandModel)
  return (
    <div className='max-w-[1300px] mx-auto flex flex-col items-center'>
      <h1 className='text-5xl font-bold mb-4'>{brandModel?.brand.name} {brandModel?.name} </h1>
      <h2 className='text-2xl font-semibold mb-4'>Year Comparsion</h2>
      <ul className='flex flex-row gap-x-4 m-12 min-h-[400px] border-2 border-gray-200 rounded-xl p-4'>
      {brandModel?.carModels.map((carModel, index) => (
       <Link className='flex flex-col-reverse items-center' href={`./${brandModelSlug}/${carModel.year}`} key={index}> 
       <li className='flex flex-col items-center'>
          <div 
            style={{height: `${carModel._count.complaints == 0 ? '10px' : carModel._count.complaints * 15}px`}} className={`flex justify-center items-center bg-blue-200 w-[40px] 
            text-center ${carModel._count.complaints == 0 && 'h-[10px] bg-green-300'}`}>
            {carModel._count.complaints}
          </div>
          <h4 className='text-2xl'>{carModel.year}</h4>
        </li>
        </Link>
      ))}
      </ul>
    </div>
  )
}

export default Page
