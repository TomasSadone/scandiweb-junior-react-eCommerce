import { getData } from "./getData";

export const CartContentData = (id) =>
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
  );
