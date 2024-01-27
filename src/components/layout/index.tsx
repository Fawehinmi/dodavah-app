import React, { useState } from "react";
import TopNav from "../navbar";
import Footer from "../footer";

interface IProps {
  notScrollable?: boolean;
  children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = ({ children, notScrollable }) => {
  return (
    <div
      className={`h-screen ${!notScrollable === true ? "" : "overflow-hidden"}`}
    >
      <TopNav />

      <div className="lg:mt-14 mt-8"> {children}</div>

      <Footer />
    </div>
  );
};

export default MainLayout;
