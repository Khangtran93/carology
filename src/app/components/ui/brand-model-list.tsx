import Link from "next/link"
import { getBrandModelsByBrandSlug } from "@/app/lib/data"
import { CAR_TYPE_ORDER } from "@/app/lib/definition"
import { CAR_TYPE_LABELS} from "@/app/data/category-labels"
import { CarType } from "@/generated/prisma"

export default async function BrandModelList({brandSlug}: {brandSlug: string | undefined}) {
  // await new Promise(resolve => setTimeout(resolve, 200))
  const brand = await getBrandModelsByBrandSlug(brandSlug)
  if (!brand) return (<div>Not found</div>)

  const totalComplaints = brand.brandModels.flatMap(
    (brandModel) => brandModel.carModels
  ).reduce(
    (sum, carModel) => sum + carModel._count.complaints, 0
  )
  const complaints = brand.brandModels
  .flatMap((brandModel) => brandModel.carModels)
  .flatMap((carModel) => carModel.complaints)
  const _avgSeverity = complaints.length > 0 ? 
  complaints.reduce
  ((sum, complaint) => sum + (complaint.severity ?? 0), 0) / complaints.length
  : 0

  const avgSeverity = Math.round(_avgSeverity).toFixed(1)
 
  const grouped = Object.groupBy(brand.brandModels, (model) => model.carType ?? 'OTHER' )
  const sorted = Object.entries(grouped).sort(
    ([a], [b]) => CAR_TYPE_ORDER.indexOf(a) - CAR_TYPE_ORDER.indexOf(b)
  )
  return (
    <>
    {brand &&
    <>
    <div className="flex flex-col md:flex-row justify-between w-full bg-navy py-6 px-12 md:py-12 sm:pl-32 md:pl-48 md:pr-72 text-white font-bebas-neue">
      <div>
        <p className="text-red-500 text-lg md:text-xl lg:text-2xl font-bebas-neue">VEHICLE BRAND</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold md:mb-4 text-white">{brand.name}</h1>
        <div className="flex flex-row">
          <div className="flex w-max-w flex-col border-r-2 pr-4 md:pr-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl">{brand._count.brandModels}</h1>
            <h1 className="text-lg md:text-2xl lg:text-3xl">Models</h1>
          </div>
          <div className="flex flex-col pl-4 md:pl-8 border-r-2 pr-4 md:pr-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl">{totalComplaints}</h1>
            <h1 className="text-lg md:text-2xl lg:text-3xl">Complaints</h1>
          </div>
          <div className="flex flex-col px-4 md:px-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl">{avgSeverity}</h1>
            <h1 className="text-lg md:text-2xl lg:text-3xl">Severity</h1>
          </div>
        </div> 
      </div>

    </div>
    <div className="max-w-[800px] mx-auto px-4 my-8">
      {sorted.map(([type, brandModels]) => (
        <section key={type} className="flex flex-col">
          <h2 className="mb-2 text-lg md:text-xl lg:text-2xl text-gray-500 font-bebas-neue">{CAR_TYPE_LABELS[type as CarType]}</h2>
          <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2 mb-4'>
          {brandModels?.map((brandModel) => {
              const totalComplaintBrandModel = brandModel.carModels.reduce((sum, carmodel) => sum + carmodel._count.complaints, 0)
            return (
              <div key={brandModel.id} className="relative group overflow-hidden bg-white p-2 border border-border hover:border-red-500 rounded-lg cursor-pointer">
                <Link  href={`/${brand.slug}/${brandModel.slug}`} className='block text-lg md:text-xl font-bebas-neue'>          
                    {brandModel.name}         
                </Link>
                <p className="text-red-500 text-sm font-dm-mono">{totalComplaintBrandModel}<span className="text-black"> complaints</span></p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </div>)
          })}
          </div>
        </section>
      ))}
      </div>
    </>}
    </>
  )
}