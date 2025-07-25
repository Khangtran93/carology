import React from 'react'
import { logoFont } from '../../fonts/fonts'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className={`flex px-40 py-4 w-full bg-black text-3xl text-white ${logoFont.className} justify-between`}>
      <Link href="/">
        CAROLOGY
      </Link>
      <div className='flex justify-between gap-10 text-2xl'>
        <Link href="/"><p>Home</p></Link>
        <Link href="/"><p>About</p></Link>
        <Link href="/"><p>Login</p></Link>
      </div>
      
    </div>
  )
}

export default NavBar
