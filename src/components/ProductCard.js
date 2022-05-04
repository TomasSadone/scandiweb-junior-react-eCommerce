import React, { Component } from "react";
import { displayPrice } from "../helpers/displayPrice";
import shoppingCart from "../icons/white-empty-cart.svg";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPrice,
    };
  }
  render() {
    const { name, inStock, gallery, prices, id, brand, setSelectedProduct } =
      this.props;
    // se pasa el array con todos los precios del producto:
    // const displayPrice = (prices) => {if(!localStorage.getItem("selectedCurrency")){
    //   return prices[0].currency.symbol + prices[0].amount
    // } else {
    //   const getCurrency = prices.find(price => price.currency.symbol === localStorage.getItem("selectedCurrency"))
    //   return getCurrency.currency.symbol + getCurrency.amount
    // }}
    const handleClick = (e) => setSelectedProduct(e.target.id);
    // const botoncito = e => console.log(e.target)
    return (
      //como el ckick pasa cosas distintas segun donde haces
      //se puede ponerle el id a todo, si on ver la otra solucion del link
      <div className="product-card" id={`${id}`} onClick={handleClick}>
        <div className="position-relative">
          <div
            style={{
              backgroundImage: `url(${gallery[0]})`,
            }}
            className={`product-card-img ${
              !inStock ? "out-of-stock-image" : ""
            }`}
            // src={gallery[0]}
            alt={name}
          >
            {inStock !== true && (
              <div className="out-of-stock-text">OUT OF STOCK</div>
            )}
            <button className="product-card-add-to-cart">
              <img src={shoppingCart} alt="shopping-cart" />
            </button>
          </div>
        </div>
        <p className="product-card-name">{`${brand} ${name}`}</p>
        <p className="product-card-price">
          {/* Terminar de hacer esto, creo que cuando termine no se va a actualizar solo
          cuando cambie la currency y va a estar mal */}
          {displayPrice(prices)}
        </p>
      </div>
    );
  }
}
