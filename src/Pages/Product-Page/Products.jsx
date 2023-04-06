import React, { useState, useEffect } from 'react'
import AspectRatio from '@mui/joy/AspectRatio'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import IconButton from '@mui/joy/IconButton'
import Typography from '@mui/joy/Typography'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import db from '../../database/firebase'

import { ref, onValue, child, get, set, update } from 'firebase/database'

import { auth } from '../../database/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Link } from 'react-router-dom'

const Products = ({ item, category }) => {
  // const [data, setData] = useState([]) // initialize empty array

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
  console.log(item)

  // const handleFavorites = (item) => {
  //   // console.log(productId)
  //   const auth = getAuth() // get the current user's auth info
  //   if (auth.currentUser) {
  //     const userId = auth.currentUser.uid // get the current user's UID
  //     const userRef = ref(db, `users/${userId}/favorites/`) // get the ref to the user's favorites for the selected product
  //     set(userRef, item) // add the product to the user's favorites
  //   }
  // }

  const handleFavorites = (item) => {
    const auth = getAuth()
    if (auth.currentUser) {
      const userId = auth.currentUser.uid
      const userRef = ref(db, `users/${userId}/favorites/${item.id}`)
      set(userRef, item)
    }
  }
  const handleCart = (item) => {
    const auth = getAuth()
    if (auth.currentUser) {
      const userId = auth.currentUser.uid
      const userRef = ref(db, `users/${userId}/cart/${item.id}`)
      set(userRef, item)
    }
  }
  console.log(item)

  return (
    <>
      {item && (
        <React.Fragment>
          <Card
            key={item.id}
            variant="outlined"
            sx={{
              marginTop: 2,
              width: 340,
            }}
          >
            <Link
              to={`/product/${category}/${item.id}`}
              style={{ textDecoration: 'none' }}
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
            </Link>
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
                  onClick={() => handleFavorites(item)}
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
                  onClick={() => handleCart(item)}
                >
                  Buy
                </Button>
              </Box>
            </Box>
          </Card>
        </React.Fragment>
      )}
    </>
  )
}

export default Products
