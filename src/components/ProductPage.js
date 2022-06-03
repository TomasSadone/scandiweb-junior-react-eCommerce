import React, { Component } from "react";
import { connect } from "react-redux";
import PriceDisplay from "./PriceDisplay";
import arrow from "../icons/arrow.svg";
import OptionsSelector from "./OptionsSelector";
import { addNewProduct, addItem } from "../slices/cartSlice";
import parse from "html-react-parser";
import routerHOC from "../helpers/routerHOC";
import { productListData } from "../helpers/productPageData";
import { isArrayEqual } from "../helpers/isArrayEqual";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.setSelectedOption = this.setSelectedOption.bind(this);
    this.replaceSelectedOption = this.replaceSelectedOption.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.divInnerHTML = React.createRef();
    this.state = {
      loading: true,
      selectedOptions: [],
      addToCartError: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    productListData(id).then((data) => {
      this.setState((state) => ({
        ...state,
        productInfo: data.product,
        loading: false,
        selectedImage: data.product.gallery[0],
      }));
    });
  }

  /* --  HANDLING SELECTING OPTIONS  --  */

  setSelectedOption = (name, id, i) => {
    if (
      this.state.selectedOptions.find(
        (selectedOption) => selectedOption.name === name
      )
    ) {
      return this.replaceSelectedOption(name, id);
    }
    this.setState((state) => ({
      ...state,
      selectedOptions: [
        ...this.state.selectedOptions,
        {
          name: name,
          displayValue: id,
        },
      ],
    }));
  };

  replaceSelectedOption = (name, id) => {
    let newSelectedOption = this.state.selectedOptions.filter(
      (selectedOption) => selectedOption.name !== name
    );
    newSelectedOption.push({
      name: name,
      displayValue: id,
    });
    this.setState((state) => ({
      ...state,
      selectedOptions: newSelectedOption,
    }));
  };

  /* --  HANDLING ADDING TO CART  --  */

  createCartItemKey = () => {
    const { selectedOptions } = this.state;
    let key = this.props.params.id;
    for (let i = 0; i < selectedOptions.length; i++) {
      key += selectedOptions[i].displayValue;
    }
    return key;
  };

  isExistingProduct = (cartItem) => {
    if (
      isArrayEqual(cartItem.selectedOptions, this.product().selectedOptions) &&
      cartItem.productId === this.product().productId
    )
      return true;
  };

  product = () => ({
    productId: this.props.params.id,
    quantity: 1,
    selectedOptions: this.state.selectedOptions,
    key: this.createCartItemKey(),
    prices: this.state.productInfo.prices,
  });

  addToCart = () => {
    const { selectedOptions, productInfo } = this.state;
    const { addItem, addNewProduct, cart } = this.props;

    if (selectedOptions.length < productInfo.attributes.length) {
      return this.addToCartError(true);
    }
    if (cart.cartItems.find((cartItem) => this.isExistingProduct(cartItem))) {
      addItem({
        productId: this.product().productId,
        selectedOptions: this.product().selectedOptions,
      });
      return this.addToCartError(false);
    }
    addNewProduct(this.product());
    this.addToCartError(false);
  };

  addToCartError = (boolean) =>
    this.setState((state) => ({
      ...state,
      addToCartError: boolean,
    }));

  /* --  HANDLING SELECTED IMAGE  --  */

  setSelectedImage = ({ target }) => {
    this.setState((state) => ({
      ...state,
      selectedImage: target.id,
    }));
  };

  /* --  CONDITIONAL & MAPS RENDERINGS  --  */

  renderLoading = () => (
    <div className="product-page-loader-flex">
      <div className="product-page-loader"></div>
    </div>
  );
  renderGallery = (image) => (
    <div
      id={image}
      key={image}
      onClick={this.setSelectedImage}
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="img-carousel"
      alt={"product"}
    />
  );

  renderGalleryArrow = (gallery) => {
    if (gallery.length > 4)
      return <img className="arrow" src={arrow} alt="arrow" />;
  };
  renderOutOfStockText = (inStock) => {
    if (!inStock) return <div className="out-of-stock-text">OUT OF STOCK</div>;
  };
  displayAddToCartError = (err) => {
    if (err)
      return (
        <p className="product-page-error-msg">You must select every option</p>
      );
  };
  
  render() {
    const {
      addToCartError,
      loading,
      productInfo,
      selectedImage,
      selectedOptions,
    } = this.state;
    const { description, name, gallery, inStock, brand, attributes, prices } =
      productInfo || {};

    return (
      <>
        {loading ? (
          this.renderLoading()
        ) : (
          <div className={`${this.props.cart.overlayOpen && "overlay"}`}>
            <div className="container">
              <div className="product-page-flex-container">
                <div className="arrow-carousel">
                  <div className="img-carousel-container hidden-scrollbar">
                    {gallery.map(this.renderGallery)}
                  </div>
                  {this.renderGalleryArrow(gallery)}
                </div>
                <div className="product-page-main-image-container">
                  <div className={`${!inStock && "out-of-stock-pdp-image"}`}>
                    <img
                      className="product-page-main-image "
                      src={selectedImage}
                      alt="product"
                    />
                    {this.renderOutOfStockText(inStock)}
                  </div>
                </div>
                <div className="product-page-info-column hidden-scrollbar">
                  <header>
                    <h1 id="brand">{brand}</h1>
                    <h2 id="name">{name}</h2>
                  </header>
                  <OptionsSelector
                    attributes={attributes}
                    setSelectedOption={this.setSelectedOption}
                    selectedOptions={selectedOptions}
                    disabled={!inStock}
                  />
                  <div>
                    <h3>PRICE:</h3>
                    <PriceDisplay
                      className="product-page-price"
                      prices={prices}
                    />
                  </div>
                  {this.displayAddToCartError(addToCartError)}
                  <button
                    id="add-to-cart"
                    className="wide-solid-btn"
                    onClick={this.addToCart}
                    disabled={!inStock}
                  >
                    ADD TO CART
                  </button>
                  <div>{parse(description)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = () => {
  return {
    addNewProduct,
    addItem,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(routerHOC(ProductPage));
