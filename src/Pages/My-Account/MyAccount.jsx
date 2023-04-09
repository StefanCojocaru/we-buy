import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../database/firebase'

import List from '@mui/material/List'

import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import Box from '@mui/material/Box'

import MyOrders from './MyOrders'

const MyAccount = ({ user }) => {
  const navigate = useNavigate()
  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        console.log('signed out')
        console.log(user)
        navigate('/')
      })
      .catch((error) => {
        console.log('error signing out')
      })
  }

  const [selectedItem, setSelectedItem] = useState(null)
  const handleMyOrders = () => {
    setSelectedItem('myOrders')
  }
  const handleSell = () => {
    setSelectedItem('sellProduct')
  }

  return (
    <>
      <div>
        <h2>Welcome {user}</h2>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <List
          sx={{
            width: '100%',
            maxWidth: 120,
            bgcolor: 'black',
            color: 'white',
            borderRadius: '10px',
          }}
          component="nav"
          aria-label="mailbox folders"
        >
          <ListItemButton onClick={handleMyOrders}>
            <ListItemText primary="My Orders" />
          </ListItemButton>
          <Divider />
          <ListItemButton divider onClick={handleSell}>
            <ListItemText primary="Sell" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="TBA" />
          </ListItemButton>
          <Divider light />
          <ListItemButton>
            <ListItemText primary="TBA" />
          </ListItemButton>
          <Divider light />
          <ListItemButton>
            <ListItemText primary="TBA" />
          </ListItemButton>
          <Divider light />
          <ListItemButton onClick={handleSignOut}>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </List>

        {selectedItem === 'myOrders' && (
          <Box sx={{ backgroundColor: 'lightblue', width: '90%' }}>
            <MyOrders />
          </Box>
        )}
        {selectedItem === 'sellProduct' && (
          <Box sx={{ backgroundColor: 'lightblue', width: '90%' }}>
            <h3>Selling Form</h3>
          </Box>
        )}
      </Box>
    </>
  )
}
export default MyAccount
