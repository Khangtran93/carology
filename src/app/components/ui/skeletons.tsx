const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function BrandModelListSkeleton() {
  return (
    <div className={`${shimmer} max-w-[1300px] mx-auto p-8 flex flex-col items-center gap-4`}>
      <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-md" />
      <div className="h-8 w-full max-w-2xl bg-gray-200 animate-pulse rounded-md" />
      <div className="h-40 w-[100%] bg-gray-200 animate-pulse rounded-md" />
      
      <ul className='flex flex-col h-[300px] w-[100%] md:w-[70%] flex-wrap items-center mt-8'>
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i} className='w-[40%] md:w-[45%] m-2'>
          <div className='p-2 bg-gray-200 animate-pulse rounded-lg h-10'/>
        </li>
  ))}
</ul>
    </div>
  );
}

export function CarModelChartSkeleton() {
  return (
    <>
      <ul className='w-full flex flex-col md:flex-row md:justify-center gap-x-4 gap-y-2 m-4 md:m-12 md:min-h-[400px] border-2 border-gray-200 rounded-xl p-4'>
        {Array.from({ length: 16 }).map((_, i) => {
            const randomDimension = Math.floor(Math.random() * 60) + 20
            return (
              <li className='flex flex-row md:flex-col md:justify-end items-center gap-x-2 md:gap-x-4 gap-y-2 w-full' key={i}>
                <div className='text-lg md:text-xl md:order-last w-[40px] md:w-[60px] h-[25px] bg-gray-200 animate-pulse'/>
                <div 
                style={{ '--count': randomDimension } as React.CSSProperties}
                className=" bar-skeleton bg-gray-200 animate-pulse"/>
              </li>
            )
          })}
      </ul>
    </>
  )
}

export function CarModelYearSkeleton() {
  return (
    <div className="bg-gray-200 animate-pulse md:w-[800px] aspect-[8/5] mx-auto rounded-xl mb-6"/>
  )
}

export function CarModelSkeleton() {
  return (
    <div className='w-full flex flex-col mx-auto items-center'>
      <div className="h-[28px] md:h-[40px] w-[40%] bg-gray-200 animate-pulse rounded-md mb-4" />
      <div className="h-[28px] md:h-[40px] w-[60%] bg-gray-200 animate-pulse rounded-md mb-4" />
        
      <div className="w-full bg-gray-200 animate-pulse  md:max-w-[800px] aspect-[8/5] mx-auto rounded-xl mb-6"/>
      <div className="h-[28px] md:h-[40px] w-[60%] bg-gray-200 animate-pulse rounded-md mb-6 md:mb-12" />
    </div>
  )
}

export function NewsCarouselSkeleton() {
  return (
    <div className="embla__viewport mx-auto">
      <div className='embla_slide grid grid-cols-1 mx-auto md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-8 md:px-12 md:py-4'>
        <div className="h-[200px] md:h-[400px] bg-gray-200 animate-pulse rounded-md mb-4" />
        <div className="h-[200px] md:h-[400px] bg-gray-200 animate-pulse rounded-md mb-4" />
      </div>
    </div>
  )

}

