import React from 'react'
import prisma from '@/../lib/prisma'
import Link from 'next/link'

type YearModelProps = {
  params: {
    modelYearId: string
  }
}

async function YearModelPage({params}: YearModelProps) {
  const {modelYearId} = await params
  const carYearModel = await prisma.carModel.findUnique({
    where: {
      id: modelYearId
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
  console.log("carmodel with complaints", carYearModel)
  return (
    <div className='max-w-[1300px] mx-auto'>
      <h1 className='text-5xl font-bold mb-4 text-center'>{carYearModel.brandModel.brand.name} {carYearModel?.name} {carYearModel.year}</h1>
      <h3 className='text-2xl font-semibold mb-4 text-center'>
        All complaints reported for {carYearModel.brandModel.brand.name} {carYearModel?.name} {carYearModel.year}, 
        including issue details and user-reported experiences</h3>
      {carYearModel.complaints.length == 0 ?
      <div>
        <h3 className='text-2xl font-semibold mb-4 text-center'>There are no complaints for this {carYearModel.brandModel.brand.name} {carYearModel?.name} {carYearModel.year}. 
        <span className='underline'><Link href="/"> Add your complaint here.</Link></span></h3>
      </div>
       : 
       <ul className='mb-12'>
      {carYearModel.complaints.map((complaint, index) => (
        <li key={index} className='border-1 border-gray-400 p-2 m-2 rounded-xl'>
          <h2 className='text-xl font-bold'>{complaint.user.name} - {complaint.createdAt.toDateString()}</h2>
          <h3 className='text-lg font-semibold'>{complaint.title}</h3>
          <h4 className='text-md'>{complaint.content}</h4>
        </li> 
      ))}
      </ul>}
    </div>
  )
}

export default YearModelPage
