import Image from 'next/image'
import React from 'react'

const Section3 = () => {
  return (
    <div className='flex flex-col max-w-[1300px] mt-24 mb-24 mx-auto justify-center'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-5xl font-bold mb-4'>Best Vehicles</h1>
        <h3 className='text-2xl font-semibold mb-4'>Top-rated vehicles based on user reviews and overall performance</h3>
      </div>
       <div className="flex mt-12 gap-x-24 justify-between">
            <div>
              <Image alt="car-img-hero-page" src="/images/car2.png" width={480} height={0} className="object-cover h-auto rounded-md"/>
            </div>
            <div className="flex flex-col max-w-[70%] justify-center">
             <ul className='flex flex-col justify-center gap-y-8 justify-between p-12'>
              <li className='flex gap-x-8 justify-between items-center'>
                <h3 className='text-2xl font-bold'>2006 Honda Accord </h3>
                <div className='w-[280px] h-[24px] bg-green-400 rounded-sm'></div>
              </li>
              <li className='flex gap-x-8 justify-between items-center'>
                <h3 className='text-2xl font-bold'>2007 Volkswagen Golf</h3>
                <div className='w-[280px] h-[24px] bg-green-400 rounded-sm'></div>
              </li>
              <li className='flex gap-x-8 justify-between items-center'>
                <h3 className='text-2xl font-bold'>2020 Honda Civic</h3>
                <div className='w-[280px] h-[24px] bg-green-400 rounded-sm'></div>
              </li>
             </ul>
            </div>
        </div>
    </div>
  )
}

export default Section3
