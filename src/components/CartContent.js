import React, { Component } from "react";
import { connect } from "react-redux";
import { removeItem, addItem, removeProduct } from "../slices/cartSlice";
import OptionsSelector from "./OptionsSelector";
import PriceDisplay from "./PriceDisplay";
import leftArrow from "../icons/left-arrow.svg";
import rightArrow from "../icons/right-arrow.svg";
import { CartContentData } from "../helpers/cartContentData";
import PropTypes from "prop-types";

class CartContent extends Component {
  constructor(props) {
    super(props);
    this.nextImage = this.nextImage.bind(this);
    this.noNextImage = this.noNextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.noPrevImage = this.noPrevImage.bind(this);
    this.state = {
      loading: true,
      productInfo: {},
    };
  }

  componentDidMount() {
    const id = this.props.productId;
    CartContentData(id).then((data) => {
      this.setState((state) => ({
        ...state,
        productInfo: data.product,
        loading: false,
        selectedImage: 0,
      }));
    });
  }
  nextImage = () => {
    const { selectedImage, productInfo } = this.state;
    const { gallery } = productInfo;
    if (selectedImage === gallery.length - 1) {
      return this.noNextImage();
    }
    return this.setState((state) => ({
      ...state,
      selectedImage: state.selectedImage + 1,
    }));
  };
  noNextImage = () => {
    this.setState((state) => ({
      ...state,
      selectedImage: 0,
    }));
  };

  prevImage = () => {
    const { selectedImage, productInfo } = this.state;
    const { gallery } = productInfo;
    if (selectedImage === 0) {
      return this.noPrevImage(gallery.length - 1);
    }
    this.setState((state) => ({
      ...state,
      selectedImage: state.selectedImage - 1,
    }));
  };
  noPrevImage = (n) => {
    this.setState((state) => ({
      ...state,
      selectedImage: n,
    }));
  };

  handleRemoveItem = () => {
    const { productId, selectedOptions, quantity, removeItem, removeProduct } =
      this.props;
    const payload = {
      productId,
      selectedOptions,
    };
    quantity === 1 ? removeProduct(payload) : removeItem(payload);
  };

  renderNavArrows = () => {
    if (this.state.productInfo.gallery.length > 1) {
      return (
        <div className={`cart-element-carousel-arrow `}>
          <img
            onClick={() => this.prevImage()}
            src={leftArrow}
            alt="left arrow"
          />
          <img
            onClick={() => this.nextImage()}
            src={rightArrow}
            alt="right arrow"
          />
        </div>
      );
    }
  };

  classNameCartOverlay = () => {
    if (this.props.className === "cart-overlay") return "cart-overlay";
  };
  render() {
    const { selectedOptions, currency, hr, addItem, quantity, productId } =
      this.props;
    const { loading, productInfo, selectedImage } = this.state;
    const { name, gallery, brand, attributes, prices } = productInfo;
    return (
      <>
        {loading ? (
          <div className="product-page-loader p-p-l-cart-content"></div>
        ) : (
          <>
            <div className={`cart-element ${this.classNameCartOverlay()}`}>
              <div className={`cart-element-info `}>
                <h1 className={`cart-element-title `}>{brand}</h1>
                <h2 className={`cart-element-subtitle `}>{name}</h2>
                <PriceDisplay
                  prices={prices}
                  currency={currency}
                  className={"cart-element-price"}
                />
                <OptionsSelector
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
                        selectedOptions,
                      })
                    }
                  >
                    +
                  </button>
                  <p>{quantity}</p>
                  <button
                    className={`cart-element-add-substract `}
                    onClick={this.handleRemoveItem}
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
                  {this.renderNavArrows()}
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

CartContent.propTypes = {
  selectedOptions: PropTypes.arrayOf(PropTypes.object),
  currency: PropTypes.shape({
    selectedCurrency: PropTypes.string,
  }),
  hr: PropTypes.bool,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
  removeProduct: PropTypes.func,
  quantity: PropTypes.number,
  productId: PropTypes.string,
  className: PropTypes.oneOf(['cart-overlay'])
};

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
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
