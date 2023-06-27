import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { toastSvc } from "../../../services";
import { CartFragment } from "./fragment";

const ADD_CART = gql`
  mutation addCartItem($item: AddItemInput!) {
    addCartItem(item: $item) {
      ...Cart
    }
  }
  ${CartFragment}
`;

export const useAddToCart = (callback: any) => {
  return useMutation(ADD_CART, {
    onCompleted: (res) => {
      if (res?.addCartItem) {
        callback(res?.addCartItem);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};

const CHECK_OUT = gql`
  mutation checkout($contact: CheckoutInput!) {
    checkout(contact: $contact)
  }
`;

export const useCheckout = (callback: any) => {
  return useMutation(CHECK_OUT, {
    onCompleted: (res) => {
      if (res?.checkout) {
        callback(res?.checkout);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};

const USER_CART = gql`
  query findUserCart {
    findUserCart {
      ...Cart
    }
  }
  ${CartFragment}
`;

export const useLazyGetUserCart = (callback: any) => {
  return useLazyQuery(USER_CART, {
    fetchPolicy: "network-only",
    onCompleted: (res) => {
      if (res?.findUserCart) {
        callback(res.findUserCart);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};

const UPDATE_CART = gql`
  mutation updateCartItem($_id: String!, $item: CartItemInput!) {
    updateCartItem(_id: $_id, item: $item) {
      ...Cart
    }
  }
  ${CartFragment}
`;

export const useUpdateCartItem = (callback: any) => {
  return useMutation(UPDATE_CART, {
    onCompleted: (res) => {
      if (res.updateCartItem) {
        callback(res.updateCartItem);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};

const DELETE_CART = gql`
  mutation deleteCartItem($_id: String!) {
    deleteCartItem(_id: $_id) {
      ...Cart
    }
  }
  ${CartFragment}
`;
const VERIFY_TRANSACTION = gql`
  mutation verifyTransaction($reference: String!) {
    verifyTransaction(reference: $reference)
  }
`;

export const useVerifyTransaction = (callback: any) => {
  return useMutation(VERIFY_TRANSACTION, {
    onCompleted: (res) => {
      if (res?.verifyTransaction) {
        callback(res?.verifyTransaction);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};

export const useDeleteCartItem = (callback: any) => {
  return useMutation(DELETE_CART, {
    onCompleted: (res) => {
      if (res.deleteCartItem) {
        callback(res.deleteCartItem);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};
