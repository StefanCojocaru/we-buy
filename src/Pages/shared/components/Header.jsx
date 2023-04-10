import React, { useState } from 'react'

import Stack from '@mui/joy/Stack'
import Input from '@mui/joy/Input'
import IconButton from '@mui/joy/IconButton'
import Button from '@mui/joy/Button'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AspectRatio from '@mui/joy/AspectRatio'

import logo from '../../../logo/logo.png'

import { Link } from 'react-router-dom'
import { auth } from '../../../database/firebase'

const Header = () => {
  // SEARCH BAR !!
  const [searchValue, setSearchValue] = useState('')
  const user = auth.currentUser

  const handleSearch = () => {
    console.log(searchValue)
  }

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        alignItems="center"
      >
        <Link to="/">
          <AspectRatio
            sx={{
              width: 200,
            }}
          >
            <img src={logo} style={{ backgroundColor: 'white' }} />
          </AspectRatio>
        </Link>
        <Stack direction="row">
          <Input
            placeholder="What are you looking for?"
            style={{ width: '600px' }}
            value={searchValue}
            onChange={handleInputChange}
          />
          <IconButton variant="plain" onClick={handleSearch}>
            <SearchIcon sx={{ color: '#1B1B1B' }} />
          </IconButton>
        </Stack>
        <Link to={user ? '/myaccount' : '/myaccount/signin'}>
          <Button
            startDecorator={<PersonIcon />}
            sx={{ backgroundColor: '#1B1B1B' }}
          >
            {user ? 'My Account' : 'Sign In'}
          </Button>
        </Link>
        <Link to={user ? '/favorites' : '/myaccount/signin'}>
          <Button
            startDecorator={<FavoriteIcon />}
            sx={{ backgroundColor: '#1B1B1B' }}
          >
            Favorites
          </Button>
        </Link>
        <Link to={user ? '/cart' : '/myaccount/signin'}>
          <Button
            startDecorator={<ShoppingCartIcon />}
            sx={{ backgroundColor: '#1B1B1B' }}
          >
            Cart
          </Button>
        </Link>
      </Stack>
    </div>
  )
}

export default Header
