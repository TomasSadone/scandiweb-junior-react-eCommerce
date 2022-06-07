import React, { Component } from "react";
import CartContent from "./CartContent";
import { connect } from "react-redux";
import { totalPriceDisplay } from "../helpers/totalPrice";
import { totalProductsCount } from "../helpers/totalProductsCount";
import PropTypes from 'prop-types';

class Cart extends Component {
  roundTax = (total) => {
    const tax = total * 0.075;
    return Math.ceil(tax * 100) / 100;
  };
  renderCartContent = (cartItem) => (
    <CartContent hr={true} key={cartItem.key} {...cartItem} />
  );
  render() {
    const { cart, currency } = this.props;
    const totalPrice = totalPriceDisplay(currency, cart);
    return (
      <div className={`${this.props.cart.overlayOpen && "overlay"}`}>
        <div className="container">
          <h1 className="overlay-titles">CART</h1>
          <hr />
          {cart.cartItems.map(this.renderCartContent)}
          <div>
            <div className="cart-container">
              <p className="cart-tax-qty-text">
                Tax:{" "}
                <span>
                  {`${currency.selectedCurrency}${this.roundTax(totalPrice)}`}
                </span>
              </p>
              <p className="cart-tax-qty-text">
                Qty: <span>{totalProductsCount(cart)}</span>
              </p>
              <div className="cart-total-flex">
                <p className="cart-total-text">Total:</p>
                <span>{`${currency.selectedCurrency}${totalPrice}`}</span>
              </div>
            </div>
            <button className="wide-solid-btn cart-order-btn">ORDER</button>
          </div>
        </div>
      </div>
    );
  }
}

 Cart.propTypes = {
   cart: PropTypes.shape({
     cartItems: PropTypes.array,
     overlayOpen: PropTypes.bool
   }),
   currency: PropTypes.shape({
     selectedCurrency: PropTypes.string
   })
 }

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.currency,
  };
};
export default connect(mapStateToProps)(Cart);
