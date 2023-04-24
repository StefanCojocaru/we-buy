import React, { useState, useEffect } from 'react'

import Stack from '@mui/joy/Stack'
import Input from '@mui/joy/Input'
import IconButton from '@mui/joy/IconButton'
import Button from '@mui/joy/Button'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AspectRatio from '@mui/joy/AspectRatio'
import Badge from '@mui/material/Badge'

import logo from '../../../logo/logo.png'

import { Link } from 'react-router-dom'
import { auth } from '../../../database/firebase'
import { useNavigate, useParams } from 'react-router-dom'
import { ref, onValue, remove } from 'firebase/database'
import db from '../../../database/firebase'

const Header = () => {
  // SEARCH BAR !!
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const user = auth.currentUser

  const handleSearch = () => {
    console.log(searchValue)
    if (searchValue) {
      navigate(`/search/${searchValue}`)
    } else {
      // Do nothing if search value is empty
    }
  }

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  const [favorites, setFavorites] = useState([])

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

  const [cart, setCart] = useState([])
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
  const numCart = cart.length
  console.log(numCart)

  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={2}
      alignItems="center"
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid grey',
        borderRight: '1px solid grey',
        borderLeft: '1px solid grey',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        boxShadow:
          '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      }}
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
          startDecorator={
            <Badge badgeContent={numFavorites} size="sm" color="primary">
              <FavoriteIcon />
            </Badge>
          }
          sx={{ backgroundColor: '#1B1B1B' }}
        >
          Favorites
        </Button>
      </Link>
      <Link to={user ? '/cart' : '/myaccount/signin'}>
        <Button
          startDecorator={
            <Badge badgeContent={numCart} size="sm" color="primary">
              <ShoppingCartIcon />
            </Badge>
          }
          sx={{ backgroundColor: '#1B1B1B' }}
        >
          Cart
        </Button>
      </Link>
    </Stack>
  )
}

export default Header
