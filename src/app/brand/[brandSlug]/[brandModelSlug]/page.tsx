import React, { Suspense } from 'react'
// import prisma from '@/../lib/prisma'
// import Link from 'next/link'
import CarModelChart from '@/app/components/ui/car-model-chart'
import { titleCase } from '@/app/lib/utils'
import { CarModelChartSkeleton } from '@/app/components/ui/skeletons'

async function Page({params}: {params: Promise<{brandSlug: string, brandModelSlug: string}>}) {
  const {brandSlug, brandModelSlug} = await params

  return (
    <div className='max-w-[1300px] mx-auto flex flex-col items-center'>
      <h1 className='text-2xl md:text-5xl font-bold md:mb-4'>{titleCase(brandSlug)} {titleCase(brandModelSlug)} </h1>
      <h2 className='text-lg md:text-2xl font-semibold md:mb-4'>Year Comparsion</h2>
      <Suspense fallback={<CarModelChartSkeleton/>}>
        <CarModelChart brandSlug={brandSlug} brandModelSlug={brandModelSlug}/>
      </Suspense>
    </div>
  )
}

export default Page
