import React, { useState, useEffect } from "react";
import Products from "../Product-Page/Products";
import db from "../../database/firebase";
import { ref, onValue, get, set } from "firebase/database";
import Box from "@mui/joy/Box";

const SearchResult = ({ searchValue }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, "products");
    onValue(dbRef, (snapshot) => {
      const categories = snapshot.val();
      const matchingProducts = [];
      for (const categoryKey in categories) {
        const category = categories[categoryKey];
        for (const productKey in category) {
          const product = category[productKey];
          if (
            product &&
            (product.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
              product.brand
                ?.toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              product.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
              product.author
                ?.toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              product.description
                ?.toLowerCase()
                .includes(searchValue.toLowerCase()))
          ) {
            matchingProducts.push(product);
          }
        }
      }
      setProducts(matchingProducts);
    });
  }, [searchValue]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div
      style={{
        width: "1200px",
      }}
    >
      {products.length ? (
        <>
          <h2>Search results for "{searchValue}"</h2>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
            }}
          >
            {products.map((product) => (
              <Products key={product.id} item={product} />
            ))}
          </Box>
        </>
      ) : (
        <h2>We couldn't find anything about "{searchValue}"</h2>
      )}
    </div>
  );
};

export default SearchResult;
