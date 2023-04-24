import React from 'react'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import Link from '@mui/joy/Link'
import Divider from '@mui/material/Divider'
import '../../../style/style.css'

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'black',
          width: '100%',
          marginTop: 1,
          paddingTop: 2,
          paddingBottom: 2,
          position: 'absolute',
          bottom: 0,
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            marginBottom: 3,
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Link
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'none' },
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                About us
              </Typography>
            </Link>
            <Link
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'none' },
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                Contact
              </Typography>
            </Link>
            <Link
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'none' },
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                Customer Service
              </Typography>
            </Link>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: 'white' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Link
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'none' },
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                Newsletter Sign Up
              </Typography>
            </Link>
            <Link
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'none' },
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                Privacy Policy
              </Typography>
            </Link>
            <Link
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'none' },
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                Terms and Conditions
              </Typography>
            </Link>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: 'white' }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{ color: 'white', fontWeight: 'bold', marginBottom: 1 }}
            >
              Social Media
            </Typography>

            <Box>
              <div className="container">
                <div className="btn fb-btn">
                  <i className="fa fa-facebook" aria-hidden="true" id="fb"></i>
                </div>
                <div className="btn ig-btn">
                  <i className="fa fa-instagram" aria-hidden="true" id="ig"></i>
                </div>
                <div className="btn tw-btn">
                  <i className="fa fa-twitter" aria-hidden="true" id="tw"></i>
                </div>
              </div>
            </Box>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: 'white' }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{ color: 'white', fontWeight: 'bold', marginBottom: 1 }}
            >
              Payment Methods
            </Typography>
            <Box>
              <div className="container">
                <div className="btn fb-btn">
                  <i className="fa-brands fa-apple-pay"></i>
                </div>
                <div className="btn ig-btn">
                  <i className="fa fa-instagram" aria-hidden="true" id="ig"></i>
                </div>
                <div className="btn tw-btn">
                  <i className="fa fa-twitter" aria-hidden="true" id="tw"></i>
                </div>
              </div>
            </Box>
          </Box>
        </Box>
        <Typography
          sx={{ color: 'white', fontWeight: 'lg', fontStyle: 'italic' }}
        >
          Made by Stefan Cojocaru
        </Typography>
      </Box>
    </>
  )
}

export default Footer
