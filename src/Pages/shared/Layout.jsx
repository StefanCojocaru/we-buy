import React from 'react'
import { Outlet } from 'react-router-dom'
import AuxHeader from './components/AuxHeader'
import Header from './components/Header'

const Layout = () => {
  return (
    <>
      <nav>
        <Header />
        <AuxHeader />
      </nav>
      <Outlet />
    </>
  )
}

export default Layout
