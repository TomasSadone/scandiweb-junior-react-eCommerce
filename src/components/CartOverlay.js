import React, { Component } from "react";
import { connect } from "react-redux";
import { totalProductsCount } from "../helpers/totalProductsCount";
import cartIcon from "../icons/black-empty-cart.svg";
import CartContent from "./CartContent";
import { toggleOverlay } from "../slices/cartSlice";
import { totalPriceDisplay } from "../helpers/totalPrice";
import { useNavigate } from "react-router-dom";

function cartOverlayListWithParams(CartOverlay) {
  return (props) => <CartOverlay {...props} navigation={useNavigate()} />;
}

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.dropDownMenu = React.createRef();
    this.dropDownButton = React.createRef();
    this.viewCart = React.createRef();

    this.state = {
      isOpen: false,
    };
  }

  handleClickOutside(event) {
    if (
      !this.dropDownButton.current.contains(event.target) &&
      !this.dropDownMenu.current.contains(event.target)
    ) {
      this.props.toggleOverlay(false);
    }
    if (this.viewCart.current.contains(event.target)) {
      this.props.navigation("/cart");
      this.props.toggleOverlay(false);
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const { cart, currency, toggleOverlay } = this.props;
    const setIsOpen = () => {
      toggleOverlay(!cart.overlayOpen);
    };
    const totalPrice = totalPriceDisplay(currency, cart);

    return (
      <>
        <li className="dropdown">
          <div
            className="dropdown-button"
            onClick={setIsOpen}
            ref={this.dropDownButton}
          >
            <img src={cartIcon} alt="arrow" />
            {totalProductsCount(cart) > 0 && (
              <p id="cart-icon-counter">{totalProductsCount(cart)}</p>
            )}
          </div>

          <div
            ref={this.dropDownMenu}
            style={{ boxShadow: "none" }}
            className={`cart-overlay-content-box dropdown-menu ${
              cart.overlayOpen && "dropdown-menu-isOpen"
            }`}
          >
            <div className="cart-overlay-content-container">
              <p className="my-bag">
                My bag,{" "}
                <span className="cart-overlay-items-count">
                  {totalProductsCount(cart)} items
                </span>
              </p>
              {cart.cartItems.map((cartItem) => (
                <CartContent
                  hr={false}
                  key={cartItem.key}
                  className={"cart-overlay"}
                  {...cartItem}
                />
              ))}
              <div className="cart-overlay-flex cart-overlay-total">
                <p>Total</p>
                <p>{`${currency.selectedCurrency}${totalPrice}`}</p>
              </div>
              <div className="cart-overlay-flex">
                <button
                  className="wide-solid-btn view-bag  cart-overlay-button"
                  ref={this.viewCart}
                >
                  VIEW BAG
                </button>
                <button className="wide-solid-btn cart-overlay-button">
                  CHECK OUT
                </button>
              </div>
            </div>
          </div>
        </li>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.currency,
  };
};
const mapDispatchToProps = () => {
  return {
    toggleOverlay,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(cartOverlayListWithParams(CartOverlay));
