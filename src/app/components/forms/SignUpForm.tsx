'use client'
import React, { useActionState } from 'react'
import Button from '../Button/Button'
import { FormState } from '../../lib/definition';
import { createUser } from '../../lib/auth';


const SignUpForm = () => {
  const initialState: FormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createUser, initialState)
  return (
    <div className='max-w-[1300px] mx-auto mb-24'>
      
      <form action={formAction} className='flex flex-col max-w-[350px] mx-auto  px-12 py-8 gap-6 rounded-xl shadow-2xl'>
        <h1 className='text-center text-xl font-bold'>Sign up </h1>

        <div className='flex flex-col gap-2'>
          <label className='font-semibold'>Name</label>
          <input id='name' name='name' type="text" placeholder='Enter your name' className='rounded-sm px-2 py-1 border-1 border-gray-300 focus:outline-none'></input>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-semibold'>Email</label>
          <input id='email' name='email' type="email" placeholder='Enter your email' className='rounded-sm px-2 py-1 border-1 border-gray-300 focus:outline-none'></input>
        </div>
        
        <div className='flex flex-col gap-2'>
          <label className='font-semibold'>Password</label>
          <input id='password1' name='password' type='password' placeholder='Enter your password' className='rounded-sm px-2 py-1 border-1 border-gray-300 focus:outline-none'></input>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='font-semibold'>Confirm Password</label>
          <input id='password2' name='confirmedPassword' type='password' placeholder='Confirm your password' className='rounded-sm px-2 py-1 border-1 border-gray-300 focus:outline-none'></input>
        </div>
        {state && <div>{state.message}</div>}
        <Button type="submit" label="Sign Up" className='p-2 bg-black text-white text-center hover:bg-gray-700'/>
      </form>
    </div>
  )
}

export default SignUpForm
