import React from 'react'
import { Outlet } from 'react-router-dom'
import AuxHeader from './components/AuxHeader'
import Header from './components/Header'

const Layout = ({ user }) => {
  return (
    <>
      <nav>
        <Header user={user} />
        <AuxHeader />
      </nav>
      <Outlet />
    </>
  )
}

export default Layout
