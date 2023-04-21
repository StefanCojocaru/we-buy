import React from 'react'

import Box from '@mui/joy/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { useState, useEffect } from 'react'
import { ref, set, onValue, remove, push } from 'firebase/database'
import db, { auth } from '../../database/firebase'

import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'
import Grow from '@mui/material/Grow'
import Products from '../Product-Page/Products'

const MyOrders = () => {
  const user = auth.currentUser
  const [orders, setOrders] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  // useEffect(() => {
  //   if (user) {
  //     const dbOrders = ref(db, `users/${user.uid}/myOrders`)
  //     onValue(dbOrders, (snapshot) => {
  //       const orders = []
  //       snapshot.forEach((childSnapshot) => {
  //         const ordersItem = childSnapshot.val()
  //         orders.push(ordersItem)
  //       })
  //       setOrders(orders)
  //       console.log(orders)
  //     })
  //   }
  // }, [user])

  useEffect(() => {
    if (user) {
      const dbOrders = ref(db, `users/${user.uid}/myOrders`)
      onValue(dbOrders, (snapshot) => {
        const orders = []
        snapshot.forEach((childSnapshot) => {
          const orderId = childSnapshot.key
          const ordersItem = childSnapshot.val()
          orders.push({ ...ordersItem, orderId })
        })
        setOrders(orders)
        console.log(orders)
      })
    }
  }, [user])

  return (
    <Box>
      <h3 style={{ display: 'flex', justifyContent: 'center' }}>My Orders</h3>
      <List sx={{ listStyleType: 'disc', pl: 4 }}>
        {orders.map((order) => (
          <>
            <ListItemButton
              sx={{ display: 'list-item' }}
              key={order.orderId}
              onClick={() => setSelectedOrder(order)}
            >
              <ListItemText
                primary={order.orderId}
                secondary={order.orderDate}
              />
            </ListItemButton>
          </>
        ))}
      </List>
      {selectedOrder && (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 1200,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <ModalClose
              variant="outlined"
              sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.body',
              }}
              onClick={() => setSelectedOrder(null)}
            />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              Order ID: {selectedOrder.orderId}
            </Typography>
            <Typography
              component="h2"
              id="modal-title"
              level="h6"
              textColor="grey"
              fontWeight="lg"
            >
              Total Price: {selectedOrder.totalPrice}$
            </Typography>
            <Typography
              component="h2"
              id="modal-title"
              textColor="grey"
              fontWeight="lg"
            >
              Placed on: {selectedOrder.orderDate}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                overflowX: 'auto',
                gap: 2,
              }}
            >
              {Object.values(selectedOrder.orderItems).map((item) => (
                <Products key={item.id} item={item} />
              ))}
            </Box>
            <a
              href={`https://www.fancourier.ro/awb-tracking?awb=${selectedOrder.orderId}`}
              target="blank"
              rel="noopener noreferrer"
            >
              Track your order.
            </a>
          </Sheet>
        </Modal>
      )}
    </Box>
  )
}

export default MyOrders
