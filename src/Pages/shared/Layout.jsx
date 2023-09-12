import React from "react";
import { Outlet } from "react-router-dom";
import AuxHeader from "./components/AuxHeader";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Header />
      </header>
      <section
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AuxHeader />

        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default Layout;
