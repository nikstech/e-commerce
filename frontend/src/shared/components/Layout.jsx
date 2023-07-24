import React from "react";
import LoginSignUpModal from "../modals/LoginSignUpModal";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1 }}>
        <Navbar />
        <>{children}</>
        <LoginSignUpModal />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
