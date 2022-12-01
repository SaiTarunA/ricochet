import React from 'react'
import "../styles/nav-bar.css"
import { useGlobalState } from './state'

const NavBar = () => {
    const [navBarInnerComp] = useGlobalState("navBarInnerComp")
    console.log(navBarInnerComp)
  return (
    <header className='navbar'>{navBarInnerComp}</header>
  )
}

export default NavBar