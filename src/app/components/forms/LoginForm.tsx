'use client'

import { useActionState } from 'react'
import Button from '../Button/Button'
import Link from 'next/link'
import { authenticate } from '../../lib/auth'
import { useSearchParams } from 'next/navigation'
import {
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';


export function LoginForm () {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [errorMessage, formAction] = useActionState(authenticate, undefined)
  return (
    <div className='max-w-[1300px] mx-auto mb-24'>
      
      <form action={formAction} className='flex flex-col max-w-[350px] mx-auto  px-12 py-8 gap-6 rounded-xl shadow-2xl'>
        <h1 className='text-xl font-bold text-center'>Login</h1>
        <div className='flex flex-col gap-2'>
          <label className='font-semibold'>Email</label>
          <input id='email' name='email' type="email" placeholder='Enter your email' className='rounded-sm px-2 py-1 border-1 border-gray-300 focus:outline-none'></input>
        </div>
        
        <div className='flex flex-col gap-2'>
          <label className='font-semibold'>Password</label>
          <input id='password' name='password' type='password' placeholder='Enter your password' className='rounded-sm px-2 py-1 border-1 border-gray-300 focus:outline-none'></input>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button type='submit' label="Login" className='w-full bg-black text-white shadow-2xl text-center mt-2 p-2'/>
        <div className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
          </div>
      </form>
      <h3 className='text-center mt-8 font-semibold'>New to Carology? <span className='underline'><Link href='/signup'>Create an account</Link></span></h3>
    </div>
  )
}


