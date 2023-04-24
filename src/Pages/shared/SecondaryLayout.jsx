import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

const SecondaryLayout = () => {
  return (
    <>
      <nav>
        <Header />
      </nav>
      <Outlet />
      <Footer />
    </>
  )
}

export default SecondaryLayout
