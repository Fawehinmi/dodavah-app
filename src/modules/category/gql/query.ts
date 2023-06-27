import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { toastSvc } from "../../../services";

import { CategoryFragment } from "./fragment";

const CATEGORY_PAGE = gql`
  query productCategoryPage($page: ProductCategoryPageInput!) {
    productCategoryPage(page: $page) {
      totalRecords
      data {
        ...Category
      }
    }
  }
  ${CategoryFragment}
`;

export const useCategoryPage = (onCompleted: any) => {
  return useLazyQuery(CATEGORY_PAGE, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      if (res?.productCategoryPage) {
        onCompleted(res?.productCategoryPage);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};

const CREATE_CATEGORY = gql`
  mutation createCategory($category: CreateProductCategoryInput!) {
    createCategory(category: $category) {
      ...Category
    }
  }
  ${CategoryFragment}
`;

export const useCreateCategory = (callback: any) => {
  return useMutation(CREATE_CATEGORY, {
    onCompleted: (res) => {
      if (res?.createCategory) {
        callback(res?.createCategory);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};
const UPDATE_CATEGORY = gql`
  mutation updateCategory(
    $id: String!
    $category: UpdateProductCategoryInput!
  ) {
    updateCategory(id: $id, category: $category) {
      ...Category
    }
  }
  ${CategoryFragment}
`;

export const useUpdateCategory = (callback: any) => {
  return useMutation(UPDATE_CATEGORY, {
    onCompleted: (res) => {
      if (res?.updateCategory) {
        callback(res?.updateCategory);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};
