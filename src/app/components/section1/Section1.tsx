import Image from 'next/image'
import React from 'react'

const Section1 = () => {
  return (
    <div className="max-w-[1300px] mx-auto flex justify-between">
    <div className="flex flex-col max-w-[700px] justify-center">
      <h1 className="text-5xl font-bold mb-4 ">Discover the Best Cars for Your Next Journey</h1>
      <h3 className="text-2xl font-semibold">Unbiased reviews that cover performance, comfort, features, and more. Find the right car with expert insights and real-world testing.</h3>
    </div>
    <div>
      <Image alt="car-img-hero-page" src="/images/car2.png" width={585} height={0} className="object-cover h-auto rounded-md"/>
    </div>
  </div>
  )
}

export default Section1
