import React from "react";

import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/joy/Button";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Divider from "@mui/material/Divider";

import Products from "../Product-Page/Products";
import { useState, useEffect } from "react";
import {
  ref,
  set,
  onValue,
  remove,
  push,
  get,
  update,
} from "firebase/database";
import db, { auth } from "../../database/firebase";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const user = auth.currentUser;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const dbCart = ref(db, `users/${user.uid}/cart`);
      onValue(dbCart, (snapshot) => {
        const cart = [];
        snapshot.forEach((childSnapshot) => {
          const cartItem = childSnapshot.val();
          cart.push(cartItem);
        });
        setCart(cart);
      });
    }
  }, [user]);

  const totalPrice = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const clearAll = () => {
    if (user) {
      const dbCart = ref(db, `users/${user.uid}/cart`);
      remove(dbCart);
    }
    setCart([]);
  };

  const currentDate = new Date();
  const orderDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  // REDO THIS
  const placeOrder = () => {
    if (user) {
      const dbOrders = ref(db, `users/${user.uid}/myOrders`);
      const newOrderRef = push(dbOrders);

      // const orderItems = cart.map((item) => ({
      //   ...item,
      // }))

      const orderItems = cart.reduce((acc, item) => {
        acc[item.id] = {
          ...item,
        };
        return acc;
      }, {});

      // ADD QUANTITY FUNCTION

      cart.forEach((item) => {
        const productRef = ref(db, `products/${item.category}/${item.id}`);
        get(productRef).then((snapshot) => {
          const currentStock = snapshot.val().stock;
          if (currentStock > 0) {
            update(productRef, {
              stock: currentStock - 1,
            });
          }
        });
      });

      const newOrderKey = newOrderRef.key;
      const newOrderPath = `users/${user.uid}/myOrders/${newOrderKey}`;

      set(ref(db, newOrderPath), {
        orderItems,
        totalPrice,
        orderDate: orderDate,
      });

      clearAll();
    }
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
        CART
      </Typography>
      <Divider />
      <Box>
        {cart.length > 0 ? (
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
                marginBottom: 2,
              }}
            >
              {cart.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
                >
                  <Products item={item} />
                  <div>test</div>
                </ListItem>
              ))}
            </Box>
            <h3 style={{ textAlign: "center" }}>Total Price: {totalPrice}$</h3>
            <Box
              textAlign="center"
              sx={{ display: "flex", justifyContent: "center", gap: "8px" }}
            >
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
              <Button
                startDecorator={<ShoppingCartCheckoutIcon />}
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
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography
            sx={{ textAlign: "center", marginTop: 2, fontStyle: "italic" }}
          >
            Your cart is empty...
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Cart;
