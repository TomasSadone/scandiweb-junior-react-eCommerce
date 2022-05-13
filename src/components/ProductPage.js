import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getData } from "../helpers/getData";
import PriceDisplay from "./PriceDisplay";
import arrow from "../icons/arrow.svg";
import OptionsSelector from "./OptionsSelector";
import { addProduct } from "../slices/cartSlice";

function productPageWithParams(ProductList) {
  return (props) => <ProductList {...props} params={useParams()} />;
}

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.setSelectedOption = this.setSelectedOption.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.state = {
      loading: true,
      selectedOptions: [],
      addToCartError: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    console.log(id)
    getData(
      `
      query getProduct($id:String!){
        product(id: $id){
          name
          inStock
          gallery
          brand
          prices{
            currency{
              symbol
            }
            amount
          }
          description
          attributes{
            name
            type
            items{
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

  setSelectedOption = (name, id) => {
    if (
      this.state.selectedOptions.find(
        (selectedOption) => selectedOption.name === name
      )
    ) {
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
      return;
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

  addToCart = () => {
    const { selectedOptions, productInfo } = this.state;
    const { addProduct, params } = this.props;
    if (selectedOptions.length < productInfo.attributes.length) {
      return this.setState((state) => ({
        ...state,
        addToCartError: true,
      }));
    }
    addProduct({
      productId: params.id,
      selectedOptions,
    });
    return this.setState((state) => ({
      ...state,
      addToCartError: false,
    }));
    // console.log("agregado al carrito");
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
    const setSelectedImage = ({ target }) => {
      this.setState((state) => ({
        ...state,
        selectedImage: target.id,
      }));
    };
    return (
      <>
        {loading ? (
          <div className="product-page-loader-flex">
            <div className="product-page-loader"></div>
          </div>
        ) : (
          <div className="container">
            <div className="product-page-flex-container">
              <div className="arrow-carousel">
                <div className="img-carousel-container">
                  {gallery.map((image) => (
                    <div
                      id={image}
                      key={image}
                      onClick={setSelectedImage}
                      style={{
                        backgroundImage: `url(${image})`,
                      }}
                      className="img-carousel"
                      alt={"product"}
                    />
                  ))}
                </div>
                {gallery.length > 4 && (
                  <img className="arrow" src={arrow} alt="arrow" />
                )}
              </div>
              <div className="product-page-main-image-container">
                <img
                  className="product-page-main-image"
                  src={selectedImage}
                  alt="product"
                />
              </div>
              <div className="product-page-info-column">
                <header>
                  <h1 id="brand">{brand}</h1>
                  <h2 id="name">{name}</h2>
                </header>
                <OptionsSelector
                  className={{ isSelectable: "isSelectable" }}
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
                {addToCartError && (
                  <p
                    style={{
                      fontWeight: "500",
                      marginBottom: "10px",
                      color: "red",
                    }}
                  >
                    You must select every option
                  </p>
                )}
                <button
                  id="add-to-cart"
                  className="wide-solid-btn"
                  onClick={this.addToCart}
                  disabled={!inStock}
                >
                  ADD TO CART
                </button>
                {!inStock && (
                  <span style={{ fontWeight: "600" }}>
                    This product is out of stock
                  </span>
                )}
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     currency: state.currency,
//   };
// };
const mapDispatchToProps = () => {
  return {
    addProduct,
  };
};

export default connect(
  null,
  // mapStateToProps,
  mapDispatchToProps()
)(productPageWithParams(ProductPage));

// export default productPageWithParams(ProductPage);
