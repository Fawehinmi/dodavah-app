import { useRouter } from "next/router";
import React, { useState } from "react";
import { userLazyOrderPage } from "./gql/query";
import { IOrder } from "./model";

interface IOrderState {
  loading: boolean;
  orders: IOrder[];
  fetchOrderPage: (page: number) => void;
}

const OrderContext = React.createContext<IOrderState>({
  loading: true,
  orders: [],

  fetchOrderPage(page) {},
});

const useOrderState = () => {
  const context = React.useContext(OrderContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}

const limit = 20;
const OrderContextProvider: React.FC<IProps> = ({ children }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const [skip, setSkip] = useState(0);

  const [loading, setLoading] = useState<boolean>(false);

  const [fetchOrder] = userLazyOrderPage((res: any) => {
    setOrders(skip == 0 ? res.data : [...orders, ...res.data]);
  });

  const fetchOrderPage = (skip: number) => {
    setSkip(skip);
    setLoading(true);
    fetchOrder({
      variables: {
        page: { skip: skip, take: limit },
      },
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        fetchOrderPage,
        loading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContextProvider, useOrderState };
