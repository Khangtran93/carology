import React from 'react'
import prisma from '@/../lib/prisma'
import Link from 'next/link'

type BrandPageProps = {
  params: {
    brandId: string
  }
}

export default async function BrandPage({params}: BrandPageProps) {
  const { brandId } = await params
  const carBrand = await prisma.brand.findUnique({
    where: {
      id: brandId,
    },
    include: {
      brandModels: true, 
    },
  })
  return (
    <>
    {carBrand ? 
    <div className='flex flex-col max-w-[1300px] mx-auto pb-24'>
      <div>
        <h1 className="text-5xl font-bold mb-4 text-center">{carBrand.name}</h1>
        <h2 className='text-2xl font-semibold mb-4 text-center'>{carBrand.name} Model Line Comparison </h2>
        <h4 className='text-xl font-semibold mb-4'>Carology.com has received 30,610 complaints from verified vehicle owners across various makes and models. The data highlights recurring issues in several popular vehicles, with some models showing a significantly higher rate of mechanical and electrical failures.</h4>
      </div>
      <ul className='flex flex-col h-[300px] flex-wrap items-center mt-8'>
      {carBrand.brandModels.map((brandModel, index) => (
       <Link key={index} href={`/brand/${carBrand.id}/${brandModel.id}`} className='p-2 bg-gray-200 text-black border border-gray-400 rounded-lg m-2 w-[30%]' > 
          <li >
            {brandModel.name}
          </li>
        </Link>
      ))}
      </ul>
    </div> : 
    <div>Not found</div>}
    </>
  )
}

