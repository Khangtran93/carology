import React, { Suspense } from 'react'
import BrandModelList from '@/app/components/ui/brand-model-list'
import { BrandModelListSkeleton } from '@/app/components/ui/skeletons'

export default async function Page({params}: {params: Promise<{brandSlug:string}>}) {
  const {brandSlug} = await params
  return (
    <>
    <Suspense fallback={<BrandModelListSkeleton/>}>
      <BrandModelList brandSlug={brandSlug}/>
    </Suspense>
    </>
  )
}

