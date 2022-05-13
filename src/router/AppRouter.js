import React, { Component } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import ProductPage from "../components/ProductPage";


export default class AppRouter extends Component {
  render() {
    const category = localStorage.getItem('category')
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* si algo no esta andando cambiar * por / */}
            <Route path="*" element={<Navigate to={`/${category}`} />} />
            <Route exact path="/:category" element={<ProductList />} />
            <Route exact path="/:category/:id" element={<ProductPage />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
