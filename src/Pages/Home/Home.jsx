import React from "react";
import Products from "../Product-Page/Products";
import Box from "@mui/joy/Box";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import db from "../../database/firebase";
import Divider from "@mui/material/Divider";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, "products");
    onValue(dbRef, (snapshot) => {
      const categories = snapshot.val();
      const products = [];
      for (const categoryKey in categories) {
        const category = categories[categoryKey];
        for (const productKey in category) {
          const product = category[productKey];
          products.push(product);
        }
      }
      setProducts(products);
    });
  }, []);

  return (
    <div className="content" style={{ width: "1200px" }}>
      <h2>All Products</h2>
      <Divider />
      <Box
        sx={{
          // display: "flex",
          // flexWrap: "wrap",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
        }}
      >
        {products.map((product) => (
          <Products key={product.id} item={product} />
        ))}
      </Box>
    </div>
  );
};

export default Home;
