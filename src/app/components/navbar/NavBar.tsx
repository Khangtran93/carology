import React from 'react'
import { auth } from '../../../../auth'
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
