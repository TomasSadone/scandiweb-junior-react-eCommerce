import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../helpers/getData";
import { removeItem, addItem, removeProduct } from "../slices/cartSlice";
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
        selectedImage: 0,
      }));
    });
  }

  render() {
    const {
      selectedOptions,
      currency,
      hr,
      addItem,
      removeItem,
      removeProduct,
      quantity,
      productId,
      className,
    } = this.props;
    const { loading, productInfo, selectedImage } = this.state;
    const { name, gallery, brand, attributes, prices } = productInfo || {};
    const nextImage = () => {
      if (selectedImage === gallery.length - 1) {
        this.setState((state) => ({
          ...state,
          selectedImage: 0,
        }));
        return;
      }
      this.setState((state) => ({
        ...state,
        selectedImage: state.selectedImage + 1,
      }));
    };
    const prevImage = () => {
      if (selectedImage === 0) {
        this.setState((state) => ({
          ...state,
          selectedImage: gallery.length - 1,
        }));
        return;
      }
      this.setState((state) => ({
        ...state,
        selectedImage: state.selectedImage - 1,
      }));
    };
    const handleRemoveItem = () => {
      const payload = {
        productId,
        selectedOptions: selectedOptions,
      };
      quantity === 1 ? removeProduct(payload) : removeItem(payload);
    };
    return (
      <>
        {loading ? (
          <div
            className="product-page-loader"
            style={{ marginTop: "20px" }}
          ></div>
        ) : (
          <>
            {/*si hr es false inline style en cart-element para dar margintop*/}
            <div
              className={`cart-element ${
                className === "cart-overlay" && "cart-overlay"
              }`}
            >
              <div className={`cart-element-info `}>
                <h1 className={`cart-element-title `}>{brand}</h1>
                <h2 className={`cart-element-subtitle `}>{name}</h2>
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
                  setSelectedOption={() => {}}
                />
              </div>
              <div className={`cart-element-image-quantity `}>
                <div className={`cart-element-counter `}>
                  <button
                    className={`cart-element-add-substract `}
                    onClick={() =>
                      addItem({
                        productId,
                        selectedOptions: selectedOptions,
                      })
                    }
                  >
                    +
                  </button>
                  <p>{quantity}</p>
                  <button
                    className={`cart-element-add-substract `}
                    onClick={handleRemoveItem}
                  >
                    -
                  </button>
                </div>
                <div className={`cart-element-image-container `}>
                  <img
                    src={gallery[selectedImage]}
                    alt="product"
                    className={`cart-element-image `}
                  />
                  {gallery.length > 1 && (
                    <div className={`cart-element-carousel-arrow `}>
                      <img
                        onClick={prevImage}
                        src={leftArrow}
                        alt="left arrow"
                      />
                      <img
                        onClick={nextImage}
                        src={rightArrow}
                        alt="right arrow"
                      />
                    </div>
                  )}
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
    // cart: state.cart
  };
};
const mapDispatchToProps = () => {
  return {
    addItem,
    removeItem,
    removeProduct,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(CartContent);
