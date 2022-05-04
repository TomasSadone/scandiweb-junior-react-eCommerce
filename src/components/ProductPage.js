import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../helpers/getData";

function productPageWithParams(ProductList) {
  return (props) => <ProductList {...props} params={useParams()} />;
}

class ProductPage extends Component {
  constructor(props) {
    super(props);
    // this.setSelectedProduct = this.setSelectedProduct.bind(this);
    this.state = {
      // category: {
      //   products: [],
      // },
      getDataWithId: (id) =>
        getData(
          `
            query getCategories($title:String!){
                category(input: {title:$title}){
                    products{
                    name
                    inStock
                    gallery
                    id
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
          { title: `${id}` }
        ).then((data) => {
          this.setState((state) => ({
            ...state,
            // category: { products: data.category.products },
          }));
        }),
    };
  }


  componentDidMount() {
    const { id } = this.props.params;
    const { getDataWithId } = this.state;
    getDataWithId(id);
  }
  render() {
    const { id } = this.props.params;

    return (
      <div>{id}</div>
    )
  }
}

export default productPageWithParams(ProductPage);
