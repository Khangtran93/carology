import Link from "next/link";
import { getCarModelsBySlug } from "@/app/lib/data";


export default async function CarModelChart({brandSlug, brandModelSlug}: {brandSlug: string, brandModelSlug: string}) {
      // await new Promise(resolve => setTimeout(resolve, 2000))
    const brandModel = await getCarModelsBySlug(brandSlug, brandModelSlug)
  
  return (
    <>
      <ul className='w-full flex flex-col md:flex-row md:justify-center gap-x-4 m-4 md:m-12 md:min-h-[400px] border-2 border-gray-200 rounded-xl p-4'>
        {brandModel?.carModels.map((carModel, index) => (
          <Link className='flex flex-row md:flex-col md:justify-end items-center gap-x-2 md:gap-x-4' href={`./${brandModel.slug}/${carModel.year}`} key={index}>
            <h4 className='text-lg md:text-xl md:order-last w-[40px] md:w-[60px] text-center'>{carModel.year}</h4>
            <div
              style={{ '--count': carModel._count.complaints } as React.CSSProperties}
              className={`bar p-1 ${carModel._count.complaints === 0 ? 'bg-green-300' : 'bg-blue-200'}`}
            />
            <p className='md:order-first'>{carModel._count.complaints}</p>
          </Link>
        ))}
      </ul>
    </>
  )

}