import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "src/pages/home";
import AdminDashbaord from "../pages/admin/dashboard/";
import Categories from "../pages/admin/categories/";
import Products from "../pages/admin/products/";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/dashboard" element={<AdminDashbaord />} />
        <Route path="/admin/dashboard/categories" element={<Categories />} />
        <Route path="/admin/dashboard/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
