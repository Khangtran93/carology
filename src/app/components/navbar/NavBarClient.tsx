'use client'

import { useState } from 'react'
import Link from 'next/link'
import { logoFont } from '@/app/fonts/fonts'
import { signOutAction } from '@/app/lib/auth'

export default function NavbarClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`relative w-full bg-black text-white ${logoFont.className}`}>
      
      {/* Top bar */}
      <div className="flex justify-between items-center px-6 md:px-20 lg:px-40 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-3xl">
          CAROLOGY
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-10 text-2xl">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>

          {isLoggedIn ? (
            <>
              <Link href="/profile">Profile</Link>
              <form action={signOutAction}>
                <button className='p-0' type="submit">Sign Out</button>
              </form>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`${open && ""} md:hidden text-3xl`}
          onClick={() => setOpen(prev => !prev)}
        >
          {open ? '✕' : '☰'}
        </button>
        
      </div>

      {/* Mobile menu */}
      {open ? 
      <div
        className={`
          z-100 absolute top-full right-0 md:hidden flex flex-col gap-4 pt-4 px-6 pb-6 text-xl
          transition-all duration-300 ml-auto bg-black rounded-b-lg shadow-xl
        `}
      >
        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
        <Link href="/about" onClick={() => setOpen(false)}>About</Link>

        {isLoggedIn ? (
          <>
            <Link href="/profile">Profile</Link>
            <form action={signOutAction}  onSubmit={() => setOpen(false)}>
              <button className='p-0' type="submit">Sign Out</button>
            </form>
          </>
        ) : (
          <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
        )}
      </div>: <div></div>}
    </div>
  )
}