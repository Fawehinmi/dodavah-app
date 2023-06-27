import React from "react";
import MainLayout from "../components/layout";
import { getSession } from "next-auth/react";
import { OrderPage } from "../modules/order/page";

const Order = () => {
  return (
    <MainLayout>
      <OrderPage />
    </MainLayout>
  );
};
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

export default Order;
