import React, { useEffect, useState } from "react";
import { useCartState } from "./context";
import { CartListItem } from "./components/listitem";
import { ICartItem } from "./model";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import ApButton from "../../components/button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ApLoader from "../../components/spinner";

const CartPage = () => {
  const router = useRouter();
  const { fetchCartPage, cart, loading } = useCartState();

  useEffect(() => {
    fetchCartPage();
  }, []);
  return (
    <div className="px-3 py-3">
      <p className="font-semibold text-lg">
        Cart{" "}
        <span className="px-2 text-sm text-gray-300">
          ({cart.items.length} products)
        </span>
      </p>

      {loading ? (
        <div className="w-full h-96 flex items-center justify-center">
          <ApLoader />
        </div>
      ) : (
        <div>
          <div className="">
            <div>
              {cart.items.map((item, i) => (
                <CartListItem
                  item={item}
                  // onDismiss={() => setModal({ show: false })}
                  // onViewDetail={() => setModal({ show: true, item })}
                  key={item._id}
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 px-3 w-full">
            <div className="flex justify-between py-1">
              <p className="text-gray-400">Sub Total:</p>
              <p>₦ {cart?.subTotal?.toFixed(2)}</p>
            </div>
            <div className="flex justify-between py-1">
              <p className="text-gray-400">Tax:</p>
              <p>₦ {cart?.tax?.toFixed(2)}</p>
            </div>
            <div className="flex justify-between py-1">
              <p className="text-gray-400">Total:</p>
              <p>₦ {cart?.totalPrice?.toFixed(2)}</p>
            </div>
            <div className="my-2 border-t border-dashed ">
              <ApButton
                name={`Checkout (${cart.items.length})`}
                onClick={() => {
                  router.push("/checkout");
                }}
                className={`w-full py-2  text-white rounded-full ${
                  cart?.items?.length < 1 ? "bg-rose-300" : "bg-rose-500"
                }`}
                disabled={cart?.items?.length < 1}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
