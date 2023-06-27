import React from "react";
import { findProductAsync } from "../../modules/product/gql/query";
import { IProduct } from "../../modules/product/model";
import ProductDetail from "../../modules/product/detail";

interface IProps {
  product: IProduct;
}

const Product: React.FC<IProps> = ({ product }) => {
  return <ProductDetail product={product} />;
};

export default Product;

export async function getServerSideProps(context: any) {
  const product: IProduct = await findProductAsync(context.query.id);

  return {
    props: { product },
  };
}
