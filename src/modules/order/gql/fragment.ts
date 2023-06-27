import gql from "graphql-tag";

export const OrderFragment = gql`
  fragment Order on Order {
    _id
    ref
    createdAt
    items {
      _id
      quantity
      price
      totalAmount
      product {
        detail
        name

        category
        images {
          _id
          uri
          name
          type
        }
      }
    }
    subTotal
    tax
    status
    totalPrice
    contactName
    contactPhone
    address
    createdAt
  }
`;
