import React, { useEffect, useState } from "react";
import { toastSvc } from "../../services";
import {
  useAddToCart,
  useCheckout,
  useDeleteCartItem,
  useLazyGetUserCart,
  useUpdateCartItem,
} from "./gql/query";
import { ICart, ICartItem, ICheckout } from "./model";

interface ICartState {
  fetchCartPage: () => void;
  cart: ICart;
  loading: boolean;

  handleAddToCart: (qty: number, productId: string) => void;
  handleCheckout: (checkout: ICheckout) => Promise<string | null>;
  updateCartItem: (_id: string, qty: number) => void;
  removeFromCart: (_id: string) => void;
  // handleEmptyCart: () => void;
}

const CartContext = React.createContext<ICartState>({
  cart: {},
  fetchCartPage() {},
  loading: true,

  handleAddToCart(item, productId) {},
  handleCheckout(checkout) {},
  updateCartItem(_id, qty) {},
  removeFromCart(_id) {},
  // handleEmptyCart() {},
} as ICartState);

const useCartState = () => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}

const CartContextProvider: React.FC<IProps> = ({ children }) => {
  const [cart, setCart] = useState<ICart>({
    items: [],
    subTotal: 0,
    tax: 0,
    totalPrice: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);

  const [fetchCart] = useLazyGetUserCart((rs: any) => {
    setCart(rs);
  });
  const [addToCart] = useAddToCart((res: any) => {
    toastSvc.success("Product Added to Cart");
  });
  const [checkout] = useCheckout((res: any) => {});
  const [update] = useUpdateCartItem((res: any) => {});
  const [deleteCart] = useDeleteCartItem((res: any) => {
    toastSvc.success("Item removed from Cart");
  });

  const fetchCartPage = async () => {
    setLoading(true);
    setTimeout(() => {
      fetchCart({
        variables: {},
      }).finally(() => {
        setLoading(false);
      });
    }, 2000);
  };
  const handleEmptyCart = () => {
    setCart({
      items: [],
      subTotal: 0,
      tax: 0,
      totalPrice: 0,
    });
  };

  const handleCheckout = async (checkoutInput: ICheckout) => {
    const rs = await checkout({ variables: { contact: checkoutInput } });
    return rs.data?.checkout ? rs.data.checkout : null;
  };
  const handleAddToCart = async (qty: number, productId: string) => {
    const payload = {
      productId: productId,
      quantity: qty,
    };

    const res = await addToCart({
      variables: {
        item: payload,
      },
    });

    const cartRes = res.data?.addCartItem;

    if (cartRes) {
      setCart(cartRes);
    }
  };

  const removeFromCart = (_id: string) => {
    deleteCart({
      variables: { _id: _id },
    }).then((res) => {
      setCart(res.data?.deleteCartItem);
    });
  };

  const updateCartItem = (_id: string, qty: number) => {
    const payload = {
      quantity: qty,
    };

    update({
      variables: {
        _id,
        item: payload,
      },
    }).then((res) => {
      setCart(res.data?.updateCartItem);
    });
  };

  return (
    <CartContext.Provider
      value={{
        fetchCartPage,
        cart,
        handleCheckout,
        handleAddToCart,
        updateCartItem,
        removeFromCart,
        loading,

        // handleEmptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContextProvider, useCartState };
