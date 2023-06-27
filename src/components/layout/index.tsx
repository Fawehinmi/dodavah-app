import React from "react";
import Navigations from "../navbar/navbar";

interface IProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen">
      {children}
      <Navigations />
    </div>
  );
};

export default MainLayout;
