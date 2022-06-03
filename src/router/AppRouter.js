import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import ProductPage from "../components/ProductPage";

class AppRouter extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="*"
              element={<Navigate to={`/${this.props.category.category}`} />}
            />
            <Route exact path="/:category" element={<ProductList />} />
            <Route exact path="/:category/:id" element={<ProductPage />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

export default connect(mapStateToProps)(AppRouter);
