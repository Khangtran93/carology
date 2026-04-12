import React, { Suspense } from 'react'
import {LoginForm} from '../components/forms/LoginForm'

export default function Page() {
  return (
    <div>
      <Suspense>
        <LoginForm/>
      </Suspense>
      
    </div>
  )
}


