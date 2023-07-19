import { getSession } from "next-auth/react";
import React from "react";
import CartPage from "../modules/cart/page";
import MainLayout from "../components/layout";

export default function Product() {
  return (
    <MainLayout>
      <CartPage />
    </MainLayout>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permenant: false,
      },
    };
  }

  return {
    props: {},
  };
}
