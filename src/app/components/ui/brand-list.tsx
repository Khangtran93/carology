'use client'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { Brand } from "@/generated/prisma"
import Link from "next/link"
import { useState } from "react"

const listClass = 'w-full md:w-[90%] xl:w-full py-2 md:mt-4 rounded-2xl md:bg-white md:shadow-xl md:border md:border-gray-200 px-2 md:px-2 gap-x-2 gap-y-2 md:gap-x-0 md:gap-y-0'
const itemClass = 'relative group flex flex-row text-lg p-2 font-bold items-center gap-x-2 basis-1/2 hover:text-blue-400 hover:opacity-90 bg-white border border-border md:border-none md:bg-white bg-cream hover:bg-cream rounded-xl text-ellipsis truncate' 

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
        <Link href={`/${brand.slug}`} className='truncate font-dm-sans'>{brand.name}</Link>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
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