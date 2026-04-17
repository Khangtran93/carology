'use client'
import { BrandModelWithCarModels } from "@/app/lib/definition";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from 'usehooks-ts'

export default function CarModelChart({brandModel}: {brandModel: BrandModelWithCarModels | null }) {
  const isMobile = !useMediaQuery('(min-width: 768px)')

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getBarStyle = (count: number) => {
    if (!mounted) return {} // render nothing until client takes over
    return isMobile
      ? { width: count === 0 ? '5px' : `${count * 12}px`, height: '10px' }
      : { height: count === 0 ? '5px' : `${count * 12}px`, width: '70%' }
  }
  
  // rest of your component

  return (
    <>
    <ul className='w-full flex flex-col md:flex-row md:justify-center gap-x-4 m-12 md:min-h-[400px] border-2 border-gray-200 rounded-xl p-4'>
      {brandModel?.carModels.map((carModel, index) => (
       <Link className='flex flex-row md:flex-col md:justify-end items-center gap-x-2 md:gap-x-4' href={`./${brandModel.slug}/${carModel.year}`} key={index}> 
          <h4 className='text-lg md:text-xl md:order-last w-[40px] md:w-[60px] text-center'>{carModel.year}</h4>
          <div 
            style={getBarStyle(carModel._count.complaints)}
            className={`bg-blue-200 p-1 w-[15px] h-[5px] md:w-[70%] md:h-[10px] 
            ${carModel._count.complaints == 0 && 'bg-green-300'}`}>
          </div>
          <p className='md:order-first'>{carModel._count.complaints}</p>  
        </Link>
      ))}
      </ul>
    </>
  )

}