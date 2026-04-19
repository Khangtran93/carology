'use client'
import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/outline';
import { Brand } from "@/generated/prisma"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useMediaQuery } from "usehooks-ts"

export default function BrandList({brands}: {brands: Brand[]}) {
  const isMobile = !useMediaQuery('(min-width: 768px)')
  const [expand, setExpand] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const showAll = !isClient || !isMobile || expand

  useEffect(() => {
    setIsClient(true)
  },[])
  return (
  <div className="flex flex-col items-center">
    <ul className='md:mt-8 border border-gray-400 rounded-2xl p-6 w-full
      grid grid-cols-2 md:grid-cols-5 place-items-stretch md:min-h-max flex-wrap gap-x-4 md:gap-x-8'>
      {(showAll ? brands : brands.slice(0,10))
      .map((brand, index) => (
          <li key={index} className='flex flex-row mt-2 md:mt-4 text-lg font-bold items-center gap-x-2 md:pl-12 basis-1/2'>
            {/* <Image src="/images/truck-wheel.png" alt="wheel-icon" width={18} height={18} className='max-h-[18px]'/> */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`https://carimagesapi.com/api/v1/makes/${brand.slug}/logo`} 
                alt={`${brand.name} Logo`} 
                width="24" 
                height="24"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src="/images/truck-wheel.png"
                }}
                />
            <Link href={`/brand/${brand.slug}`} className=''>
              {brand.name}
            </Link>
          </li>

        ))}
    </ul>
    <button className="bg-gray-200 shadow-lg border-opacity text-black px-2 py-1 max-w-max rounded-lg mt-2 md:hidden" onClick={() => setExpand(!expand)}>
      {expand ? <ChevronUpIcon className="w-5 h-5 border-opacity"/> : <ChevronDownIcon className="w-5 h-5"/>}
    </button>
  </div>
)}