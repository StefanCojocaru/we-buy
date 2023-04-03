import React, { useState, useEffect } from 'react'
import AspectRatio from '@mui/joy/AspectRatio'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import IconButton from '@mui/joy/IconButton'
import Typography from '@mui/joy/Typography'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import db from '../../database/firebase'

import { ref, onValue, child, get } from 'firebase/database'

const Products = ({ category, random }) => {
  const [data, setData] = useState([]) // initialize empty array

  useEffect(() => {
    const dbProducts = ref(db, `products/${category}`)
    onValue(dbProducts, (snapshot) => {
      const products = []
      snapshot.forEach((childSnapshot) => {
        const product = childSnapshot.val()
        products.push(product)
      })
      setData(products)
    })
  }, [category])

  return (
    <Box sx={{ display: 'flex' }}>
      {data.map((item) => (
        <Card
          key={item.id}
          variant="outlined"
          sx={{ width: 320, marginTop: 2, marginRight: 1 }}
        >
          <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
            {item.name ? item.name : item.title}
          </Typography>
          <Typography level="body2">
            {item.brand ? item.brand : item.author}
          </Typography>

          <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
            <img
              // IMAGINE AICI
              src={item.image}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Typography level="body3">Total price:</Typography>
              <Typography fontSize="lg" fontWeight="lg">
                {item.price}$
              </Typography>
            </div>
            <Box sx={{ display: 'flex' }}>
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                // sx={{ ml: 'auto', fontWeight: 600 }}
              >
                <FavoriteBorderIcon />
              </IconButton>
              <Button
                variant="solid"
                size="sm"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ backgroundColor: '#1B1B1B' }}
              >
                Buy
              </Button>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  )
}

export default Products
