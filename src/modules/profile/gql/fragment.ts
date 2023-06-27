import gql from "graphql-tag";

export const profileFragment = gql`
  fragment userProfile on User {
    _id
    id
    firstName
    lastName
    fullName
    otherName
    email
    phoneNumber
    roles
    address
  }
`;
