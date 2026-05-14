import React, { Suspense } from 'react'
import CarModelChart from '@/app/components/ui/car-model-chart'
import { CarModelChartSkeleton } from '@/app/components/ui/skeletons'

async function Page({params}: {params: Promise<{brandSlug: string, brandModelSlug: string}>}) {
  const {brandSlug, brandModelSlug} = await params

  return (
      <Suspense fallback={<CarModelChartSkeleton/>}>
        <CarModelChart brandSlug={brandSlug} brandModelSlug={brandModelSlug}/>
      </Suspense>
  )
}

export default Page
