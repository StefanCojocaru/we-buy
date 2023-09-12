import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Products from "./Products";
import db from "../../database/firebase";

import { ref, onValue } from "firebase/database";
import Divider from "@mui/material/Divider";

const ProductList = ({ category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dbProducts = ref(db, `products/${category}`);
    onValue(dbProducts, (snapshot) => {
      const products = snapshot.val();
      setData(Object.values(products));
    });
  }, [category]);

  return (
    <div
      style={{
        width: "1200px",
      }}
    >
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      <Divider />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
        }}
      >
        {data.map((item) => (
          <Products key={item.id} item={item} category={category} />
        ))}
      </Box>
    </div>
  );
};

export default ProductList;
