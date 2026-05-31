const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function BrandModelListSkeleton() {
  return (
    <div className={`${shimmer} w-full mx-auto flex flex-col items-center gap-4`}>
      <div className="flex flex-col md:flex-row justify-between w-full bg-navy p-12 md:p-12 md:pl-48 md:pr-72 animate-pulse">
        <div>
          {/* label */}
          <div className="h-7 w-24 md:w-32 bg-gray-600 rounded mb-2"/>

          {/* title */}
          <div className="h-8 w-24 md:h- md:w-96 bg-gray-500 rounded mb-6" />

          <div className="flex flex-row pr-12">
            {/* stat 1 */}
            <div className="flex flex-col border-r-2 pr-4 md:pr-8">
              <div className="h-7 w-8 md:h-12 bg-gray-500 rounded mb-2" />
              <div className="h-6 w-12 md:w-14 md:h-8 bg-gray-600 rounded" />
            </div>

            {/* stat 2 */}
            <div className="flex flex-col pl-4 md:pl-8 border-r-2 pr-4 md:pr-8">
              <div className="h-7 w-8 md:h-12 bg-gray-500 rounded mb-2" />
              <div className="h-6 w-12 md:h-8 bg-gray-600 rounded" />
            </div>

            {/* stat 3 */}
            <div className="flex flex-col px-4 md:px-8">
              <div className="h-7 w-8 md:h-12 bg-gray-500 rounded mb-2" />
              <div className="h-6 w-12 md:h-8 bg-gray-600 rounded" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 my-8">
        <div className="mb-2">
          <div className="mb-2 h-8 w-16 bg-gray-200 animate-pulse rounded-md"/>
          <ul className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2'>
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className='h-16 w-full bg-gray-200 animate-pulse rounded-md'>
            </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 h-8 w-16 bg-gray-200 animate-pulse  rounded-md"/>
          <ul className='w-full grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-2 mb-4'>
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className='h-16 w-42 md:w-62 bg-gray-200 animate-pulse rounded-md'>
            </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function CarModelChartSkeleton() {
  return (
    <div className="w-full grid md:grid-cols-4">
      <div className="flex md:col-span-1 flex-col bg-navy px-16 sm:px-32 py-4 gap-y-4 md:py-8 md:px-8 lg:px-12">
        <div className="w-full h-6 rounded-md bg-gray-400 overflow-hidden relative">
          <div className="absolute inset-0 animate-shimmer"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)' }} />
        </div>
        <div className="w-full h-6 rounded-md bg-gray-400 overflow-hidden relative">
          <div className="absolute inset-0 animate-shimmer"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)' }} />
        </div>
        <div className="w-full h-6 rounded-md bg-gray-400 overflow-hidden relative">
          <div className="absolute inset-0 animate-shimmer"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)' }} />
        </div>
        <div className="w-full h-6 rounded-md bg-gray-400 overflow-hidden relative">
          <div className="absolute inset-0 animate-shimmer"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)' }} />
        </div>
        {/* <div className="w-full h-6 rounded-md bg-gray-400 overflow-hidden relative">
          <div className="absolute inset-0 animate-shimmer"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)' }} />
        </div> */}
        </div>
      <div className="w-full md:col-span-3 mx-auto px-4">
        <div className="flex w-full items-center">
          <div className="md:w-[32px]"/>
          <ul className='flex flex-3 flex-col md:flex-row
            md:justify-center gap-x-4 gap-y-2 my-4 max-h-[300px] md:min-h-[400px] 
            border border-border rounded-xl
            overflow-y-auto
            md:overflow-x-auto scroll-smooth
            whitespace-nowrap
            no-scrollbar
            p-4
          '>
            {Array.from({ length: 16 }).map((_, i) => {
                const randomDimension = Math.floor(Math.random() * 60) + 20
                return (
                  <li className='flex flex-row md:flex-col md:justify-end items-center gap-x-2 md:gap-x-4 gap-y-2 w-full' key={i}>
                    <div className='text-lg md:text-xl md:order-last w-[40px] md:w-[0px] h-[18px] bg-gray-200 animate-pulse'/>
                    <div 
                    style={{ '--count': randomDimension } as React.CSSProperties}
                    className=" bar-skeleton bg-gray-200 animate-pulse rounded-lg"/>
                  </li>
                )
              })}
          </ul>
          <div className="md:w-[32px]"/>
        </div>
        
      </div>
    
    </div>
  )
}

