import { getSession } from "next-auth/react";
import React from "react";
import CartPage from "../modules/cart/page";

export default function Product() {
  return <CartPage />;
}

export async function getServerSideProps({ req }: { req: any }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permenant: false,
      },
    };
  }

  return {
    props: {},
  };
}
