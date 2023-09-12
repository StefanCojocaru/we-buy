import React from "react";
import { Routes, Route, useParams } from "react-router-dom";

import Home from "./Pages/Home/Home.jsx";
import Layout from "./Pages/shared/Layout.jsx";
import ProductList from "./Pages/Product-Page/ProductList.jsx";
import MyAccount from "./Pages/My-Account/MyAccount.jsx";
import Favorites from "./Pages/Favorites/Favorites.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import ProductPage from "./Pages/Product-Page/ProductPage.jsx";
import SearchResult from "./Pages/Search/SearchResult.jsx";

import "./style/style.css";
import "./font/stylesheet.css";

import SignIn from "./Pages/Sign/Sign-In/SignIn.jsx";
import SignUp from "./Pages/Sign/Sign-Up/SignUp.jsx";

import SecondaryLayout from "./Pages/shared/SecondaryLayout.jsx";
import { SnackbarProvider } from "notistack";

const App = () => {
  // get category from URL and pass it to <ProductList />
  const ProductsWithCategory = () => {
    const { category } = useParams();
    return <ProductList category={category} />;
  };
  const SearchWithValue = () => {
    const { searchValue } = useParams();
    console.log(searchValue);
    return <SearchResult searchValue={searchValue} />;
  };

  return (
    <div>
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/products/:category"
              element={<ProductsWithCategory />}
            />
          </Route>
          <Route path="/product" element={<SecondaryLayout />}>
            <Route path=":category/:id/:name" element={<ProductPage />} />
          </Route>
          <Route path="/myaccount" element={<SecondaryLayout />}>
            <Route index element={<MyAccount />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="/favorites" element={<SecondaryLayout />}>
            <Route index element={<Favorites />} />
          </Route>
          <Route path="/cart" element={<SecondaryLayout />}>
            <Route index element={<Cart />} />
          </Route>
          <Route path="/search" element={<SecondaryLayout />}>
            <Route path=":searchValue" element={<SearchWithValue />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </div>
  );
};

export default App;
