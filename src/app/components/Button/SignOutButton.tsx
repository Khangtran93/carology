'use client'
import { signOutAction } from '@/app/lib/auth'
import React from 'react'

const SignOutButton = () => {
  return (
    <button className='cursor-pointer' onClick={() => signOutAction()}>Sign Out</button>
  )
}

export default SignOutButton
