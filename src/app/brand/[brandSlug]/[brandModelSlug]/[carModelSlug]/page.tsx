import React, { Suspense } from 'react'
import CarModel from '@/app/components/ui/car-model'
import { CarModelSkeleton } from '@/app/components/ui/skeletons'

async function Page({params}: {params: Promise<{brandSlug: string, brandModelSlug: string, carModelSlug: string}>}) {
  const {brandSlug, brandModelSlug, carModelSlug} = await params

  return (
    <div className='max-w-[1300px] mx-auto'>
    <Suspense fallback={<CarModelSkeleton/>}>
      <CarModel brandSlug={brandSlug} brandModelSlug={brandModelSlug} carModelSlug={carModelSlug}/>
    </Suspense>
      </div>
  )
}

export default Page
