import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ApModal } from "../modal";
import { SigninPage } from "../../modules/auth/signin";
import { SignupPage } from "../../modules/auth/signup";

interface IProps {
  children: React.ReactNode;
}

const ApAuthRequired: React.FC<IProps> = ({ children }) => {
  const session = useSession();

  const [showModal, setShowModal] = useState<{
    show: boolean;
    page?: "signIn" | "signUp";
  }>({ show: false, page: "signIn" });

  return (
    <div
      onClick={() => {
        !session?.data &&
          showModal.show != true &&
          setShowModal({ show: true, page: "signIn" });
      }}
    >
      <div>{children}</div>

      <ApModal
        className="my-14"
        open={showModal.show}
        onDismiss={() => {
          console.log("clicked");
          setShowModal({ show: false });
          console.log(showModal.show);
        }}
        centered
      >
        {showModal.page === "signIn" ? (
          <SigninPage
            setPage={(page) => setShowModal({ show: true, page })}
            onDissmiss={() => setShowModal({ show: false })}
          />
        ) : (
          <SignupPage
            setPage={(page) => setShowModal({ show: true, page })}
            onDissmiss={() => setShowModal({ show: false })}
          />
        )}
      </ApModal>
    </div>
  );
};

export default ApAuthRequired;
