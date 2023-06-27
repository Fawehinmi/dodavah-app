import gql from "graphql-tag";

export const CartFragment = gql`
  fragment Cart on Cart {
    totalPrice
    tax
    subTotal
    items {
      _id
      productId
      quantity
      price
      product {
        price
        priceBefore
        _id
        quantity
        detail
        name
        images {
          uri
          _id
        }
      }
    }
  }
`;
