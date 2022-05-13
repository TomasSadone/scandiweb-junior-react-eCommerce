import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../helpers/getData";
import OptionsSelector from "./OptionsSelector";
import PriceDisplay from "./PriceDisplay";
import leftArrow from "../icons/left-arrow.svg";
import rightArrow from "../icons/right-arrow.svg";

class CartContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const id = this.props.productId;
    getData(
      `
      query getProduct($id:String!){
        product(id: $id){
            name
            gallery
            brand
            prices {
              currency {
                symbol
              }
              amount
            }
            attributes {
              name
              type
              items {
                displayValue
                value
              }
            }
          }
      }
      `,
      { id }
    ).then((data) => {
      this.setState((state) => ({
        ...state,
        productInfo: data.product,
        loading: false,
        selectedImage: data.product.gallery[0],
      }));
    });
  }

  render() {
    const { selectedOptions, currency, hr } = this.props;
    const { loading, productInfo, selectedImage } = this.state;
    const { name, gallery, brand, attributes, prices } = productInfo || {};

    console.log(selectedOptions);
    return (
      <>
        {loading ? (
          <div
            className="product-page-loader"
            style={{ marginTop: "20px" }}
          ></div>
        ) : (
          <>
            <div className="cart-element">
              <div className="cart-element-info">
                <h1 className="cart-element-title">{brand}</h1>
                <h2 className="cart-element-subtitle">{name}</h2>
                <PriceDisplay
                  prices={prices}
                  currency={currency}
                  className={"cart-element-price"}
                />
                <OptionsSelector
                  className={{ isSelectable: "" }}
                  attributes={attributes}
                  selectedOptions={selectedOptions}
                  disabled={true}
                />
              </div>
              <div className="cart-element-image-quantity">
                <div className="cart-element-counter">
                  <button className="cart-element-add-substract">+</button>
                  <p>1</p>
                  <button className="cart-element-add-substract">-</button>
                </div>
                <div
                className="cart-element-image"
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                  }}
                  alt="product"
                >
                  <img src={leftArrow} alt="left arrow" />
                  <img src={rightArrow} alt="right arrow" />
                </div>
              </div>
            </div>
            {hr && <hr />}
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};
export default connect(mapStateToProps)(CartContent);
