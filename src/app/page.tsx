import Image from "next/image";
import prisma from "../../lib/prisma";
import Link from "next/link";
import Search from "./components/ui/search";

export default async function Home() {
  const brands = await prisma.brand.findMany()
  return (
    <>
    <Search/>
     <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row justify-between">
          <div className="flex flex-col max-w-[700px] justify-center mb-4 mx-auto text-pretty text-center md:text-left">
            <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">Discover the Best Cars for Your Next Journey</h1>
            <h3 className="text-md md:text-2xl font-semibold">Unbiased reviews that cover performance, comfort, features, and more. Find the right car with expert insights and real-world testing</h3>
          </div>
          <div>
            <Image alt="car-img-hero-page" src="/images/car2.png" width={585} height={0} className="object-cover h-auto rounded-md"/>
          </div>
      </div>

      <div className='max-w-[1300px] mx-auto flex flex-col justify-between mt-12 md:mt-24'>
      <div className='mx-auto justify-center'>
        <h1 className="text-2xl md:text-5xl font-bold mb-4 text-center">Explore Vehicles</h1>
        <h2 className='text-md md:text-2xl font-semibold mb-4 text-center'>Browse all car brands and models to find your next ride</h2>
      </div>

      {/* <div className='mt-8 border border-gray-400 rounded-2xl mx-auto p-4 md:p-8 bg-gray-200'> */}
        <ul className='md:mt-8 border border-gray-400 rounded-2xl p-6
        grid grid-cols-2 md:grid-cols-5 place-items-stretch md:min-h-max flex-wrap gap-x-8'>
        {brands.map((brand, index) => (
            <li key={index} className='flex flex-row mt-4 text-lg font-bold items-center gap-x-2 md:pl-12 basis-1/2'>
              <Image src="/images/truck-wheel.png"alt="wheel-icon" width={18} height={18} className='max-h-[18px]'/>
              <Link href={`/brand/${brand.slug}`} className=''>
                {brand.name}
              </Link>
            </li>
          ))}
        </ul>
      {/* </div> */}
    </div>

      <div className='flex flex-col max-w-[1300px] mt-12 md:mt-24 md:mb-24 mx-auto justify-center'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl md:text-5xl font-bold mb-4 text-center'>Best Vehicles</h1>
            <h3 className='text-md md:text-2xl font-semibold mb-4 text-center'>Top-rated vehicles based on user reviews and overall performance</h3>
          </div>
           <div className="flex flex-col md:flex-row mt-4 md:mt-12 gap-x-24 md:justify-between">
                <div>
                  <Image alt="car-img-hero-page" src="/images/car2.png" width={480} height={0} className="object-cover h-auto rounded-md"/>
                </div>
                <ul className='flex flex-col justify-center gap-y-8 justify-between py-4 md:p-12 md:max-w-[70%] '>
                  <li className='flex gap-4 md:gap-x-8 justify-between items-center'>
                    <h3 className='text-sm md:text-2xl font-bold basis-3/5 text-center'>2006 Honda Accord </h3>
                    <div className='w-[280px] h-[24px] bg-green-400 rounded-sm'></div>
                  </li>
                  <li className='flex gap-4 md:gap-x-8 justify-between items-center'>
                    <h3 className='text-sm md:text-2xl font-bold basis-3/5 text-center'>2007 Volkswagen Golf</h3>
                    <div className='w-[280px] h-[24px] bg-green-400 rounded-sm'></div>
                  </li>
                  <li className='flex gap-4 md:gap-x-8 justify-between items-center'>
                    <h3 className='text-sm md:text-2xl font-bold basis-3/5 text-center'>2020 Honda Civic</h3>
                    <div className='w-[280px] h-[24px] bg-green-400 rounded-sm'></div>
                  </li> 
                </ul>
          </div>
        </div>
            <div className='flex flex-col max-w-[1300px] mt-12 md:mt-24 mb-24 mx-auto justify-center'>
              <div className='flex flex-col justify-center items-center'>
                <h1 className='text-2xl md:text-5xl font-bold mb-4 text-center'>Worst Vehicles</h1>
                <h3 className='text-md md:text-2xl font-semibold mb-4 text-center'>Vehicles with the most complaints and lowest satisfaction scores</h3>
              </div>
               <div className="flex flex-col md:flex-row md:mt-12 gap-x-24 md:justify-between">
               <ul className='flex flex-col justify-center gap-y-8 justify-between py-4 md:p-12 md:max-w-[70%] '>
                    <li className='flex gap-4 md:gap-x-8 justify-between items-center'>
                      <h3 className='text-sm md:text-2xl font-bold basis-3/5 text-center'>2006 Honda Accord </h3>
                      <div className='w-[280px] h-[24px] bg-red-400 rounded-sm'></div>
                    </li>
                    <li className='flex gap-4 md:gap-x-8 justify-between items-center'>
                      <h3 className='text-sm md:text-2xl font-bold basis-3/5 text-center'>2007 Volkswagen Golf</h3>
                      <div className='w-[280px] h-[24px] bg-red-400 rounded-sm'></div>
                    </li>
                    <li className='flex gap-4 md:gap-x-8 justify-between items-center'>
                      <h3 className='text-sm md:text-2xl font-bold basis-3/5 text-center'>2020 Honda Civic</h3>
                      <div className='w-[280px] h-[24px] bg-red-400 rounded-sm'></div>
                    </li>
                  </ul>
                  <div>
                    <Image alt="car-img-hero-page" src="/images/car2.png" width={480} height={0} className="object-cover h-auto rounded-md"/>
                  </div>
              </div>
            </div>
    </>

  );
}
