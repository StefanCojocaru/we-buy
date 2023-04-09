import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import IconButton from '@mui/joy/IconButton'
import Typography from '@mui/joy/Typography'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import { SnackbarProvider, enqueueSnackbar, useSnackbar } from 'notistack'

import db from '../../database/firebase'

import { ref, get, set } from 'firebase/database'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Link } from 'react-router-dom'

const Products = ({ item }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const handleFavorites = async (item) => {
    const auth = getAuth()
    if (auth.currentUser) {
      const userId = auth.currentUser.uid
      const userRef = ref(db, `users/${userId}/favorites/${item.id}`)
      const snapshot = await get(userRef) // get the snapshot of the userRef

      if (snapshot.exists()) {
        // if item already exists in favorites, don't add it and show snackbar
        enqueueSnackbar('Item already in favorites', { variant: 'warning' })
      } else {
        // if item doesn't exist, add it to favorites and show snackbar
        set(userRef, item)
        enqueueSnackbar('Item added to favorites', { variant: 'success' })
      }
    }
  }

  const handleCart = async (item) => {
    const auth = getAuth()
    if (auth.currentUser) {
      const userId = auth.currentUser.uid
      const userRef = ref(db, `users/${userId}/cart/${item.id}`)
      const snapshot = await get(userRef) // get the snapshot of the userRef

      if (snapshot.exists()) {
        // if item already exists in favorites, don't add it and show snackbar
        enqueueSnackbar('Item already in cart', { variant: 'warning' })
      } else {
        // if item doesn't exist, add it to favorites and show snackbar
        set(userRef, item)
        enqueueSnackbar('Item added to cart', { variant: 'success' })
      }
    }
  }

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
              to={`/product/${item.category}/${item.id}/${
                item.name ? item.name : item.title
              }`}
              style={{ textDecoration: 'none' }}
            >
              <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                {item.name ? item.name : item.title}
              </Typography>
              <Typography level="body2">
                {item.brand ? item.brand : item.author}
              </Typography>

              <AspectRatio sx={{ my: 2 }}>
                <img
                  // IMAGINE AICI
                  src={item.image}
                  loading="lazy"
                  alt=""
                  style={{
                    objectFit: 'contain',
                    backgroundColor: 'white',
                  }}
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
                <SnackbarProvider />
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
