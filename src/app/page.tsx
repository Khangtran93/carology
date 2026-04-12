import Image from "next/image";
import prisma from "../../lib/prisma";
import Link from "next/link";
import Search from "./components/ui/search";

export default async function Home() {
  const brands = await prisma.brand.findMany()
  console.log(brands)
  return (
    <>
    <Search/>
     <div className="max-w-[1300px] mx-auto flex justify-between">
          <div className="flex flex-col max-w-[700px] justify-center">
            <h1 className="text-5xl font-bold mb-4">Discover the Best Cars for Your Next Journey</h1>
            <h3 className="text-2xl font-semibold">Unbiased reviews that cover performance, comfort, features, and more. Find the right car with expert insights and real-world testing</h3>
          </div>
          <div>
            <Image alt="car-img-hero-page" src="/images/car2.png" width={585} height={0} className="object-cover h-auto rounded-md"/>
          </div>
      </div>

      <div className='max-w-[1300px] mx-auto flex flex-col justify-between mt-24'>
      <div className='mx-auto justify-center'>
        <h1 className="text-5xl font-bold mb-4 text-center">Explore Vehicles</h1>
        <h2 className='text-2xl font-semibold mb-4'>Browse all car brands and models to find your next ride</h2>
      </div>

      <div className='mt-8 border border-gray-400 rounded-2xl p-8 bg-gray-200'>
        <ul className='flex flex-col h-[300px] flex-wrap'>
        {brands.map((brand, index) => (
            <li key={index} className='flex flex-row mt-4 text-lg font-bold items-center gap-x-2 pl-12'>
              <Image src="/images/truck-wheel.png"alt="wheel-icon" width={18} height={18} className='max-h-[18px]'/>
              <Link href={`/brand/${brand.slug}`} className=''>
                {brand.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className='flex flex-col max-w-[1300px] mt-24 mb-24 mx-auto justify-center'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-5xl font-bold mb-4'>Best Vehicles</h1>
            <h3 className='text-2xl font-semibold mb-4'>Top-rated vehicles based on user reviews and overall performance</h3>
          </div>
           <div className="flex mt-12 gap-x-24 justify-between">
                <div>
                  <Image alt="car-img-hero-page" src="/images/car2.png" width={480} height={0} className="object-cover h-auto rounded-md"/>
                </div>
                <div className="flex flex-col max-w-[70%] justify-center">
                 <ul className='flex flex-col justify-center gap-y-8 justify-between p-12'>
                  <li className='flex gap-x-8 justify-between items-center'>
                    <h3 className='text-2xl font-bold'>2006 Honda Accord </h3>
                    <div className='w-[280px] h-[24px] bg-green-400 rounded-sm'></div>
                  </li>
                  <li className='flex gap-x-8 justify-between items-center'>
                    <h3 className='text-2xl font-bold'>2007 Volkswagen Golf</h3>
                    <div className='w-[280px] h-[24px] bg-green-400 rounded-sm'></div>
                  </li>
                  <li className='flex gap-x-8 justify-between items-center'>
                    <h3 className='text-2xl font-bold'>2020 Honda Civic</h3>
                    <div className='w-[280px] h-[24px] bg-green-400 rounded-sm'></div>
                  </li>
                 </ul>
                </div>
            </div>
        </div>

            <div className='flex flex-col max-w-[1300px] mt-24 mb-24 mx-auto justify-center'>
              <div className='flex flex-col justify-center items-center'>
                <h1 className='text-5xl font-bold mb-4'>Worst Vehicles</h1>
                <h3 className='text-2xl font-semibold mb-4'>Vehicles with the most complaints and lowest satisfaction scores</h3>
              </div>
               <div className="flex mt-12 gap-x-24 justify-between">
                <div className="flex flex-col max-w-[70%] justify-center">
                  <ul className='flex flex-col justify-center gap-y-8 justify-between p-12'>
                    <li className='flex gap-x-8 justify-between items-center'>
                      <h3 className='text-2xl font-bold'>2006 Honda Accord </h3>
                      <div className='w-[280px] h-[24px] bg-red-400 rounded-sm'></div>
                    </li>
                    <li className='flex gap-x-8 justify-between items-center'>
                      <h3 className='text-2xl font-bold'>2007 Volkswagen Golf</h3>
                      <div className='w-[280px] h-[24px] bg-red-400 rounded-sm'></div>
                    </li>
                    <li className='flex gap-x-8 justify-between items-center'>
                      <h3 className='text-2xl font-bold'>2020 Honda Civic</h3>
                      <div className='w-[280px] h-[24px] bg-red-400 rounded-sm'></div>
                    </li>
                  </ul>
                  </div>
                  <div>
                    <Image alt="car-img-hero-page" src="/images/car2.png" width={480} height={0} className="object-cover h-auto rounded-md"/>
                  </div>
              </div>
            </div>
    </>

  );
}
