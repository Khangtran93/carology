import prisma from '@/../lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Section2 = async () => {
  const brands = await prisma.brand.findMany()
  return (
    <div className='max-w-[1300px] mx-auto flex flex-col justify-between mt-24'>
      <div className='mx-auto justify-center'>
        <h1 className="text-5xl font-bold mb-4 text-center">Explore Vehicles</h1>
        <h2 className='text-2xl font-semibold mb-4'>Browse all car brands and models to find your next ride</h2>
      </div>

      <div className='mt-8 border border-gray-400 rounded-2xl p-8 bg-gray-200'>
        <ul className='flex flex-col h-[300px] flex-wrap'>
        {brands.map((brand, index) => (
            <li key={index} className='flex flex-row mt-4 text-lg font-bold items-center gap-x-2 pl-12'>
              <Image src="/images/truck-wheel.png"alt="wheel-icon" width={18} height={18} className='max-h-[18px]'/>
              <Link href={`/brand/${brand.id}`} className=''>
                {brand.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Section2
