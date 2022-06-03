import { getData } from "./getData";

export const productListData = (id) => {
  return getData(
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
  );
};
