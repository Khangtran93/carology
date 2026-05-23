'use client'
import { CarModelsIncludeComplaints } from "@/app/lib/definition";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const CarModelChartClient = ({ carModels} : {carModels: CarModelsIncludeComplaints | undefined | null}) => {
  const minYear = carModels?.carModels.map((model) => model.year).filter((year) => year !== null).reduce((min, year) => year < min ? year : min, Infinity)
  const maxYear = carModels?.carModels.map((model) => model.year).filter((year) => year !== null).reduce((max, year) => max < year ? year : max, -Infinity)
  const totalComplaint = carModels?.carModels.map((model) => model._count.complaints).reduce((sum, count) => sum + count, 0)
  const highestComplaint = carModels?.carModels.reduce((max, model) => max._count.complaints < model._count.complaints ? model : max)
  const scrollRef = useRef<HTMLUListElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300; 
    scrollRef.current.scrollBy({
    left: direction === "left" ? -amount : amount,
    behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    
    const update = () => {
      setOverflow(el.scrollWidth > el.clientWidth)
      setCanScrollLeft(el.scrollLeft > 0)
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    }
    
    update()
    el.addEventListener('scroll', update)
    return () => el.removeEventListener('scroll', update)
  }, [carModels])

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className='flex md:flex-1 flex-col bg-navy px-8 py-4 md:px-16 md:py-8 font-bebas-neue'>
        <h3 className='text-md md:text-xl text-red-500 w-max-w'>{carModels?.brand.name} {carModels?.name}</h3>
        <h1 className='text-3xl md:text-4xl text-white font-bebas-neue'>YEAR COMPARISON</h1>
        <h2 className="text-gray-500">COMPLAINTS BY MODEL YEAR</h2>
        <div className="mx-2 grid grid-cols-3 md:grid-cols-1">
          <div className="border-b-gray-500 p-2">
            <h1 className="text-xl md:text-4xl text-white font-bebas-neue">{minYear}-{maxYear}</h1>
            <h2 className="text-gray-500">YEAR RANGE</h2>
          </div>
          <div className="border-b-gray-500 p-2">
            <h1 className="text-xl md:text-4xl text-white font-bebas-neue">{totalComplaint}</h1>
            <h2 className="text-gray-500">COMPLAINTS</h2>
          </div>
          <div className={`p-2 md:p-2 ${totalComplaint === 0 ? "text-center md:text-left" : "text-left"}`}>
            <h1 className={`text-xl md:text-4xl text-red-500 font-bebas-neue `}>{totalComplaint === 0 ? "-" : highestComplaint?.year}</h1>
            <h2 className="text-gray-500">WORST MODEL</h2>
          </div>
        </div>
      </div>
      <div className="md:flex-3 relative md:mx-auto md:min-w-[1000px] px-4 md:px-24 ">
        <div className="flex w-full items-center gap-2">
          {overflow ? (
            <ChevronLeftIcon
              className={`w-8 h-8 hidden sm:block flex-shrink-0
                ${canScrollLeft ? 'cursor-pointer opacity-100' : 'opacity-30 pointer-events-none'}`}
              onClick={() => scroll("left")}
            />
          ) : 
            <div className="w-8 hidden sm:block flex-shrink-0" />
            }
              <ul
                ref={scrollRef}
                className={`
                  relative
                  flex flex-col max-h-max
                  w-full
                  m-4 border-2 border-gray-100 shadow-xl rounded-xl p-4 md:p-8
                  overflow-y-auto
                  md:flex-row md:m-12 md:min-h-[400px] md:max-w-[1000px] md:overflow-x-auto
                  ${overflow ? 'md:justify-start' : 'md:justify-center'} 
                  whitespace-nowrap scroll-smooth
                  bg-white
                  no-scrollbar
                `}
              >
              {carModels?.carModels.map((carModel, index) => (
                <li
                  key={index}
                  className="flex flex-col md:flex-col-reverse md:h-full md:justify-end content-center hover:opacity-70 flex-none"
                >
                  <Link
                    href={`./${carModels.slug}/${carModel.year}`}
                    className="grid grid-cols-[2rem_auto_1rem] md:grid-cols-1 md:h-full content-center text-center gap-x-4 items-center md:items-end"
                  >
                    <h4 className="text-lg md:order-last w-[40px] md:w-[60px] text-center">
                      {carModel.year}
                    </h4>

                    <div className="h-[10px] md:h-[300px] w-full md:w-[20px] bg-gray-200 rounded-sm overflow-hidden relative mx-auto">
                      {/* mobile */}
                      <div
                        style={{ width: `${Math.min(carModel._count.complaints * 10, 100)}%` }}
                        className={`h-full md:hidden rounded-sm
                          ${carModel._count.complaints === 0 ? "bg-green-300" : 
                            carModel._count.complaints < 5 ? "bg-orange-400" : 
                            "bg-red-500"}`}
                      />
                      {/* desktop */}
                      <div
                        style={{ height: `${Math.min(carModel._count.complaints * 10, 100)}%` }}
                        className={`absolute bottom-0 left-0 w-full hidden md:block rounded-sm
                          ${carModel._count.complaints === 0 ? "bg-green-300" : 
                            carModel._count.complaints < 5 ? "bg-orange-400" : 
                            "bg-red-500"}`}
                      />
                    </div>
                    <p className="md:order-first max-w-max md:mx-auto">
                      {carModel._count.complaints}
                    </p>
                  </Link>
                </li>
              ))}
              </ul>
              {overflow ? (
              <ChevronRightIcon
                className={`w-8 h-8 hidden sm:block flex-shrink-0
                  ${canScrollRight ? 'cursor-pointer opacity-100' : 'opacity-30 pointer-events-none'}`}
                onClick={() => scroll("right")}
              />
              ) : 
              <div className="w-8 hidden sm:block flex-shrink-0" />}
        </div>
      </div>
    </div>
  );
};