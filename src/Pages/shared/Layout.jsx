import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import AuxHeader from './components/AuxHeader'
import Header from './components/Header'
import Products from '../Product-Page/Products'

const Layout = ({ user }) => {
  return (
    <>
      <nav>
        <Header />
        <AuxHeader />
        {/* <Products /> */}
        <div>Hello {user}</div>
      </nav>
      <Outlet />
    </>
  )
}

export default Layout
