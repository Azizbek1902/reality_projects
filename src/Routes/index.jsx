import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../views/shop/Home";
import Products from "../views/productCrud/Products";
import Cart from "../views/shop/Cart";
import AddProd from "../views/productCrud/AddProd";
import Navbar from "../components/Navbar";

export default () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AddProd />} />
      </Routes>
    </div>
  );
};
