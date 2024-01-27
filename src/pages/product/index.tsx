ProductsPage;

import { getSession } from "next-auth/react";
import React from "react";
import MainLayout from "../../components/layout";
import ProductsPage from "../../modules/product/page";

export default function Product() {
  return (
    <MainLayout notScrollable>
      <ProductsPage />
    </MainLayout>
  );
}
