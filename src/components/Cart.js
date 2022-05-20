import React, { Component } from "react";
import CartContent from "./CartContent";
import { connect } from "react-redux";
import { totalPriceDisplay } from "../helpers/totalPrice";
import { totalProductsCount } from "../helpers/totalProductsCount";

class Cart extends Component {
  render() {
    const { cart, currency } = this.props;
    const totalPrice = totalPriceDisplay(currency, cart);
    const roundTotal = (total) => Math.ceil(total * 100) / 100;
    return (
      <div className={`${this.props.cart.overlayOpen && "overlay"}`}>
        <div className="container">
          <h1 className="overlay-titles">CART</h1>
          <hr />
          {cart.cartItems.map((cartItem) => (
            <CartContent hr={true} key={cartItem.key} {...cartItem} />
          ))}
          <div>
            <div className="cart-container">
              <p className="cart-tax-qty-text">
                Tax:{" "}
                <span style={{ fontWeight: 700 }}>
                  {`${currency.selectedCurrency}${roundTotal(
                    totalPrice * 0.075
                  )}`}
                </span>
              </p>
              <p className="cart-tax-qty-text">
                Qty:{" "}
                <span style={{ fontWeight: 700 }}>
                  {totalProductsCount(cart)}
                </span>
              </p>
              <div className="cart-total-flex">
                <p className="cart-total-text">Total:</p>
                <span
                  style={{ fontWeight: 700 }}
                >{`${currency.selectedCurrency}${totalPrice}`}</span>
              </div>
            </div>
            <button
              className="wide-solid-btn"
              style={{ minWidth: "250px", marginBottom: "10px" }}
            >
              ORDER
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.currency,
  };
};
export default connect(mapStateToProps)(Cart);
