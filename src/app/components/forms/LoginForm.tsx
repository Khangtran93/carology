'use client'

import { useActionState } from 'react'
import Button from '../Button/Button'
import Link from 'next/link'
import { authenticate, authenticateGoogle } from '../../lib/auth'
import { useSearchParams } from 'next/navigation'
import {
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { GoogleIcon } from '@/app/fonts/logo/google'


export function LoginForm () {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)
  return (
    <div className='max-w-[1300px] mx-auto mb-12 md:mb-24'>
      <div className='max-w-[350px] mx-auto rounded-xl shadow-2xl px-12 py-8'>
      <form action={formAction} className='flex flex-col gap-y-4'>
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
        <Button type='submit' 
                label={isPending ? "Logging in..." : "Login"} 
                disabled={isPending}
                className='w-full bg-black text-white shadow-2xl text-center mt-2 p-2 hover:opacity-80'/>
          {errorMessage && (
            <div className='flex flex-row gap-x-2 mx-auto'>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-500">{errorMessage}</span>
            </div>
          )}
          <div className='flex items-center'>
            <div className='flex-1 h-px bg-gray-300' />
            <span className='text-xs text-gray-500'>or</span>
            <div className='flex-1 h-px bg-gray-300' />
        </div>
          
      </form>
      <form action={authenticateGoogle} className='mx-auto mt-4'>
        <input type='hidden' name='redirectTo' value={callbackUrl} />
          <button type='submit' className='w-full border border-gray-300 rounded-xl flex items-center justify-center gap-2 p-2 hover:bg-gray-50'>
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>
      </form>
      </div>
     
      <p className='text-center mt-8'>
        New to Carology?{' '}
        <Link href='/signup' className='underline font-semibold'>Create an account</Link>
      </p>
    </div>
  )
}


