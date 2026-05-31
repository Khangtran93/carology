import Search from "./components/ui/search";
import { Suspense } from "react";
import { BrandListSkeleton, NewsCarouselSkeleton } from "./components/ui/skeletons";
import BrandListServer from "./components/ui/brand-list-server";
import NewsCarouselServer from "./components/ui/news-carousel-server";
import { dmSans } from "./fonts/fonts";
import Image from "next/image";

export default async function Page() {
  // await new Promise(resolve => setTimeout(resolve, 2000))
  return (
    <>
      <div className='relative flex flex-col w-full bg-navy px-12 md:px-48 py-24 items-center text-center'>
        <div className='absolute inset-0 bg-hero-glow'/>
        <Image
          src="/images/car-dashboard.jpg"
          alt=""
          fill
          className="object-cover opacity-10"
          priority
        />
        <div className='text-red-500 mb-4 font-dm-mono'>Australia&apos;s Car Complaint Database</div>
        <div className='flex flex-col mb-8 gap-y-4'>
         <h1 className='text-white text-4xl md:text-5xl font-bebas-neue'>Find out what people say about your car!</h1>
         <p className='text-gray-50 text-sm font-dm-mono'>Thousands of reviews for various car models</p>
       </div>
        <Search/>       
      </div>
      
      <div className='md:max-w-[1300px] px-6 mx-auto mt-4 md:mt-8'>
        <h1 className="text-xl md:text-3xl md:pl-12 text-black font-bebas-neue">Latest news</h1>
        <Suspense fallback={<NewsCarouselSkeleton/>}>
          <NewsCarouselServer/>
        </Suspense>
      </div>

      <div className='max-w-[1300px] px-6 mx-auto flex flex-col justify-between mt-6 md:mt-4 mb-4'>
        <div className='md:pl-12'>
          <h1 className="text-xl md:text-3xl mb-2 md:mb-4 text-left font-bebas-neue">Explore Vehicles</h1>
          <h2 className={`text-md md:text-xl font-semibold mb-4 text-gray-600 ${dmSans.className}`}>Browse all car brands and models to find your next ride</h2>
        </div>
        <Suspense fallback={<BrandListSkeleton/>}>
          <BrandListServer/>
        </Suspense>
      </div>
    </>

  );
}
