import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useVerifyTransaction } from "../../modules/cart/gql/query";
import { useRouter } from "next/router";
import ApLoader from "../../components/spinner";
import ApButton from "../../components/button";

import { IoMdCheckmarkCircle } from "react-icons/io";
import MainLayout from "../../components/layout";
import TopNav from "../../components/navbar";

export default function Product() {
  const router = useRouter();
  const { reference } = router.query;

  const [verify] = useVerifyTransaction((rs: any) => {});

  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    verify({ variables: { reference } })
      .then((rs) => {
        if (rs.data.verifyTransaction === true) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <TopNav/>
      <div className="h-[90vh] w-screen flex items-center justify-center">
        
        {!loading && (
          <div className="text-center">
            <div className="flex mx-0 justify-center">
              <IoMdCheckmarkCircle size={100} className="text-green-600" />
            </div>
            {success === true ? (
              <p>Order Placed Sucessfully</p>
            ) : (
              <p>
                Payment not verified, please contact us via whatsapp for
                compaints
              </p>
            )}

            <ApButton
              name="My orders"
              onClick={() => router.push("/orders")}
              className="text-rose-500  py-1 px-2"
            />
          </div>
        )}

        {loading && (
          <div className="text-center">
            <p className="mb-2">Please wait while we verify your payment</p>
            <ApLoader />
          </div>
        )}
      </div>
    </MainLayout>
  );
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
