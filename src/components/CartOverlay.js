import React, { Component } from "react";
import { connect } from "react-redux";
import { totalProductsCount } from "../helpers/totalProductsCount";
import cartIcon from "../icons/black-empty-cart.svg";
import CartContent from "./CartContent";
import { toggleOverlay } from "../slices/cartSlice";
import { totalPriceDisplay } from "../helpers/totalPrice";
import routerHOC from "../helpers/routerHOC";
import PropTypes from "prop-types";

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

  setIsOpen = () => {
    const { toggleOverlay, cart } = this.props;
    toggleOverlay(!cart.overlayOpen);
  };

  displayItemCount = () => {
    const { cart } = this.props;
    if (totalProductsCount(cart) > 0) {
      return <p id="cart-icon-counter">{totalProductsCount(cart)}</p>;
    }
  };

  renderCartContent = (cartItem) => (
    <CartContent
      hr={false}
      key={cartItem.key}
      className={"cart-overlay"}
      {...cartItem}
    />
  );

  classNameDropDownMenuOpen = () => {
    if (this.props.cart.overlayOpen) return "dropdown-menu-isOpen";
  };

  render() {
    const { cart, currency } = this.props;
    const totalPrice = totalPriceDisplay(currency, cart);

    return (
      <>
        <li className="dropdown">
          <div
            className="dropdown-button"
            onClick={this.setIsOpen}
            ref={this.dropDownButton}
          >
            <img src={cartIcon} alt="arrow" />
            {this.displayItemCount()}
          </div>

          <div
            ref={this.dropDownMenu}
            className={`cart-overlay-content-box dropdown-menu ${this.classNameDropDownMenuOpen()}`}
          >
            <div className="cart-overlay-content-container">
              <p className="my-bag">
                My bag,{" "}
                <span className="cart-overlay-items-count">
                  {totalProductsCount(cart)} items
                </span>
              </p>

              {cart.cartItems.map(this.renderCartContent)}

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

CartOverlay.propTypes = {
  toggleOverlay: PropTypes.func,
  navigation: PropTypes.func,
  cart: PropTypes.shape({
    cartItems: PropTypes.array,
    overlayOpen: PropTypes.bool
  }),
  currency: PropTypes.shape({
    selectedCurrency: PropTypes.string,
  }),
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
)(routerHOC(CartOverlay));
