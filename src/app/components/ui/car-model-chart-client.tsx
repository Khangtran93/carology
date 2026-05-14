'use client'
import { CarModelsIncludeComplaints } from "@/app/lib/definition";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const CarModelChartClient = ({ carModels} : {carModels: CarModelsIncludeComplaints | undefined | null}) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [overflow, setOverflow] = useState(false);
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = 300; // adjust scroll distance

    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
  
    setOverflow(el.scrollWidth > el.clientWidth);
  }, [carModels]);

  return (
    <div className="relative max-w-[1300px] mx-auto">
      {overflow && <ChevronLeftIcon className='absolute left-0 top-[60%] w-8 h-8 embla__prev border-opacity hidden sm:block' onClick={() => scroll("left")}/>}
      
      {overflow && <ChevronRightIcon className='absolute right-0 top-[60%] w-8 h-8 embla__prev border-opacity hidden sm:block' onClick={() => scroll("right")}/>}

      {/* SCROLL AREA */}
      {/* className='w-full flex flex-col md:flex-row md:justify-center gap-x-4 m-4 md:m-12 md:min-h-[400px] border-2 border-gray-200 rounded-xl p-4' */}

        <div className='mx-auto flex flex-col items-center'>
          <h1 className='text-2xl md:text-5xl font-bold md:mb-4'>{carModels?.brand.name} {carModels?.name}</h1>
          <h2 className='text-lg md:text-2xl font-semibold md:mb-4'>Year Comparsion</h2>
        </div>
      <ul
        ref={scrollRef}
        className="
          relative
          flex flex-col md:flex-row md:justify-center max-h-[300px]
          gap-x-4 m-4 md:m-12 md:min-h-[400px]
          border-2 border-gray-100 shadow-xl rounded-xl p-4
          overflow-y-auto
          md:overflow-x-auto scroll-smooth
          whitespace-nowrap
          no-scrollbar
        "
      >
        {carModels?.carModels.map((carModel, index) => (
          <li
            key={index}
            className="flex flex-col md:justify-end hover:opacity-70 flex-none"
          >
            <Link
              href={`./${carModels.slug}/${carModel.year}`}
              className="flex flex-row md:flex-col gap-x-3 items-center"
            >
              <h4 className="text-lg md:text-xl md:order-last w-[40px] md:w-[60px] text-center">
                {carModel.year}
              </h4>

              <div
                style={{ "--count": carModel._count.complaints } as React.CSSProperties}
                className={`bar h-[10px] p-1 border-gray-400 ${
                  carModel._count.complaints === 0 ? "bg-green-300" : "bg-blue-200"
                }`}
              />

              <p className="md:order-first">
                {carModel._count.complaints}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};