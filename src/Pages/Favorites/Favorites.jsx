import React from "react";

import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/joy/Button";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";

import Products from "../Product-Page/Products";
import { useState, useEffect } from "react";
import { ref, onValue, remove } from "firebase/database";
import db, { auth } from "../../database/firebase";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const dbFavorites = ref(db, `users/${user.uid}/favorites`);
      onValue(dbFavorites, (snapshot) => {
        const favorites = [];
        snapshot.forEach((childSnapshot) => {
          const favorite = childSnapshot.val();
          favorites.push(favorite);
        });
        setFavorites(favorites);
      });
    }
  }, [user]);

  const numFavorites = favorites.length;
  console.log(numFavorites);

  const clearAll = () => {
    if (user) {
      const dbFavorites = ref(db, `users/${user.uid}/favorites`);
      remove(dbFavorites);
    }
    setFavorites([]);
  };

  return (
    <Box sx={{ marginTop: 2, width: "1200px" }}>
      <Typography
        sx={{
          fontFamily: "apercu_proregular",
          fontWeight: "bold",
          fontSize: "24px",
          textAlign: "center",
          marginBottom: 1,
        }}
      >
        FAVORITE PRODUCTS
      </Typography>
      <Divider />
      <Box>
        {favorites.length > 0 ? (
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
                marginBottom: 2,
              }}
            >
              {favorites.map((item) => (
                <ListItem key={item.id}>
                  <Products item={item} />
                </ListItem>
              ))}
            </Box>
            <Box
              textAlign="center"
              sx={{ display: "flex", justifyContent: "center", gap: "8px" }}
            >
              <Button
                startDecorator={<ShoppingCartIcon />}
                sx={{
                  backgroundColor: "#3F72AF",

                  "&:hover": {
                    backgroundColor: "#112D4E", // Change to the desired hover color
                  },

                  "&:hover svg": {
                    // Change the color of the favorite icon when the button is hovered
                    fill: "#8EAC50", // Change to your desired color
                  },
                  width: 160,
                }}
              >
                Add All To Cart
              </Button>
              <Button
                startDecorator={<ClearIcon />}
                sx={{
                  backgroundColor: "#3F72AF",

                  "&:hover": {
                    backgroundColor: "#112D4E",
                  },
                  "&:hover svg": {
                    // Change the color of the favorite icon when the button is hovered
                    fill: "#BB2525", // Change to your desired color
                  },
                  width: 160,
                }}
                onClick={clearAll}
              >
                Clear All
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography
            sx={{ textAlign: "center", marginTop: 2, fontStyle: "italic" }}
          >
            You don't have any favorite products...
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Favorites;
