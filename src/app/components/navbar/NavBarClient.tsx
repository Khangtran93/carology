'use client'

import { useState } from 'react'
import Link from 'next/link'
import { logoFont } from '@/app/fonts/fonts'
import { signOutAction } from '@/app/lib/auth'

export default function NavBarClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`sticky top-0 z-50 w-full bg-navy/90 backdrop-blur-md border border-slate-700/50 text-white ${logoFont.className}`}>
      <div className="flex justify-between items-center px-6 md:px-20 lg:px-40 py-4">
        <Link href="/" className="text-3xl">
          CAR<span className='text-red-500'>O</span>LOGY
        </Link>
        <div className="hidden md:flex items-center gap-x-6 text-2xl">
          {isLoggedIn ? (
            <>
              <Link href="/profile">Profile</Link>
              <form action={signOutAction}>
                <button className='p-0 cursor-pointer' type="submit">Sign Out</button>
              </form>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>

        {/* Hamburger */}
        <button 
          className={`md:hidden text-3xl`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(prev => !prev)}
        >
          {open ? '✕' : '☰'}
        </button>
        {open && (
        <>
    {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
    
          {/* Dropdown */}
          <div className="z-50 absolute top-full right-0 md:hidden flex flex-col gap-4 pt-4 px-6 pb-6 text-xl bg-navy/90 backdrop-blur-md border-b border-slate-700/50 rounded-bl-lg shadow-xl">
            {isLoggedIn ? (
              <>
                <Link href="/profile" onClick={() => setOpen(false)}>Profile</Link>
                <form action={signOutAction}>
                  <button type="submit">Sign Out</button>
                </form>
              </>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
              )}
          </div>
        </>
        )}
      </div>    
    </div>
  )
}