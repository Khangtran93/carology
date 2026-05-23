const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function BrandModelListSkeleton() {
  return (
    <div className={`${shimmer} w-full mx-auto flex flex-col items-center gap-4`}>
      <div className="flex flex-col md:flex-row justify-between w-full bg-navy pt-6 pb-18 px-12 md:pt-12 md:pb-24 md:pl-48 md:pr-72 animate-pulse">
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
      <div className="max-w-[800px] mx-auto px-4 my-8">
        <div className="mb-2">
          <div className="mb-2 h-8 w-16 bg-gray-200 animate-pulse rounded-md"/>
          <ul className='w-full grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-2'>
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className='h-16 w-42 md:w-62 bg-gray-200 animate-pulse rounded-md'>
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
    <div className="w-full flex flex-col md:flex-row flex-start ">
      <div className="flex flex-1 flex-col bg-navy px-8 py-4 md:py-8 md:px-16 gap-y-2">
        <div className="w-[80px] md:w-[80px] h-[20px] bg-gray-200 animate-pulse"></div>
        <div className="w-[150px] md:w-[200px] h-[32px]  md:h-10 bg-gray-200 animate-pulse"></div>
        <div className="w-[160px] md:w-[120px] h-[20px] bg-gray-200 animate-pulse"></div>
        <div className="grid grid-cols-3 md:grid-cols-1 gap-x-8 gap-y-2 mx-2">
            <div className="md:w-[150px] md:h-[40px] h-[24px] bg-gray-200 animate-pulse"></div>
            <div className="md:w-[50px] md:h-[24px] h-[24px] bg-gray-200 animate-pulse"></div>
            <div className="md:w-[30px] md:h-[40px] h-[24px] bg-gray-200 animate-pulse"></div>
            <div className="md:w-[50px] md:h-[24px] h-[24px] bg-gray-200 animate-pulse"></div>
            <div className="md:w-[40px] md:h-[40px] h-[24px] bg-gray-200 animate-pulse"></div>
            <div className="md:w-[50px] md:h-[24px] h-[24px] bg-gray-200 animate-pulse"></div>
        </div>
      </div>
      <div className="w-full md:flex-3 md:min-w-[1000px] mx-auto px-4 md:px-24">
        <div className="flex w-full items-center gap-2">
          <div className="md:w-[32px]"></div>
          <ul className='flex flex-3 flex-col md:flex-row
            md:justify-center gap-x-4 gap-y-2 m-4 md:m-12 max-h-[300px] md:min-h-[400px] 
            border-2 border-gray-200 rounded-xl
            overflow-y-auto
            md:overflow-x-auto scroll-smooth
            whitespace-nowrap
            no-scrollbar
            p-4 md:p-8
          '>
            {Array.from({ length: 16 }).map((_, i) => {
                const randomDimension = Math.floor(Math.random() * 60) + 20
                return (
                  <li className='flex flex-row md:flex-col md:justify-end items-center gap-x-2 md:gap-x-4 gap-y-2 w-full' key={i}>
                    <div className='text-lg md:text-xl md:order-last w-[40px] md:w-[0px] h-[24px] bg-gray-200 animate-pulse'/>
                    <div 
                    style={{ '--count': randomDimension } as React.CSSProperties}
                    className=" bar-skeleton bg-gray-200 animate-pulse"/>
                  </li>
                )
              })}
          </ul>
          <div className="md:w-[32px]"></div>
        </div>
        
      </div>
    
    </div>
  )
}

export function CarModelSkeleton() {
  return (
    <div className='w-full flex flex-col md:flex-row'>
      <div className="flex md:flex-1 flex-col bg-navy px-4 py-8 md:px-16 md:py-8  gap-y-2">
        <div className="w-[40px] md:w-[80px] h-[20px] md:h-[24px] bg-gray-200 animate-pulse"></div>
        <div className="w-[150px] h-[28px] md:w-[200px] md:h-[40px] bg-gray-200 animate-pulse"></div>
        <div className="w-[160px] md:w-[120px] h-[24px] bg-gray-200 animate-pulse mb-2 md:mb-4"></div>
        <div className="w-[343px] h-[228px] md:w-[327px] md:h-[218px] bg-gray-300  rounded-lg mb-6" ></div>
        <div className="flex flex-row justify-between border-b border-border pb-2 items-center">
          <div className="w-[35px] h-[24px] bg-gray-200"></div>
          <div className="w-[12px] h-[16px] bg-gray-200"></div>
        </div>
        <div className="flex flex-row justify-between border-b border-border pb-2 items-center">
          <div className="w-[35px] h-[24px] bg-gray-200"></div>
          <div className="w-[12px] h-[16px] bg-gray-200"></div>
        </div>
        <div className="flex flex-row justify-between border-b border-border pb-2 items-center">
          <div className="w-[35px] h-[24px] bg-gray-200"></div>
          <div className="w-[12px] h-[16px] bg-gray-200"></div>
        </div>
      </div>


      <div className="flex flex-col md:flex-3 w-full md:min-w-[1000px] px-4 md:px-24">
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
                    <div className="w-12 h-12 rounded-full bg-navy text-white" ></div>
                    <div className="flex flex-col gap-y-2">
                      <h2 className='w-[60px] md:w-[114px] h-[28px] bg-gray-300'></h2>
                      <h3 className="w-[80px] md:w-[110px] h-[16px] bg-gray-300"></h3>
                    </div>
                  </div>
                  <div className="w-[60px] md:w-[117px] h-[32px] bg-gray-300 rounded-lg"></div>
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