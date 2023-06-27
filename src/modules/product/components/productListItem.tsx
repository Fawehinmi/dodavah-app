import React from "react";
import { ApImage } from "../../../components/image";
import { IProduct } from "../model";

import { SlHeart } from "react-icons/sl";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useRouter } from "next/router";

interface IProps {
  product: IProduct;
  onViewDetail: () => void;
}

const ProductListItem: React.FC<IProps> = ({ product, onViewDetail }) => {
  const router = useRouter();
  return (
    <div
      className="w-full pb-4"
      onClick={() => router.push(`/product/${product?._id}`)}
    >
      <div className="h-36 relative rounded-sm">
        {/* <div className="rounded-full absolute bg-white p-3 top-2 right-2">
          <SlHeart size={15} />
        </div> */}
        <ApImage
          src={product.images[0].uri}
          alt="Product Image"
          className="full-image object-cover rounded-sm"
        />
      </div>

      <div className="px-2 mt-2 ">
        <p className="font-semibold mb-1">{product.name}</p>
        {/* <p
          className={`text-sm  mb-3 text-${
            product.quantity > 0 ? "green-500" : "red-600"
          }`}
        >
          <span>.</span>
          {product.quantity > 0 ? "Available" : "Unavailable"}
        </p> */}

        <div className="flex gap-2">
          <p className="text-sm text-red-600 line-through">
            ₦ {product.priceBefore.toFixed(2)}
          </p>
          <p className="text-sm">₦ {product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
