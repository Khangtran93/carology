import React from 'react'
import {LoginForm} from '../components/forms/LoginForm'

export default async function Page() {
  // await new Promise(resolve => setTimeout(resolve, 2000))
  return (
    <div>
      <LoginForm/>
    </div>
  )
}


