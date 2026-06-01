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
  if (!carYearModel) {
    return <div>Year Model not found</div>;
  }

  return (
    <div className="w-full grid lg:grid-cols-4 overflow-x-hidden">
      <div className='flex flex-col w-full lg:col-span-1 bg-navy px-8 pt-8 pb-4 font-bebas-neue overflow-x-hidden'>
        <h3 className='text-md md:text-lg lg:text-xl xl:text-2xl text-red-500 '>VEHICLE YEAR MODEL</h3>
        <h1 className="text-3xl md:text-2xl lg:text-3xl xl:text-4xl text-white">{carYearModel.brandModel.brand.name} {carYearModel?.name} {carYearModel.year}</h1>
        <h1 className="text-md md:text-lg lg:text-xl xl:text-2xl text-gray-500 mb-2 md:mb-4 font-bebas-neue">{carYearModel._count.complaints} reported {carYearModel._count.complaints > 1 ? 'complaints' : 'complaint'}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 md:px-12 lg:grid-cols-1 lg:px-0 ">
          <CarModelImage carYearModel={carYearModel}/>
          <div className="col-span-1 px-4 sm:px-32 md:px-4 lg:px-0">
            <div className="flex flex-row justify-between text-gray-300 py-2 border-b border-gray-300">
              <h2>Total Complaints</h2>
              <h2>{carYearModel._count.complaints}</h2>
            </div>
            <div className="flex flex-row justify-between text-gray-300 py-2">
              <h2>Average Severity</h2>
              <h2>{avgSeverity}</h2>
            </div>
            {/* <div className="flex flex-row justify-between text-gray-300 py-2 border-b border-gray-300">
              <h2>Total</h2>
              <h2>{carYearModel._count.complaints}</h2>
            </div> */}
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