import React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/joy/Box'
import Products from './Products'
import db from '../../database/firebase'

import { ref, onValue } from 'firebase/database'

const ProductList = ({ category }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const dbProducts = ref(db, `products/${category}`)
    onValue(dbProducts, (snapshot) => {
      const products = snapshot.val()
      setData(Object.values(products))
    })
  }, [category])

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {data.map((item) => (
        <Products key={item.id} item={item} category={category} />
      ))}
    </Box>
  )
}

export default ProductList
