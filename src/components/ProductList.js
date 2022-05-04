import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "../helpers/getData";
import ProductCard from "./ProductCard";

function productListWithParams(ProductList) {
  return (props) => (
    <ProductList {...props} navigation={useNavigate()} params={useParams()} />
  );
}

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.setSelectedProduct = this.setSelectedProduct.bind(this);

    this.state = {
      category: {
        products: [],
      },
      selectedProduct: "",
      getDataWithCategory: (category) =>
        getData(
          `
            query getCategories($title:String!){
                category(input: {title:$title}){
                    products{
                    name
                    inStock
                    gallery
                    id
                    brand
                    prices{
                        currency{
                            label
                            symbol
                        }
                        amount
                    }

                    }
                }
                }`,
          { title: `${category}` }
        ).then((data) => {
          this.setState((state) => ({
            ...state,
            category: { products: data.category.products },
          }));
        }),
    };
  }
  setSelectedProduct = (selectedProduct) => {
    this.setState({ selectedProduct: selectedProduct });
  };
  componentDidMount() {
    const { category } = this.props.params;
    const { getDataWithCategory } = this.state;
    getDataWithCategory(category);
  }
  componentDidUpdate(prevProps, prevState) {
    const { category } = this.props.params;
    const { navigation } = this.props;
    const { getDataWithCategory } = this.state;
    if (this.props.params !== prevProps.params) {
      getDataWithCategory(category);
    }
    if (this.state.selectedProduct !== prevState.selectedProduct) {
      navigation(`${this.state.selectedProduct}`);
    }
  }
  render() {
    const { category } = this.props.params;
    const { products } = this.state.category;

    return (
      <div className="container">
        <h1 id="display-category">{category}</h1>
        <div className="product-cards-container">
          {products.map((product) => (
            <ProductCard
              setSelectedProduct={this.setSelectedProduct}
              key={product.name}
              {...product}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default productListWithParams(ProductList);
