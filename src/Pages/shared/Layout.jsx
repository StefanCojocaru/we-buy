import React from 'react'
import { Outlet } from 'react-router-dom'
import AuxHeader from './components/AuxHeader'
import Header from './components/Header'
import Footer from './components/Footer'

const Layout = () => {
  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <Header />
      </header>
      <AuxHeader />

      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
