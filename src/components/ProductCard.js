import React, { Component } from "react";
import PriceDisplay from "./PriceDisplay";
import shoppingCart from "../icons/white-empty-cart.svg";

export default class ProductCard extends Component {
  // constructor(props) {
  //   super(props);

  // }
  render() {
    const { name, inStock, gallery, prices, id, brand, setSelectedProduct } =
      this.props;
  // se pasa el array con todos los precios del producto:
    const handleClick = (e) => setSelectedProduct(e.target.id);
    // const botoncito = e => console.log(e.target)
    return (
      <div className="product-card" id={`${id}`} onClick={handleClick}>
        <div className="product-card-position-relative">
          <div
            style={{
              backgroundImage: `url(${gallery[0]})`,
            }}
            className={`product-card-img ${
              !inStock && "out-of-stock-image" 
            }`}
            // src={gallery[0]}
            alt={name}
          >
            {!inStock && (
              <div className="out-of-stock-text">OUT OF STOCK</div>
            )}
            <button className="product-card-add-to-cart">
              <img src={shoppingCart} alt="shopping cart" />
            </button>
          </div>
        </div>
        <p className="product-card-name">{`${brand} ${name}`}</p>
        <PriceDisplay prices={prices} className="product-card-price" />
      </div>
    );
  }
}
