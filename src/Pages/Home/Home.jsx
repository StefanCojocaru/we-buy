import React from 'react'
import Products from '../Product-Page/Products'
import Box from '@mui/joy/Box'

import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import db from '../../database/firebase'
import Divider from '@mui/material/Divider'

const Home = () => {
  const [products, setProducts] = useState([])

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
    <div
      className="content"
      style={{
        marginLeft: '10rem',
        marginRight: '10rem',
        paddingBottom: '11.5rem',
      }}
    >
      <h2>All products</h2>
      <Divider />
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
    </div>
  )
}

export default Home
