import React from "react";
import MainLayout from "../components/layout";
import ProfilePage from "../modules/profile/page";
import { getSession } from "next-auth/react";
import CheckoutPage from "../modules/cart/checkout";

const Profile = () => {
  return (
    <MainLayout>
      <CheckoutPage />
    </MainLayout>
  );
};
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

export default Profile;
