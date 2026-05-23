import Link from "next/link";
import CarModelImage from "./car-model-image";
import { getCarModel } from "@/app/lib/data";

import CategoryTab from "./CategoryTab";

export default async function CarModel({ brandSlug, brandModelSlug, carModelSlug } : {brandSlug: string, brandModelSlug: string, carModelSlug: string} ) {
  // await new Promise(resolve => setTimeout(resolve, 2000))
  const carYearModel = await getCarModel(brandSlug, brandModelSlug, carModelSlug)
  if (!carYearModel) return null
  const sum = carYearModel.complaints.reduce((acc, c) => acc + (c.severity ?? 0), 0)
  const avgSeverity = (sum / carYearModel.complaints.length).toFixed(1)
  console.log("carModel ", carYearModel)
  if (!carYearModel) {
    return <div>Year Model not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className='flex flex-1 flex-col bg-navy px-4 py-8 md:px-16 md:py-8 font-bebas-neue'>
        <h3 className='text-sm text-red-500 md:text-xl'>{carYearModel.brandModel.brand.name} {carYearModel?.name} {carYearModel.year}</h3>
        <h1 className="text-2xl md:text-4xl text-white">COMPLAINTS</h1>
        <h1 className="text-gray-500 mb-2 md:mb-4 font-dm-mono">{carYearModel._count.complaints} reported {carYearModel._count.complaints > 1 ? 'issues' : 'issue'}</h1>
        <CarModelImage carYearModel={carYearModel}/>
        <div>
          <div className="flex flex-row justify-between text-gray-300 py-2 border-b border-gray-300">
            <h2>Total</h2>
            <h2>{carYearModel._count.complaints}</h2>
          </div>
          <div className="flex flex-row justify-between text-gray-300 py-2 border-b border-gray-300">
            <h2>Severity</h2>
            <h2>{avgSeverity}</h2>
          </div>
          <div className="flex flex-row justify-between text-gray-300 py-2 border-b border-gray-300">
            <h2>Total</h2>
            <h2>{carYearModel._count.complaints}</h2>
          </div>
        </div>
      </div>
      
       
      {carYearModel.complaints.length == 0 ?
      <div>
        <h3 className='text-lg md:text-2xl font-semibold mb-4 text-center'>There are no complaints for this {carYearModel.brandModel.brand.name} {carYearModel?.name} {carYearModel.year}. 
        <span className='underline hover:opacity-70'><Link href={`/${brandSlug}/${brandModelSlug}/${carModelSlug}/complaint`}> Add your complaint here.</Link></span></h3>
      </div>
       : 
        <CategoryTab carYearModel={carYearModel}/>
      }
    </div>
  )
}