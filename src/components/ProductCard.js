import React, { Component } from "react";
import PriceDisplay from "./PriceDisplay";
import shoppingCart from "../icons/white-empty-cart.svg";
import { connect } from "react-redux";
import { addNewProduct, addItem } from "../slices/cartSlice";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.state = {
      addToCartError: false,
    };
  }

  componentDidUpdate() {
    if (this.state.addToCartError) {
      this.turnOffErrorTimeout = setTimeout(() => {
        this.setState(() => ({ addToCartError: false }));
      }, 2500);
    }
  }

  handleAddToCart = (e) => {
    if (this.props.attributes.length > 0 || !this.props.inStock) {
      return this.setState((state) => ({
        ...state,
        addToCartError: true,
      }));
    }
    if (
      this.props.cart.cartItems.find(
        (cartItem) => cartItem.productId === this.props.id
      )
    ) {
      return this.props.addItem({
        productId: this.props.id,
        selectedOptions: [],
      });
    }
    this.props.addNewProduct({
      productId: this.props.id,
      quantity: 1,
      selectedOptions: [],
      key: this.props.id,
      prices: this.props.prices,
    });
  };

  render() {
    const { name, inStock, gallery, prices, id, brand, setSelectedProduct } =
      this.props;
    const handleClick = (e) => setSelectedProduct(e.target.id);

    return (
      <div className="product-card" id={`${id}`} onClick={handleClick}>
        <div className="product-card-position-relative">
          <div
            style={{
              backgroundImage: `url(${gallery[0]})`,
            }}
            className={`product-card-img ${!inStock && "out-of-stock-image"}`}
            alt={name}
          >
            {!inStock && <div className="out-of-stock-text">OUT OF STOCK</div>}
            <button
              onClick={this.handleAddToCart}
              className="product-card-add-to-cart"
            >
              <img src={shoppingCart} alt="shopping cart" />
            </button>
          </div>
        </div>
        <p className="product-card-name">{`${brand} ${name}`}</p>

        {this.state.addToCartError && (
          <p
            style={{
              fontWeight: "300",
              fontSize: "16px",
              marginBottom: "2px",
              color: "red",
            }}
          >
            This product can not be added to cart from this page
          </p>
        )}
        <PriceDisplay prices={prices} className="product-card-price" />
      </div>
    );
  }
}

const mapDispatchToProps = () => {
  return {
    addNewProduct,
    addItem,
  };
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(ProductCard);
