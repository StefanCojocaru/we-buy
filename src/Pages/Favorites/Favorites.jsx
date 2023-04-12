import React from 'react'

import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Typography from '@mui/joy/Typography'
import Box from '@mui/joy/Box'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Button from '@mui/joy/Button'
import ClearIcon from '@mui/icons-material/Clear'

import Products from '../Product-Page/Products'
import { useState, useEffect } from 'react'
import { ref, onValue, remove } from 'firebase/database'
import db, { auth } from '../../database/firebase'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const user = auth.currentUser

  useEffect(() => {
    if (user) {
      const dbFavorites = ref(db, `users/${user.uid}/favorites`)
      onValue(dbFavorites, (snapshot) => {
        const favorites = []
        snapshot.forEach((childSnapshot) => {
          const favorite = childSnapshot.val()
          favorites.push(favorite)
        })
        setFavorites(favorites)
      })
    }
  }, [user])

  const numFavorites = favorites.length
  console.log(numFavorites)

  const clearAll = () => {
    if (user) {
      const dbFavorites = ref(db, `users/${user.uid}/favorites`)
      remove(dbFavorites)
    }
    setFavorites([])
  }

  return (
    <Box textAlign="center" marginTop="2rem">
      <Typography
        id="basic-list-demo"
        level="body3"
        textTransform="uppercase"
        fontWeight="lg"
      >
        Favorite Products
      </Typography>
      <Box display="inline-block">
        <List aria-labelledby="basic-list-demo">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            {favorites.map((item) => (
              <ListItem key={item.id}>
                <Products item={item} />
              </ListItem>
            ))}
          </Box>
        </List>
        <Button
          startDecorator={<ShoppingCartIcon />}
          sx={{ backgroundColor: '#1B1B1B', marginRight: '1rem' }}
        >
          Add All To Cart
        </Button>
        <Button
          startDecorator={<ClearIcon />}
          sx={{ backgroundColor: '#1B1B1B' }}
          onClick={clearAll}
        >
          Clear All
        </Button>
      </Box>
    </Box>
  )
}

export default Favorites
