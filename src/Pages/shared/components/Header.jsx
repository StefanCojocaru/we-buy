import React, { useState, useEffect } from "react";

import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AspectRatio from "@mui/joy/AspectRatio";
import Badge from "@mui/material/Badge";

import logo from "../../../logo/logo.svg";

import { Link } from "react-router-dom";
import { auth } from "../../../database/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { ref, onValue, remove } from "firebase/database";
import db from "../../../database/firebase";

const Header = () => {
  // SEARCH BAR !!
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSearch = () => {
    console.log(searchValue);
    if (searchValue) {
      navigate(`/search/${searchValue}`);
    } else {
      // Do nothing if search value is empty
    }
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const [favorites, setFavorites] = useState([]);

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

  const [cart, setCart] = useState([]);
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
  const numCart = cart.length;
  console.log(numCart);

  const [opacity, setOpacity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [marginTop, setMarginTop] = useState(10);

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      // Calculate the scroll position (you can adjust the threshold as needed)
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // Calculate the new opacity based on the scroll position
      const newOpacity = Math.max(0.5, 1 - scrollY / 50); // Adjust the threshold (200) and minimum opacity (0.5) as needed
      const newMarginTop = scrollY >= 50 ? 0 : 10;
      setMarginTop(newMarginTop);

      // Update the opacity state
      setOpacity(newOpacity);
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={2}
      alignItems="center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: "1200px",
        // backgroundColor: "rgba(255, 255, 255, 1)",
        backgroundColor: "rgb(219, 226, 239,1)",
        borderTop: "1px solid rgba(128, 128, 128, 0.3)",
        borderBottom: "1px solid rgba(128, 128, 128, 0.3)",
        borderRight: "1px solid rgba(128, 128, 128, 0.3)",
        borderLeft: "1px solid rgba(128, 128, 128, 0.3)",
        borderRadius: 20,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        opacity: isHovered ? 1 : opacity,
        marginTop: `${marginTop}px`,

        transition: "opacity 0.3s ease, margin-top 0.3s ease",
      }}
    >
      <Link to="/">
        <img
          src={logo}
          style={{
            width: "200px",
          }}
        />
      </Link>
      <Stack direction="row">
        <Input
          placeholder="What are you looking for?"
          style={{ width: "500px" }}
          value={searchValue}
          onChange={handleInputChange}
          sx={{
            fontFamily: "apercu_proregular",
            fontStyle: "italic",
            "--Input-focusedHighlight": "#3F72AF",
          }}
        />
        <IconButton variant="none" onClick={handleSearch}>
          <SearchIcon
            sx={{
              color: "#000",
            }}
          />
        </IconButton>
      </Stack>
      <Link to={user ? "/myaccount" : "/myaccount/signin"}>
        <Button
          startDecorator={<PersonIcon />}
          sx={{
            fontFamily: "apercu_proregular",
            fontWeight: "normal",
            backgroundColor: "#3F72AF",
            "&:hover": {
              backgroundColor: "#112D4E", // Change to the desired hover color
            },
          }}
        >
          {user ? "My Account" : "Sign In"}
        </Button>
      </Link>
      <Link to={user ? "/favorites" : "/myaccount/signin"}>
        <Button
          startDecorator={
            <Badge badgeContent={numFavorites} size="sm" color="primary">
              <FavoriteIcon />
            </Badge>
          }
          sx={{
            fontFamily: "apercu_proregular",
            fontWeight: "normal",
            backgroundColor: "#3F72AF",
            "&:hover": {
              backgroundColor: "#112D4E", // Change to the desired hover color
            },
          }}
        >
          Favorites
        </Button>
      </Link>
      <Link to={user ? "/cart" : "/myaccount/signin"}>
        <Button
          startDecorator={
            <Badge badgeContent={numCart} size="sm" color="primary">
              <ShoppingCartIcon />
            </Badge>
          }
          sx={{
            fontFamily: "apercu_proregular",
            fontWeight: "normal",
            backgroundColor: "#3F72AF",
            "&:hover": {
              backgroundColor: "#112D4E", // Change to the desired hover color
            },
          }}
        >
          Cart
        </Button>
      </Link>
      {!isHovered && opacity === 0.5 && (
        <div
          style={{
            position: "absolute",
            width: "1200px",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(4px)",
            transition: "backdrop-filter 0.3s",
          }}
        />
      )}
    </Stack>
  );
};

export default Header;
