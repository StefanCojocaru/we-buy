import React from 'react'

import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Typography from '@mui/joy/Typography'
import Box from '@mui/joy/Box'
import ClearIcon from '@mui/icons-material/Clear'
import Button from '@mui/joy/Button'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'

import Products from '../Product-Page/Products'
import { useState, useEffect } from 'react'
import { ref, set, onValue, remove, push } from 'firebase/database'
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
      })
    }
  }, [user])

  const totalPrice = cart.reduce((total, item) => total + item.price, 0)

  const clearAll = () => {
    if (user) {
      const dbCart = ref(db, `users/${user.uid}/cart`)
      remove(dbCart)
    }
    setCart([])
  }

  // REDO THIS
  const placeOrder = () => {
    if (user) {
      const dbOrders = ref(db, `users/${user.uid}/myOrders`)
      const newOrderRef = push(dbOrders)

      const orderItems = cart.map((item) => ({
        productId: item.id,
        price: item.price,
      }))

      const newOrderKey = newOrderRef.key
      const newOrderPath = `users/${user.uid}/myOrders/${newOrderKey}`
      set(ref(db, newOrderPath), {
        orderItems,
        totalPrice,
      })

      clearAll()
    }
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
        <h3>Total Price: {totalPrice}$</h3>
        <Button
          startDecorator={<ClearIcon />}
          sx={{ backgroundColor: '#1B1B1B', marginRight: '1rem' }}
          onClick={clearAll}
        >
          Clear All
        </Button>
        <Button
          startDecorator={<ShoppingCartCheckoutIcon />}
          sx={{ backgroundColor: '#1B1B1B' }}
          onClick={placeOrder}
        >
          Place Order
        </Button>
      </Box>
    </Box>
  )
}

export default Cart
