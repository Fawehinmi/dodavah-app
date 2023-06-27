import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

const ApAuthRequired: React.FC<IProps> = ({ children }) => {
  const session = useSession();
  const router = useRouter();

  return (
    <div
      onClick={() => {
        !session?.data && router.push("/signin");
      }}
    >
      {children}
    </div>
  );
};

export default ApAuthRequired;