export function CarModelSkeleton() {
  return (
    <div className='w-full grid lg:grid-cols-4'>
      <div className="flex lg:col-span-1 flex-col bg-navy px-4 py-4 gap-y-4 md:py-8 md:px-12">
        <div className="flex flex-col gap-3 p-4">
          <div className="w-full h-5 rounded-md bg-gray-200 overflow-hidden relative">
            <div className="absolute inset-0 animate-shimmer"
                style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)' }} />
          </div>
          <div className="w-3/4 h-5 rounded-md bg-gray-200 overflow-hidden relative">
            <div className="absolute inset-0 animate-shimmer"
                style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)' }} />
          </div>
          <div className="w-1/2 h-5 rounded-md bg-gray-200 overflow-hidden relative">
            <div className="absolute inset-0 animate-shimmer"
                style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)' }} />
          </div>
        </div>
      </div>
      <div className=" flex flex-col w-full lg:col-span-3 px-4 md:px-24">
        <div className="flex w-full px-4 gap-x-2 m-4">
          <div className="w-[48px] h-[25px] bg-gray-200"></div>
          <div className="w-[48px] h-[25px] bg-gray-200"></div>
          <div className="w-[48px] h-[25px] bg-gray-200"></div>
        </div>
        <ul className="gap-y-2 mb-4">
        {Array.from({ length: 2 }).map((_, i) => {
          return (
            <li key={i} className='flex flex-col p-4 m-2 border border-border rounded-xl bg-white animate-pulse'>
              <div className="flex flex-col p-2 gap-y-2">
                <div className="flex justify-between gap-x-2 items-center border-b-2 border-border pb-8">
                  <div className="flex gap-x-2">
                    <div className="w-12 h-12 rounded-full bg-gray-400 text-white" ></div>
                    <div className="flex flex-col gap-y-2">
                      <h2 className='w-[60px] md:w-[114px] h-[28px] bg-gray-300'></h2>
                      <h3 className="w-[80px] md:w-[110px] h-[16px] bg-gray-300"></h3>
                    </div>
                  </div>
                  <div className="w-[60px] md:w-[117px] h-[32px] bg-gray-300 rounded-md"></div>
                </div>
                <div className="w-px bg-gray-300 -my-4 mx-4 md:hidden mt-4" />
                <h3 className='w-full md:w-[400px] h-[16px] md:h-[20px] bg-gray-300'></h3>
                <h4 className='w-full h-[16px] md:h-[20px] bg-gray-300'></h4>
                <h4 className='w-full h-[16px] md:h-[20px] bg-gray-300'></h4>
                <h4 className='w-full h-[16px] md:h-[20px] bg-gray-300'></h4>
                <div className="w-[90px] h-[28px] bg-gray-300"></div>
              </div>
              <div className="p-2 md:p-12 hidden"></div>
            </li> 
          )})}
           
        </ul>
      </div>
    </div>
  )
}

export function NewsCarouselSkeleton() {
  return (
    <div className="embla__viewport mx-auto">
      <div className='embla_slide grid grid-cols-1 mx-auto mt-4 md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-8 md:px-12 md:py-4'>
        <div className="h-[200px] md:h-[400px] bg-gray-200 animate-pulse rounded-md mb-4" />
        <div className="h-[200px] md:h-[400px] bg-gray-200 animate-pulse rounded-md mb-4" />
      </div>
    </div>
  )
}

