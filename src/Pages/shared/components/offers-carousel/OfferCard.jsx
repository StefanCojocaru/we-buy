import * as React from 'react'
import Box from '@mui/joy/Box'
import Card from '@mui/joy/Card'
import CardCover from '@mui/joy/CardCover'

export default function OfferCard({ imageOffer }) {
  return (
    <Box
      component="ul"
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        p: 0,
        m: 0,
      }}
    >
      <Card
        component="li"
        sx={{
          flexGrow: 1,
          height: 400,
          width: 200,
        }}
      >
        <CardCover>
          <img src={imageOffer} loading="lazy" alt="" />
        </CardCover>
      </Card>
    </Box>
  )
}
