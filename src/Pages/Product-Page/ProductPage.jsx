import React from 'react'
import { useParams } from 'react-router-dom'
import db from '../../database/firebase'
import { useState, useEffect } from 'react'
import { ref, onValue, get, set } from 'firebase/database'

import Products from './Products'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Button from '@mui/joy/Button'

import Table from '@mui/joy/Table'
import Sheet from '@mui/joy/Sheet'
import { SnackbarProvider, enqueueSnackbar, useSnackbar } from 'notistack'
import { auth } from '../../database/firebase'

const ProductPage = () => {
  const { id, category } = useParams()
  const [product, setProduct] = useState({})
  const [similarProducts, setSimilarProducts] = useState([])
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const user = auth.currentUser

  useEffect(() => {
    const dbProduct = ref(db, `products/${category}/${id}`)
    const dbCategory = ref(db, `products/${category}`)
    onValue(dbProduct, (snapshot) => {
      const productData = snapshot.val()
      setProduct(productData)
    })
    onValue(dbCategory, (snapshot) => {
      const categoryData = snapshot.val()
      setSimilarProducts(Object.values(categoryData))
    })
  }, [id, category])

  const handleFavorites = async (item) => {
    if (user) {
      const userId = user.uid
      const userRef = ref(db, `users/${userId}/favorites/${item.id}`)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        enqueueSnackbar('Item already in favorites', { variant: 'warning' })
      } else {
        set(userRef, item)
        enqueueSnackbar('Item added to favorites', { variant: 'success' })
      }
    }
  }

  const handleCart = async (item) => {
    if (user) {
      const userId = user.uid
      const userRef = ref(db, `users/${userId}/cart/${item.id}`)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        enqueueSnackbar('Item already in cart', { variant: 'warning' })
      } else {
        set(userRef, item)
        enqueueSnackbar('Item added to cart', { variant: 'success' })
      }
    }
  }

  const characteristics = [
    {
      label: product.title ? 'Title' : 'Name',
      value: product.title || product.name,
    },
    {
      label: product.brand ? 'Brand' : product.author ? 'Author' : '',
      value: product.brand || product.author || '',
    },
    { label: 'Description', value: product.description },
    { label: 'Price', value: product.price },
    { label: 'Category', value: product.category },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Storage', value: product.storage },
    { label: 'Connectivity', value: product.connectivity },
    { label: 'Dimensions', value: product.dimensions },
    { label: 'Resolution', value: product.resolution },
    { label: 'Screen size', value: product.screenSize },
    { label: 'Weight', value: product.weight },
  ]

  return (
    <div>
      <Box>breadcrumbs</Box>
      {product ? (
        <Box>
          <h2>{product.name ? product.name : product.title}</h2>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Box sx={{ width: '300px', height: 'auto' }}>
                <img
                  // IMAGINE AICI
                  src={product.image}
                  loading="lazy"
                  alt=""
                  width="100%"
                  height="auto"
                />
              </Box>
            </Box>

            <Card sx={{ minWidth: 400 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.price}$
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  in stock
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                  }}
                >
                  <Button
                    startDecorator={<ShoppingCartIcon />}
                    sx={{ backgroundColor: '#1B1B1B', marginRight: '1rem' }}
                    onClick={() => handleFavorites(product)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    startDecorator={<FavoriteBorderIcon />}
                    sx={{ backgroundColor: '#1B1B1B', marginRight: '1rem' }}
                    onClick={() => handleCart(product)}
                  >
                    Add to Favorites
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box>
            <h3>Similar Products</h3>

            <Box sx={{ display: 'flex', gap: '10px' }}>
              {similarProducts
                .filter((item) => item.id !== product.id)
                .map((item) => (
                  <Products key={item.id} item={item} />
                ))}
            </Box>
          </Box>
          <Box>
            <h3>Product Details</h3>
            <Sheet>
              <Table aria-label="striped table" stripe="odd">
                <thead>
                  <tr>
                    <th style={{ width: '10%' }}>Characteristics</th>
                  </tr>
                </thead>
                <tbody>
                  {characteristics.map(
                    (char) =>
                      char.value && (
                        <tr key={char.label}>
                          <td style={{ fontWeight: 'bold' }}>{char.label}</td>
                          <td>{char.value}</td>
                        </tr>
                      )
                  )}
                </tbody>
              </Table>
            </Sheet>
          </Box>
        </Box>
      ) : (
        <div>Loading product...</div>
      )}
    </div>
  )
}

export default ProductPage
