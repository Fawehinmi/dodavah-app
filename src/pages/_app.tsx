import "../styles/global.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from ".././ApolloClient";
import { ProductContextProvider } from "../modules/product/context";
import { CategoryContextProvider } from "../modules/category/context";
import "tailwindcss/tailwind.css";
import { CartContextProvider } from "../modules/cart/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileContextProvider } from "../modules/profile/context";
import { OrderContextProvider } from "../modules/order/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ApolloProvider client={apolloClient}>
        <CartContextProvider>
          <ProductContextProvider>
            <CategoryContextProvider>
              <ProfileContextProvider>
                <OrderContextProvider>
                  <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                  <Component {...pageProps} />
                </OrderContextProvider>
              </ProfileContextProvider>
            </CategoryContextProvider>
          </ProductContextProvider>{" "}
        </CartContextProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
