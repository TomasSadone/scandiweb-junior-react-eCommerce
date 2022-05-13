import React, { Component } from "react";
import CartContent from "./CartContent";
import { connect } from "react-redux";

class Cart extends Component {
  render() {
    const { cart } = this.props;
    console.log(cart.cartItems);
    return (
      <div className="container">
        <h1>CART</h1>
        <hr/>
        {cart.cartItems.map((cartItem) => (
          <CartContent
            hr={true}
            key={cartItem.productId}
            {...cartItem}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
export default connect(mapStateToProps)(Cart);
