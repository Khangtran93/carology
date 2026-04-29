import CreateComplaintForm from "@/app/components/forms/create-complaint-form"
import { getCarModel, getBrandModels, getAllBrands, getCarModels } from "@/app/lib/data"
import { BrandModel } from "@/generated/prisma"
import { auth } from "../../../../../../auth"
import { Suspense } from "react"

export default async function Page({params} : {params: Promise<{brandSlug: string, brandModelSlug: string, carModelSlug: string}>}) {
  const {brandSlug, brandModelSlug, carModelSlug} = await params
  const session = await auth()
  const brands = await getAllBrands()
  let brandModels: BrandModel[] | undefined = []
  const carModel = await getCarModel(brandSlug, brandModelSlug, carModelSlug)
  if (!carModel) return <div>Not found</div>
  brandModels = await getBrandModels(carModel.brandModel.brand.id) ?? []

  const carModels = await getCarModels(carModel?.brandModel.id)
  return (
    <Suspense>
      <CreateComplaintForm userId={session?.user?.id}  brands={brands} brandModels={brandModels} carModels={carModels} carModel={carModel} />
    </Suspense>
  )
}