import { logoFont } from '@/app/fonts/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col w-full bg-black text-white px-40 pt-12 pb-8'>
      <div className='flex flex-row justify-between py-12'>
        <div className='flex flex-col gap-y-4'>
          <Link href='/' className={`${logoFont.className} text-3xl`}>CAROLOGY</Link>
          <h4>carology@support.au.com</h4>
          <h4>0123-456-789</h4>
        </div>
        <div className='flex flex-col gap-y-2'>
          <h2 className='text-xl font-semibold'>Quick Links</h2>
          <h4>About</h4>
          <h4>Submit a review</h4>
          <h4>Best vehicles</h4>
          <h4>Worst Vehicles</h4>
        </div>
        <div className='flex flex-col gap-y-2'>
          <h2 className='text-xl font-semibold'>Quick Links</h2>
          <h4>About</h4>
          <h4>Submit a review</h4>
          <h4>Best vehicles</h4>
          <h4>Worst Vehicles</h4>
        </div>
      </div>
      <div className='flex justify-between border-t border-gray-400 pt-8'>
        <div className='flex gap-x-4'>
          <Image src='/images/linkedin.png' alt='linkedin-icon' width={35} height={35}/>
          <Image src='/images/facebook.png' alt='facebook-icon' width={35} height={35}/>
          <Image src='/images/Twitter.png' alt='twitter-icon' width={35} height={35}/>
        </div>
        <div>
          <h4>© 2025 Carology. All rights reserverd. </h4>
        </div>
      </div>
    </div>
  )
}

export default Footer
