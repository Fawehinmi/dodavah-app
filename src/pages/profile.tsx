import React from "react";
import MainLayout from "../components/layout";
import ProfilePage from "../modules/profile/page";
import { getSession } from "next-auth/react";

const Profile = () => {
  return (
    <MainLayout>
      <ProfilePage />
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

export default Profile;
