import React from 'react'
import prisma from '@/../lib/prisma'
// import Link from 'next/link'
import CarModelChart from '@/app/components/ui/car-model-chart'

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

  return (
    <div className='max-w-[1300px] mx-auto flex flex-col items-center'>
      <h1 className='text-5xl font-bold mb-4'>{brandModel?.brand.name} {brandModel?.name} </h1>
      <h2 className='text-2xl font-semibold mb-4'>Year Comparsion</h2>
      <CarModelChart brandModel={brandModel}/>
      {/* <ul className='w-full flex flex-col md:flex-row md:justify-center gap-x-4 m-12 md:min-h-[400px] border-2 border-gray-200 rounded-xl p-4'>
      {brandModel?.carModels.map((carModel, index) => (
       <Link className='flex flex-row md:flex-col md:justify-end items-center gap-x-2 md:gap-x-4' href={`./${brandModelSlug}/${carModel.year}`} key={index}> 
          <h4 className='text-lg md:text-xl md:order-last w-[40px] md:w-[60px] text-center'>{carModel.year}</h4>
          <div 
            style={{height: `${carModel._count.complaints == 0 ? '5' : carModel._count.complaints * 12}px`}} 
            className={`bg-blue-200 p-1 w-[15px] h-[5px] md:w-[70%] md:h-[10px] 
            ${carModel._count.complaints == 0 && 'bg-green-300'}`}>
          </div>
          <p className='md:order-first'>{carModel._count.complaints}</p>  
        </Link>
      ))}
      </ul> */}
    </div>
  )
}

export default Page
