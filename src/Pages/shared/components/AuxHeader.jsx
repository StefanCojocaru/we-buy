import React from "react";
import { useNavigate } from "react-router-dom";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Button from "@mui/joy/Button";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MouseIcon from "@mui/icons-material/Mouse";
import TvIcon from "@mui/icons-material/Tv";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LaptopIcon from "@mui/icons-material/Laptop";
import TabletAndroidIcon from "@mui/icons-material/TabletAndroid";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CameraIcon from "@mui/icons-material/Camera";

import Offers from "./offers-carousel/Offers";
import Box from "@mui/joy/Box";

const AuxHeader = () => {
  const navigate = useNavigate();

  const handleButtonClick = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div style={{ width: "1200px" }}>
      <Tabs
        aria-label="Basic tabs"
        defaultValue={0}
        sx={{
          borderRadius: "lg",
          backgroundColor: "#3F72AF",
          marginTop: "1rem",
          boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.4)",
        }}
      >
        <TabList
          sx={{
            display: "flex",
            alignItems: "flex-start",
            backgroundColor: "rgba(219, 226, 239,1)",
          }}
        >
          <Tab
            sx={{
              fontWeight: "bold",
              backgroundColor: "rgba(219, 226, 239,1)",
              color: "#000",
              fontFamily: "apercu_proregular",
            }}
          >
            Products
          </Tab>
          <Tab
            sx={{
              fontWeight: "bold",
              backgroundColor: "rgba(219, 226, 239,1)",
              color: "#000",
              fontFamily: "apercu_proregular",
            }}
          >
            Resealed
          </Tab>
          <Tab
            sx={{
              fontWeight: "bold",
              backgroundColor: "rgba(219, 226, 239,1)",
              color: "#000",
              fontFamily: "apercu_proregular",
            }}
          >
            WEBUY Offers
          </Tab>
        </TabList>
        <TabPanel
          value={0}
          sx={{
            p: 2,
            backgroundColor: "#3F72AF",
            borderBottomRightRadius: "20px",
            borderBottomLeftRadius: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Button
                onClick={() => handleButtonClick("laptops")}
                value={0}
                startDecorator={<LaptopIcon />}
                sx={{
                  backgroundColor: "transparent",
                  fontFamily: "apercu_proregular",
                }}
              >
                Laptop
              </Button>
              <Button
                onClick={() => handleButtonClick("tablets")}
                value={1}
                startDecorator={<TabletAndroidIcon />}
                sx={{
                  bgcolor: "transparent",
                  fontFamily: "apercu_proregular",
                }}
              >
                Tablets
              </Button>
              <Button
                onClick={() => handleButtonClick("smartphones")}
                startDecorator={<PhoneIphoneIcon />}
                sx={{ bgcolor: "transparent", fontFamily: "apercu_proregular" }}
              >
                Smartphones
              </Button>
              <Button
                onClick={() => handleButtonClick("gaming")}
                startDecorator={<SportsEsportsIcon />}
                sx={{ bgcolor: "transparent", fontFamily: "apercu_proregular" }}
              >
                Gaming
              </Button>
              <Button
                onClick={() => handleButtonClick("books")}
                startDecorator={<LibraryBooksIcon />}
                sx={{ bgcolor: "transparent", fontFamily: "apercu_proregular" }}
              >
                Books
              </Button>
              <Button
                onClick={() => handleButtonClick("peripherals")}
                startDecorator={<MouseIcon />}
                sx={{ bgcolor: "transparent", fontFamily: "apercu_proregular" }}
              >
                Peripherals
              </Button>
              <Button
                onClick={() => handleButtonClick("software")}
                startDecorator={<WysiwygIcon />}
                sx={{ bgcolor: "transparent", fontFamily: "apercu_proregular" }}
              >
                Software
              </Button>
              <Button
                onClick={() => handleButtonClick("tv")}
                startDecorator={<TvIcon />}
                sx={{ bgcolor: "transparent", fontFamily: "apercu_proregular" }}
              >
                TV
              </Button>
              <Button
                onClick={() => handleButtonClick("audio-video")}
                startDecorator={<PlayCircleIcon />}
                sx={{ bgcolor: "transparent", fontFamily: "apercu_proregular" }}
              >
                Audio-Video
              </Button>
              <Button
                onClick={() => handleButtonClick("photo")}
                startDecorator={<CameraIcon />}
                sx={{ bgcolor: "transparent", fontFamily: "apercu_proregular" }}
              >
                Photo
              </Button>
            </Box>
            <div
              style={{
                boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.4)",
                borderRadius: "10px",
              }}
            >
              <Offers />
            </div>
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
  );
};

export default AuxHeader;
