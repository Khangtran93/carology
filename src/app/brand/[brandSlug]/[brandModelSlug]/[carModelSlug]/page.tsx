import React from 'react'
import prisma from '@/../lib/prisma'
import Link from 'next/link'

async function Page({params}: {params: Promise<{brandSlug: string, brandModelSlug: string, carModelSlug: string}>}) {
  const {brandSlug, brandModelSlug, carModelSlug} = await params
  
  //Fetching car model year object with all complaints
  const carYearModel = await prisma.carModel.findFirst({
    where: {
      slug: carModelSlug,
      brandModel: {
        slug: brandModelSlug,
        brand: {
          slug: brandSlug
        }
      }    
    },
    include: {
      brandModel: {
        include: {
          brand: true
        }
      },
      complaints: {
        include: {
          user: true
        }
      }
    }
  })

  if (!carYearModel) {
    return <div>Year Model not found</div>;
  }
  return (
    <div className='max-w-[1300px] mx-auto'>
      <h1 className='text-2xl md:text-5xl font-bold mb-4 text-center'>{carYearModel.brandModel.brand.name} {carYearModel?.name} {carYearModel.year}</h1>
      <h3 className='text-xl md:text-2xl font-semibold mb-4 text-center'>
        All complaints reported for {carYearModel.brandModel.brand.name} {carYearModel?.name} {carYearModel.year}, 
        including issue details and user-reported experiences</h3>
      {carYearModel.complaints.length == 0 ?
      <div>
        <h3 className='text-xl md:text-2xl font-semibold mb-4 text-center'>There are no complaints for this {carYearModel.brandModel.brand.name} {carYearModel?.name} {carYearModel.year}. 
        <span className='underline'><Link href={`/brand/${brandSlug}/${brandModelSlug}/${carModelSlug}/complaint`}> Add your complaint here.</Link></span></h3>
      </div>
       : 
       <div>
       <ul className='mb-6 md:mb-12'>
      {carYearModel.complaints.map((complaint, index) => (
        <li key={index} className='border-1 border-gray-400 p-2 m-2 rounded-xl'>
          <h2 className='text-lg md:text-xl font-bold'>{complaint.user.name} - {complaint.createdAt.toDateString()}</h2>
          <h3 className='text-md md:text-lg font-semibold'>{complaint.title}</h3>
          <h4 className='text-sm md:text-md'>{complaint.content}</h4>
        </li> 
      ))}
      </ul>
        <Link href={`/brand/${brandSlug}/${brandModelSlug}/${carModelSlug}/complaint`}
              className='bg-black text-white p-2 max-w-max rounded-lg ml-2 mb-6 inline-block'>
         Add Complaint
        </Link>
      </div>
      }
    </div>
  )
}

export default Page
