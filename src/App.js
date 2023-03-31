import React from 'react'
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation,
  useParams,
} from 'react-router-dom'

import Home from './Pages/Home/Home.jsx'
import Layout from './Pages/shared/Layout.jsx'
import Products from './Pages/Product-Page/Products.jsx'
import MyAccount from './Pages/My-Account/MyAccount.jsx'

import './style/style.css'

import db from './database/firebase'
import SignIn from './Pages/Sign/Sign-In/SignIn.jsx'
import SignUp from './Pages/Sign/Sign-Up/SignUp.jsx'

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './database/firebase'
import SecondaryLayout from './Pages/shared/SecondaryLayout.jsx'

const App = () => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setAuthUser(user.displayName)
        console.log(authUser)
      } else {
        // User is signed out
        setAuthUser(null)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout user={authUser} />}>
          <Route index element={<Home />} />
          <Route
            path="/products/:category"
            element={<ProductsWithCategory />}
          />
        </Route>
        <Route path="/myaccount" element={<SecondaryLayout />}>
          <Route index element={<MyAccount user={authUser} />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  )
}
const ProductsWithCategory = () => {
  const { category } = useParams()
  return <Products category={category} />
}

export default App
