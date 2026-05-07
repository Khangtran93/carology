import Link from "next/link"
import { getBrandModelsByBrandSlug } from "@/app/lib/data"

export default async function BrandModelList({brandSlug}: {brandSlug: string | undefined}) {
  const brand = await getBrandModelsByBrandSlug(brandSlug)
  return (
    <>
    {brand ?
    <div className='flex flex-col max-w-[1300px] mx-auto pb-6 md:pb-24 items-center'>
      <div>
        <h1 className="text-2xl md:text-5xl font-bold md:mb-4 text-center">{brand.name}</h1>
        <h2 className='text-lg md:text-2xl font-semibold mb-4 text-center'>{brand.name} Model Line Comparison </h2>
        <h4 className='text-lg font-semibold mb-4 text-center text-pretty'>Carology.com has received 30,610 complaints from verified vehicle owners across various makes and models. The data highlights recurring issues in several popular vehicles, with some models showing a significantly higher rate of mechanical and electrical failures.</h4>
      </div>
      <ul className='grid grid-cols-2 md:grid-cols-3 w-full mt-2 md:mt-8 md:w-[80%] gap-4'>
      {brand.brandModels.map((brandModel, index) => (
        <li key={index} className='p-2 bg-gray-200 text-black border border-gray-400 rounded-lg w-full hover:bg-blue-300'>
          <Link href={`/${brand.slug}/${brandModel.slug}`} className='block w-full h-full'>          
              {brandModel.name}         
          </Link>
        </li>
      ))}
      </ul>
    </div> :
    <div>Not found</div>
    }
    </>
  )
}