import React from 'react'

import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Typography from '@mui/joy/Typography'
import Box from '@mui/joy/Box'
import ClearIcon from '@mui/icons-material/Clear'
import Button from '@mui/joy/Button'

import Products from '../Product-Page/Products'
import { useState, useEffect } from 'react'
import {
  getDatabase,
  ref,
  set,
  update,
  onValue,
  remove,
} from 'firebase/database'
import db, { auth } from '../../database/firebase'

const Cart = () => {
  const [cart, setCart] = useState([])
  const user = auth.currentUser

  useEffect(() => {
    if (user) {
      const dbCart = ref(db, `users/${user.uid}/cart`)
      onValue(dbCart, (snapshot) => {
        const cart = []
        snapshot.forEach((childSnapshot) => {
          const cartItem = childSnapshot.val()
          cart.push(cartItem)
        })
        setCart(cart)
        console.log(cart)
      })
    }
  }, [user])

  const clearAll = () => {
    if (user) {
      const dbCart = ref(db, `users/${user.uid}/cart`)
      remove(dbCart)
    }
    setCart([])
  }

  return (
    <Box textAlign="center" marginTop="2rem">
      <Typography
        id="basic-list-demo"
        level="body3"
        textTransform="uppercase"
        fontWeight="lg"
      >
        Cart
      </Typography>
      <Box display="inline-block">
        <List aria-labelledby="basic-list-demo">
          {cart.map((item) => (
            <ListItem key={item.id}>
              <Products item={item} />
            </ListItem>
          ))}
        </List>
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

export default Cart
