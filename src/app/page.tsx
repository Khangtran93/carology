import Search from "./components/ui/search";
import { Suspense } from "react";
import NewsCarouselServer from "./components/ui/news-carousel-server";
import { BrandListSkeleton, NewsCarouselSkeleton } from "./components/ui/skeletons";
import BrandListServer from "./components/ui/brand-list-server";

export default async function Page() {
  return (
    <>
      <Search/>
      
      <Suspense fallback={<NewsCarouselSkeleton/>}>
        <NewsCarouselServer/>
      </Suspense>

      <div className='max-w-[1300px] mx-auto flex flex-col justify-between mt-6 md:mt-4 mb-4'>
        <div className='md:pl-12'>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-left">Explore Vehicles</h1>
          <h2 className='text-md md:text-xl font-semibold mb-4 text-gray-600'>Browse all car brands and models to find your next ride</h2>
        </div>
        <Suspense fallback={<BrandListSkeleton/>}>
          <BrandListServer/>
        </Suspense>
      </div>
    </>

  );
}