export function BrandListSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <ul className='md:mt-8 border border-gray-400 rounded-2xl p-6 w-full
        grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 place-items-stretch md:min-h-max flex-wrap gap-x-4 md:gap-x-8'>
        {Array.from({ length: 30 }).map((_, i) => (
          <li key={i} className='w-[50%] md:w-[50%] mx-auto my-2'>
            <div className='bg-gray-200 animate-pulse rounded-lg h-[28px] mx-auto'/>
          </li>
        ))}
      </ul>
  </div>
  )
}
 export function LoginFormSkeleton() {
  return (
    <div className='flex flex-col max-w-[350px] mx-auto gap-y-4 border border-gray-200 rounded-xl mt-8 px-12 py-8 mb-6 md:mb-12 shadow-xl' aria-hidden="true">
      <div className='h-7 w-20 self-center bg-gray-200 animate-pulse rounded-sm' />

      <div className='flex flex-col gap-2'>
        <div className='h-6 w-16 bg-gray-200 animate-pulse rounded-sm' />
        <div className='h-8 bg-gray-200 animate-pulse rounded-sm' />
      </div>

      <div className='flex flex-col gap-2'>
        <div className='h-6 w-20 bg-gray-200 animate-pulse rounded-sm' />
        <div className='h-8 bg-gray-200 animate-pulse rounded-sm' />
      </div>

      <div className='w-full h-10 bg-gray-200 animate-pulse mt-2' />

      <div className='flex items-center'>
        <div className='flex-1 h-px bg-gray-300' />
        <span className='text-xs text-gray-500'>or</span>
        <div className='flex-1 h-px bg-gray-300' />
      </div>

      <div className='w-full h-10 bg-gray-200 animate-pulse mt-2' />
    </div>
  )
 }

 export function ComplaintFormSkeleton() {
  return (
    <div className="flex flex-col w-full justify-center text-center">
        <div className="flex flex-col text-center items-center justify-center bg-navy p-8 gap-y-2">
          <div className="w-[150px] h-[28px] bg-gray-200 mb-2 animate-pulse"></div>
          <div className="w-[200px] h-[40px] bg-gray-200 mb-4 animate-pulse"></div>
          <div className="w-[200px] md:w-[400px] h-[20px] bg-gray-200 mb-1 animate-pulse"></div>
          <div className="w-[200px] md:w-[400px] h-[20px] bg-gray-200 md:hidden animate-pulse"></div>
        </div>
        <form className="w-full max-w-[1000px] bg-white mt-4 md:mx-auto p-6 md:p-12">
          {/* form */}
          <div className="w-full">
            <div className="h-[20px] w-[60px] bg-gray-200 mb-2 animate-pulse"></div>
            <div className="grid grid-cols-2 gap-x-2 animate-pulse">
              {Array.from({length: 5}).map((_, i) => {
                return (
                 <div key={i} className="flex flex-col mb-2">
                  <div className="h-[16px] w-[40px] bg-gray-200 mb-2"></div>
                  <div className="h-[38px] bg-gray-200"></div>
                 </div>
                )
              })}
            </div>
          </div>
          <div className="w-full">
            <div className="h-[20px] w-[60px] bg-gray-200 mb-2 animate-pulse"></div>
              <div className="flex flex-col mb-2">
                <div className="h-[16px] w-[40px] bg-gray-200 mb-2"></div>
                <div className="h-[38px] bg-gray-200"></div>
              </div>
              <div className="flex flex-col mb-2 gap-y-2 animate-pulse">
                <div className="h-[16px] w-[40px] bg-gray-200"></div>
                <div className="h-[38px] bg-gray-200"></div>
                <div className="h-[38px] bg-gray-200"></div>
                <div className="h-[38px] bg-gray-200"></div>
              </div>
          </div>

        </form>
    </div>
  )
 }