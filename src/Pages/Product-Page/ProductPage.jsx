import React from 'react'
import { useParams } from 'react-router-dom'
import db from '../../database/firebase'
import { useState, useEffect } from 'react'
import { ref, onValue, child, get, set, update } from 'firebase/database'
import { useLocation } from 'react-router-dom'

const ProductPage = () => {
  const { id, category } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const dbProduct = ref(db, `products/${category}/${id}`)
    onValue(dbProduct, (snapshot) => {
      const productData = snapshot.val()
      setProduct(productData)
    })
  }, [id])
  console.log(product)

  return (
    <div>
      <div>Product details</div>
      <div>This is the product {category}</div>
    </div>
  )
}

export default ProductPage
