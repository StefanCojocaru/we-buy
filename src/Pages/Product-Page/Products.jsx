import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { SnackbarProvider, enqueueSnackbar, useSnackbar } from "notistack";
import db from "../../database/firebase";
import { ref, get, set } from "firebase/database";
import { Link } from "react-router-dom";
import { auth } from "../../database/firebase";

const Products = ({ item }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const user = auth.currentUser;

  const handleFavorites = async (item) => {
    if (user) {
      const userId = user.uid;
      const userRef = ref(db, `users/${userId}/favorites/${item.id}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        enqueueSnackbar("Item already in favorites", { variant: "warning" });
      } else {
        set(userRef, item);
        enqueueSnackbar("Item added to favorites", { variant: "success" });
      }
    }
  };

  const handleCart = async (item) => {
    if (user) {
      const userId = user.uid;
      const userRef = ref(db, `users/${userId}/cart/${item.id}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        enqueueSnackbar("Item already in cart", { variant: "warning" });
      } else {
        set(userRef, item);
        enqueueSnackbar("Item added to cart", { variant: "success" });
      }
    }
  };

  return (
    <>
      {item && (
        <React.Fragment>
          <Card
            key={item.id}
            variant="outlined"
            sx={{
              marginTop: 2,

              minWidth: 260,
              maxWidth: 260,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              bgcolor: "#DBE2EF",
              boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s", // Add a transition for the transform property
              "&:hover": {
                transform: "scale(1.04)", // Scale up by 5% on hover (adjust as needed)
              },
            }}
          >
            <Link
              to={`/product/${item.category}/${item.id}/${
                item.name ? item.name : item.title
              }`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                level="h2"
                fontSize="md"
                sx={{ mb: 0.5, fontFamily: "apercu_proregular" }}
              >
                {item.name ? item.name : item.title}
              </Typography>
              <Typography
                level="body2"
                sx={{ fontFamily: "apercu_proregular" }}
              >
                {item.brand ? item.brand : item.author}
              </Typography>

              <AspectRatio sx={{ my: 2 }}>
                <img
                  // IMAGINE AICI
                  src={item.image}
                  loading="lazy"
                  alt=""
                  style={{
                    objectFit: "contain",
                    backgroundColor: "#fff",
                  }}
                />
              </AspectRatio>
            </Link>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography level="body3">Total price:</Typography>
                <Typography
                  fontSize="lg"
                  fontWeight="lg"
                  sx={{ fontFamily: "apercu_proregular" }}
                >
                  {item.price}$
                </Typography>
              </div>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  aria-label="bookmark Bahamas Islands"
                  variant="none"
                  color="neutral"
                  size="sm"
                  onClick={() => handleFavorites(item)}
                  // sx={{ ml: 'auto', fontWeight: 600 }}
                >
                  <FavoriteIcon
                    sx={{
                      color: "#3F72AF",
                      transition: "color 0.3s",
                      "&:hover": {
                        color: "#BB2525",
                      },
                    }}
                  />
                </IconButton>
                <IconButton
                  aria-label="bookmark Bahamas Islands"
                  variant="none"
                  color="neutral"
                  size="sm"
                  sx={{
                    fontFamily: "apercu_proregular",
                  }}
                  onClick={() => handleCart(item)}
                >
                  <ShoppingCartIcon
                    sx={{
                      color: "#3F72AF",
                      transition: "color 0.3s",
                      "&:hover": {
                        color: "#8EAC50",
                      },
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
          </Card>
        </React.Fragment>
      )}
    </>
  );
};

export default Products;
