import React from 'react'

import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Typography from '@mui/joy/Typography'
import Box from '@mui/joy/Box'

import Products from '../Product-Page/Products'

const Favorites = () => {
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
          <ListItem>
            <Products category="laptops" />
          </ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default Favorites
