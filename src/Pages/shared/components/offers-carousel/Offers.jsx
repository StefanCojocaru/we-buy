import React from 'react'

import OfferCard from './OfferCard'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Offers = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={2000}
      showArrows={false}
      showThumbs={false}
    >
      <OfferCard imageOffer="https://firebasestorage.googleapis.com/v0/b/we-buy-ead50.appspot.com/o/products%2Fgalaxy_tabs7.webp?alt=media&token=9798b63b-e21b-482b-a1cc-35f7c7eeb2b2" />
      <OfferCard imageOffer="https://firebasestorage.googleapis.com/v0/b/we-buy-ead50.appspot.com/o/products%2Fcorsair_k95.jpg?alt=media&token=aac80e0b-4591-4e00-ba31-9e646d9fb800" />
      <OfferCard imageOffer="https://firebasestorage.googleapis.com/v0/b/we-buy-ead50.appspot.com/o/products%2FExtreme2_Hero_Black-1605x1605px.webp?alt=media&token=05585a03-eeb5-4c00-a0db-54d45ac014cf" />
      <OfferCard imageOffer="https://firebasestorage.googleapis.com/v0/b/we-buy-ead50.appspot.com/o/products%2FConsola-Nintendo-Switch-OLED-White-3D-Coperta.webp?alt=media&token=7e45e88c-450b-4446-ab4a-ce834b2f2c48" />
    </Carousel>
  )
}

export default Offers
