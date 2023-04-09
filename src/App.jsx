import React from 'react'
import { Routes, Route, useParams } from 'react-router-dom'

import Home from './Pages/Home/Home.jsx'
import Layout from './Pages/shared/Layout.jsx'
import ProductList from './Pages/Product-Page/ProductList.jsx'
import MyAccount from './Pages/My-Account/MyAccount.jsx'
import Favorites from './Pages/Favorites/Favorites.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import ProductPage from './Pages/Product-Page/ProductPage.jsx'

import './style/style.css'

import SignIn from './Pages/Sign/Sign-In/SignIn.jsx'
import SignUp from './Pages/Sign/Sign-Up/SignUp.jsx'

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './database/firebase'
import SecondaryLayout from './Pages/shared/SecondaryLayout.jsx'
import { SnackbarProvider } from 'notistack'

const App = () => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setAuthUser(user.displayName)
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
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<Layout user={authUser} />}>
            <Route index element={<Home />} />
            <Route
              path="/products/:category"
              element={<ProductsWithCategory />}
            />
          </Route>
          <Route path="/product" element={<SecondaryLayout user={authUser} />}>
            <Route path=":category/:id/:name" element={<ProductPage />} />
          </Route>
          <Route
            path="/myaccount"
            element={<SecondaryLayout user={authUser} />}
          >
            <Route index element={<MyAccount user={authUser} />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route
            path="/favorites"
            element={<SecondaryLayout user={authUser} />}
          >
            <Route index element={<Favorites user={authUser} />} />
          </Route>
          <Route path="/cart" element={<SecondaryLayout user={authUser} />}>
            <Route index element={<Cart user={authUser} />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </div>
  )
}

// REFACTOR THIS !!!
const ProductsWithCategory = () => {
  const { category } = useParams()
  return <ProductList category={category} />
}

// const ItemDetails = () => {
//   const { item } = useParams()
//   return <ProductPage id={item} />
// }

export default App
