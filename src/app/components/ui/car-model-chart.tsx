import { getCarModelsBySlug } from "@/app/lib/data";
import { CarModelChartClient } from "./car-model-chart-client";


export default async function CarModelChart({brandSlug, brandModelSlug}: {brandSlug: string, brandModelSlug: string}) {
    // await new Promise(resolve => setTimeout(resolve, 2000))
    const carModels = await getCarModelsBySlug(brandSlug, brandModelSlug)
  
  return (
    <>
    <CarModelChartClient carModels={carModels}/>
    </>
  )

}