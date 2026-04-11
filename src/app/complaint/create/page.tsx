import CreateComplaintForm from "@/app/components/forms/create-review-form"
import { getCarModel, getBrandModels, getAllBrands, getCarModels } from "@/app/lib/data"
import { auth } from "../../../../auth"

export default async function Page() {
  // const {brandSlug, brandModelSlug, carModelSlug} = await params
  const session = await auth()
  const brands = await getAllBrands()
  const brandModels = await getBrandModels(brands[0].id)
  const carModels = await getCarModels(brandModels[0].id)
  const carModel = await getCarModel(brands[0].slug, brandModels[0].slug, carModels[0].slug)
  return (
    <CreateComplaintForm userId={session?.user?.id}  brands={brands} brandModels={brandModels} carModels={carModels} carModel={carModel}/>
  )
}