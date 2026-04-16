import React from 'react'
// import { logoFont } from '../../fonts/fonts'
// import Link from 'next/link'
import { auth } from '../../../../auth'
// import Button from '../Button/Button'
import NavBarClient from './NavBarClient'

const NavBar = async () => {
  const session = await auth()
  const isLoggedIn = !!session?.user
  return (
    <>
      <NavBarClient isLoggedIn={isLoggedIn}/>
    </>
  )
}

export default NavBar
