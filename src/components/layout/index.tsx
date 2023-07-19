import React from "react";
import TopNav from "../navbar";

interface IProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="">
      <TopNav />

      <div className="mt-14"> {children}</div>
    </div>
  );
};

export default MainLayout;
