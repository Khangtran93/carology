import React from 'react'
import { logoFont } from '../../fonts/fonts'
import Link from 'next/link'
import { auth, signOut } from '../../../../auth'
import Button from '../Button/Button'

const NavBar = async () => {
  const session = await auth()
  const isLoggedIn = !!session?.user
  return (
    <div className={`flex px-40 py-4 w-full bg-black text-3xl text-white ${logoFont.className} justify-between`}>
      <Link href="/">
        CAROLOGY
      </Link>
      <div className='flex items-center justify-between gap-10 text-2xl'>
        <Link href="/"><p>Home</p></Link>
        <Link href="/about"><p>About</p></Link>
        {isLoggedIn ? 
        <Link href="/profile">Profile</Link>
        : <Link href="/login"><p>Login</p></Link>}
        {isLoggedIn &&  <form action={async () => {
          'use server'
          await signOut({redirectTo: '/'})
        }}>
          <Button label='Sign Out'/>
          {/* <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            
            <div className="hidden md:block">Sign Out</div>
          </button> */}
        </form>}
      </div>
      
    </div>
  )
}

export default NavBar
