import { useLazyQuery, useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { toastSvc } from "../../../services";
import { OrderFragment } from "./fragment";

const ORDER_PAGE = gql`
  query userOrderPage($page: OrderPageInput!) {
    userOrderPage(page: $page) {
      totalRecords
      data {
        ...Order
      }
    }
  }
  ${OrderFragment}
`;

export const userLazyOrderPage = (onCompleted: any) => {
  return useLazyQuery(ORDER_PAGE, {
    fetchPolicy: "network-only",
    onCompleted: (res) => {
      if (res.userOrderPage) {
        onCompleted(res.userOrderPage);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
