'use client'
import { Article } from '@/app/lib/definition'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useId } from 'react'
import {ChevronRightIcon, ChevronLeftIcon, ArrowUpRightIcon} from '@heroicons/react/24/outline';

export default function NewsCarousel({newsArticles}: {newsArticles: Article[] | undefined}) {
  const carouselId = useId()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }
  )
  const goToPrev = () => emblaApi?.scrollPrev()
  const goToNext = () => emblaApi?.scrollNext()

  return (
    <>
      <div className="relative embla max-w-[1300px] mx-auto mt-4">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container gap-x-2" id={carouselId}>
            {newsArticles?.map((article) => (
              <div className="embla__slide first:pl-2 grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-8 md:px-12 md:py-4 overflow-hidden content-start" key={article.uuid}>
                <div className='relative rounded-xl w-full h-[200px] md:h-[400px]'>
                  <Image className='rounded-xl object-cover' fill src={article.thumbnail} alt={article.title}/>
                </div>
                <div className='md:px-4 flex flex-col items-start text-left justify-start gap-y-2'>
                  <h2 className='text-lg md:text-2xl font-bold line-clamp-2'>{article.title}</h2>
                  <h3 className='text-md md:text-lg text-pretty text-gray-600 line-clamp-6'>{article.incipit}</h3>
                  <div className='flex bg-blue-900 rounded-lg p-2 max-w-max'>
                    <Link className='text-md text-white cursor-pointer' href={article.url}>Read Now</Link>
                    <ArrowUpRightIcon className='text-white w-5 h-5 font-bold'/>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>

   
        <ChevronLeftIcon className='absolute left-0 top-[50%] w-8 h-8 embla__prev border-opacity hidden sm:block' onClick={goToPrev}/>


        <ChevronRightIcon className='absolute right-0 top-[50%] w-8 h-8 embla__next border-opacity hidden sm:block' onClick={goToNext}/>

      </div>
    </>
  )
}