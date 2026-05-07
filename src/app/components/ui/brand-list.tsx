'use client'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { Brand } from "@/generated/prisma"
import Link from "next/link"
import { useState } from "react"

const listClass = 'md:mt-4 border border-gray-400 rounded-2xl p-4 md:p-6 w-full gap-x-4 md:gap-x-8 '
const itemClass = 'flex flex-row mt-2 md:mt-4 text-lg font-bold items-center gap-x-2 pl-4 sm:pl-18 md:pl-8 lg:pl-12 basis-1/2 hover:text-blue-400 hover:opacity-90 text-ellipsis truncate' 

function BrandItems({ brands }: { brands: Brand[] }) {
  return <>
    {brands.map((brand, index) => (
      <li key={index} className={itemClass}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://carimagesapi.com/api/v1/makes/${brand.slug}/logo`}
          alt={`${brand.name} Logo`}
          width="24"
          height="24"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = "/images/truck-wheel.png"
          }}
        />
        <Link href={`/${brand.slug}`} className='truncate'>{brand.name}</Link>
      </li>
    ))}
  </>
}

export default function BrandList({ brands }: { brands: Brand[] }) {
  const [expand, setExpand] = useState(false)

  return (
    <div className="flex flex-col items-center">

      {/* Mobile */}
      <ul className={`${listClass} grid grid-cols-2 md:hidden`}>
        <BrandItems brands={expand ? brands : brands.slice(0, 8)} />
      </ul>

      {/* Desktop */}
      <ul className={`${listClass} hidden md:grid md:grid-cols-4 lg:grid-cols-5`}>
        <BrandItems brands={brands} />
      </ul>

      <button
        className="bg-gray-200 shadow-lg text-black px-2 py-1 max-w-max rounded-lg mt-2 md:hidden"
        onClick={() => setExpand(!expand)}
      >
        {expand
          ? <ChevronUpIcon className="w-5 h-5" />
          : <ChevronDownIcon className="w-5 h-5" />
        }
      </button>
    </div>
  )
}