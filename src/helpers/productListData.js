import { getData } from "./getData";

export const productListData = (category) => {
  return getData(
    `
    query getCategories($title:String!){
        category(input: {title:$title}){
            products{
                name
                inStock
                gallery
                id
                brand
                attributes{
                    id
                }
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
  );
};
