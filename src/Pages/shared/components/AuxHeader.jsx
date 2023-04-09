import React from 'react'
import { useNavigate } from 'react-router-dom'

import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import Button from '@mui/joy/Button'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import MouseIcon from '@mui/icons-material/Mouse'
import TvIcon from '@mui/icons-material/Tv'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import LaptopIcon from '@mui/icons-material/Laptop'
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import WysiwygIcon from '@mui/icons-material/Wysiwyg'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import CameraIcon from '@mui/icons-material/Camera'

import Offers from './offers-carousel/Offers'
import Box from '@mui/joy/Box'

const AuxHeader = () => {
  const navigate = useNavigate()

  const handleButtonClick = (category) => {
    navigate(`/products/${category}`)
  }

  return (
    <div>
      <Tabs
        aria-label="Basic tabs"
        defaultValue={0}
        sx={{
          borderRadius: 'lg',
          backgroundColor: '#1B1B1B',
          marginTop: '1rem',
        }}
      >
        <TabList
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <Tab sx={{ fontWeight: 'bold' }}>Products</Tab>
          <Tab sx={{ fontWeight: 'bold' }}>Resealed</Tab>
          <Tab sx={{ fontWeight: 'bold' }}>WEBUY Offers</Tab>
        </TabList>
        <TabPanel
          value={0}
          sx={{
            p: 2,
            backgroundColor: '#1B1B1B',
            borderBottomRightRadius: '20px',
            borderBottomLeftRadius: '20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Button
                onClick={() => handleButtonClick('laptops')}
                value={0}
                startDecorator={<LaptopIcon />}
                sx={{ backgroundColor: 'transparent' }}
              >
                Laptop
              </Button>
              <Button
                onClick={() => handleButtonClick('tablets')}
                value={1}
                startDecorator={<TabletAndroidIcon />}
                sx={{ bgcolor: 'transparent' }}
              >
                Tablets
              </Button>
              <Button
                onClick={() => handleButtonClick('smartphones')}
                startDecorator={<PhoneIphoneIcon />}
                sx={{ bgcolor: 'transparent' }}
              >
                Smartphones
              </Button>
              <Button
                onClick={() => handleButtonClick('gaming')}
                startDecorator={<SportsEsportsIcon />}
                sx={{ bgcolor: 'transparent' }}
              >
                Gaming
              </Button>
              <Button
                onClick={() => handleButtonClick('books')}
                startDecorator={<LibraryBooksIcon />}
                sx={{ bgcolor: 'transparent' }}
              >
                Books
              </Button>
              <Button
                onClick={() => handleButtonClick('peripherals')}
                startDecorator={<MouseIcon />}
                sx={{ bgcolor: 'transparent' }}
              >
                Peripherals
              </Button>
              <Button
                onClick={() => handleButtonClick('software')}
                startDecorator={<WysiwygIcon />}
                sx={{ bgcolor: 'transparent' }}
              >
                Software
              </Button>
              <Button
                onClick={() => handleButtonClick('tv')}
                startDecorator={<TvIcon />}
                sx={{ bgcolor: 'transparent' }}
              >
                TV
              </Button>
              <Button
                onClick={() => handleButtonClick('audio-video')}
                startDecorator={<PlayCircleIcon />}
                sx={{ bgcolor: 'transparent' }}
              >
                Audio-Video
              </Button>
              <Button
                onClick={() => handleButtonClick('photo')}
                startDecorator={<CameraIcon />}
                sx={{ bgcolor: 'transparent' }}
              >
                Photo
              </Button>
            </Box>
            <Offers />
          </Box>
        </TabPanel>
        <TabPanel value={1} sx={{ p: 2 }}>
          <b>Second</b> tab panel
        </TabPanel>
        <TabPanel value={2} sx={{ p: 2 }}>
          <b>Third</b> tab panel
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default AuxHeader
