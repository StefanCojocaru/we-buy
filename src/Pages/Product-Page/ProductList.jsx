import React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/joy/Box'
import Products from './Products'
import db from '../../database/firebase'

import { ref, onValue, child, get, set } from 'firebase/database'

const ProductList = ({ category }) => {
  const [data, setData] = useState([])

  // useEffect(() => {
  //   const dbProducts = ref(db, `products/${category}`)
  //   onValue(dbProducts, (snapshot) => {
  //     const products = []
  //     snapshot.forEach((childSnapshot) => {
  //       const product = childSnapshot.val()
  //       products.push(product)
  //     })
  //     setData(products)
  //   })
  // }, [category])

  useEffect(() => {
    const dbProducts = ref(db, `products/${category}`)
    onValue(dbProducts, (snapshot) => {
      const products = snapshot.val() || {}
      setData(Object.values(products))
    })
  }, [category])

  console.log(data)

  return (
    <Box sx={{ display: 'flex' }}>
      {data.map((item) => (
        <Products key={item.id} item={item} />
      ))}
    </Box>
  )
}

export default ProductList
