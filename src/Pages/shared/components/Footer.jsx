import React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Divider from "@mui/material/Divider";
import "../../../style/style.css";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#112D4E",
          width: "100%",

          marginTop: 3,
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: 3,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Link
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "none" },
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "apercu_proregular",
                }}
              >
                About us
              </Typography>
            </Link>
            <Link
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "none" },
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "apercu_proregular",
                }}
              >
                Contact
              </Typography>
            </Link>
            <Link
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "none" },
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "apercu_proregular",
                }}
              >
                Customer Service
              </Typography>
            </Link>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: "white" }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Link
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "none" },
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "apercu_proregular",
                }}
              >
                Newsletter Sign Up
              </Typography>
            </Link>
            <Link
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "none" },
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "apercu_proregular",
                }}
              >
                Privacy Policy
              </Typography>
            </Link>
            <Link
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "none" },
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "apercu_proregular",
                }}
              >
                Terms and Conditions
              </Typography>
            </Link>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: "white" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                marginBottom: 1,
                fontFamily: "apercu_proregular",
              }}
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
            sx={{ backgroundColor: "white" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                marginBottom: 1,
                fontFamily: "apercu_proregular",
              }}
            >
              Payment Methods
            </Typography>
            <Box>
              <div className="paymentContainer">
                <div className="paymentCard">
                  <i
                    className="fa-brands fa-cc-visa"
                    style={{ color: "#112D4E" }}
                  ></i>
                </div>
                <div className="paymentCard">
                  <i
                    className="fa-brands fa-cc-mastercard"
                    style={{ color: "#112D4E" }}
                  ></i>
                </div>
                <div className="paymentCard">
                  <i
                    className="fa-brands fa-apple-pay"
                    style={{ color: "#112D4E" }}
                  ></i>
                </div>
                <div className="paymentCard">
                  <i
                    className="fa-brands fa-google-pay"
                    style={{ color: "#112D4E" }}
                  ></i>
                </div>
                <div className="paymentCard">
                  <i
                    className="fa-solid fa-money-bill-transfer"
                    style={{ color: "#112D4E" }}
                  ></i>
                </div>
              </div>
            </Box>
          </Box>
        </Box>
        <Typography
          sx={{
            color: "white",
            fontWeight: "lg",
            fontStyle: "italic",
            fontFamily: "apercu_proregular",
            fontWeight: "normal",
          }}
        >
          Made by Stefan Cojocaru
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
