import React from 'react'

import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Typography from '@mui/joy/Typography'
import Box from '@mui/joy/Box'

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
          <ListItem>1 red onion</ListItem>
          <ListItem>2 red peppers</ListItem>
          <ListItem>120g bacon</ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default Favorites
