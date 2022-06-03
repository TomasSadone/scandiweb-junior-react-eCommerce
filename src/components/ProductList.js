import React, { Component } from "react";
import { connect } from "react-redux";
import routerHOC from "../helpers/routerHOC";
import ProductCard from "./ProductCard";
import { productListData } from "../helpers/productListData";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.setSelectedProduct = this.setSelectedProduct.bind(this);
    this.getDataWithCategory = this.getDataWithCategory.bind(this);

    this.state = {
      category: {
        products: [],
      },
      selectedProduct: "",
    };
  }
  setSelectedProduct = (selectedProduct) => {
    this.setState({ selectedProduct: selectedProduct });
  };

  getDataWithCategory = (category) => {
    productListData(category).then((data) => {
      this.setState((state) => ({
        ...state,
        category: { products: data.category.products },
      }));
    });
  };

  componentDidMount() {
    const { category } = this.props.params;
    this.getDataWithCategory(category);
  }

  componentDidUpdate(prevProps, prevState) {
    const { category } = this.props.params;
    const { navigation } = this.props;
    if (this.props.params !== prevProps.params) {
      this.getDataWithCategory(category);
    }
    if (this.state.selectedProduct !== prevState.selectedProduct) {
      navigation(`${this.state.selectedProduct}`);
    }
  }

  renderProductCard = (product) => (
    <ProductCard
      setSelectedProduct={this.setSelectedProduct}
      key={product.name}
      {...product}
    />
  );

  render() {
    const { category } = this.props.params;
    const { products } = this.state.category;

    return (
      <div className={`${this.props.cart.overlayOpen && "overlay"}`}>
        <div className="container">
          <h1 className="overlay-titles" id="display-category">
            {category}
          </h1>
          <div className="product-cards-container">
            {products.map(this.renderProductCard)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(routerHOC(ProductList));
