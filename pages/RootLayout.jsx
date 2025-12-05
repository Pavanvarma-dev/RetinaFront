import React from 'react'
import MainNavBar from './MainNavBar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <MainNavBar/>
        <Outlet/>
    </div>
  )
}

export default RootLayout