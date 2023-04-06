import React from 'react'
import Products from '../Product-Page/Products'
import Box from '@mui/joy/Box'

import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import db from '../../database/firebase'

const Home = () => {
  const [products, setProducts] = useState([])

  // useEffect(() => {
  //   const dbRef = ref(db, 'products')
  //   onValue(dbRef, (snapshot) => {
  //     const products = []
  //     snapshot.forEach((childSnapshot) => {
  //       const product = childSnapshot.val()
  //       products.push(product)
  //     })
  //     setProducts(products)
  //   })
  // }, [])

  useEffect(() => {
    const dbRef = ref(db, 'products')
    onValue(dbRef, (snapshot) => {
      const categories = snapshot.val()
      const products = []
      for (const categoryKey in categories) {
        const category = categories[categoryKey]
        for (const productKey in category) {
          const product = category[productKey]
          products.push(product)
        }
      }
      setProducts(products)
    })
  }, [])

  return (
    <>
      <h2>All products</h2>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {products.map((product) => (
          <Products key={product.id} item={product} />
        ))}
      </Box>
    </>
  )
}

export default Home
