import React from "react";

import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/joy/Button";
import ClearIcon from "@mui/icons-material/Clear";

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
        id="basic-list-demo"
        level="body3"
        textTransform="uppercase"
        fontWeight="bold"
        textAlign="center"
        fontSize="lg"
      >
        Favorite Products
      </Typography>
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
    </Box>
  );
};

export default Favorites;
