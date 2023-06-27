import React, { createContext, useState } from "react";
import { toastSvc } from "../../services";
import {
  useCreateProduct,
  useDeleteProduct,
  // useDeleteProduct,
  useProductPage,
  useUpdateProduct,
  // useUpdateProduct,
} from "./gql/query";
import { IProduct, IProductFilter } from "./model";

interface IProductState {
  loading: boolean;
  // product: IProduct;
  products: IProduct[];
  totalRecords: number;
  fetchProductPage: (page: IProductFilter) => void;
}

const ProductContext = createContext<IProductState>({
  loading: false,
  // product: {} as any,
  products: [],
  totalRecords: 0,
  fetchProductPage(page) {},
});

export const useProductState = () => {
  const context = React.useContext(ProductContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}

const limit = 5;

export const ProductContextProvider: React.FC<IProps> = ({ children }) => {
  // const [product, setProduct] = useState<IProduct>() as any;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  const [fetchPageQuery, {}] = useProductPage((res: any) => {
    setProducts(res.data);
    setTotalRecords(res.totalRecords);
  });

  const fetchProductPage = (page: IProductFilter) => {
    setLoading(true);

    setTimeout(() => {
      fetchPageQuery({
        variables: {
          page: {
            ...page,
            take: limit,
          },
        },
      }).finally(() => {
        setLoading(false);
      });
    }, 2000);
  };

  return (
    <ProductContext.Provider
      value={{
        loading,
        products,
        fetchProductPage,
        totalRecords,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
