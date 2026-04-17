'use client'
import { Brand } from "@/generated/prisma"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"

export default function BrandList({brands}: {brands: Brand[]}) {
  const isMobile = !useMediaQuery('(min-width: 768px)')
  const [expand, setExpand] = useState(false)
  return (
  <div className="flex flex-col items-center">
    <ul className='md:mt-8 border border-gray-400 rounded-2xl p-6 w-full
      grid grid-cols-2 md:grid-cols-5 place-items-stretch md:min-h-max flex-wrap gap-x-4 md:gap-x-8'>

      {(isMobile && !expand)? 
      brands.slice(0,10).map((brand, index) => (
        <li key={index} className='flex flex-row mt-2 md:mt-4 text-lg font-bold items-center gap-x-2 md:pl-12 basis-1/2'>
          <Image src="/images/truck-wheel.png"alt="wheel-icon" width={18} height={18} className='max-h-[18px]'/>
          <Link href={`/brand/${brand.slug}`} className=''>
            {brand.name}
          </Link>
        </li> )) :
         brands.map((brand, index) => (
          <li key={index} className='flex flex-row mt-2 md:mt-4 text-lg font-bold items-center gap-x-2 md:pl-12 basis-1/2'>
            <Image src="/images/truck-wheel.png"alt="wheel-icon" width={18} height={18} className='max-h-[18px]'/>
            <Link href={`/brand/${brand.slug}`} className=''>
              {brand.name}
            </Link>
          </li>

        ))}
    </ul>
    {isMobile && <button className="bg-black text-white p-2 max-w-max rounded-lg mt-2" onClick={() => setExpand(!expand)}>
      {expand ? 'Show less' : 'Show more'}
      </button>}
  </div>
)}