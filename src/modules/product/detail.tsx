import React, { useState } from "react";

import ApButton from "../../components/button";
import { ApImage } from "../../components/image";

import { useCartState } from "../cart/context";

import { IProduct } from "./model";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbCopy } from "react-icons/tb";
import ApRating from "../../components/rating";
import ApAuthRequired from "../../components/auth";
import TopNav from "../../components/navbar";
import { useRouter } from "next/router";
import copy from "copy-to-clipboard";
import { useSession } from "next-auth/react";
import { HiArrowLeft } from "react-icons/hi";

interface IProps {
  product: IProduct;
  onDissmiss?: () => void;
}

const ProductDetail: React.FC<IProps> = ({ product, onDissmiss }) => {
  const router = useRouter();
  const currentRoute = router.asPath;
  const host = process.browser ? window.location.host : "";
  const currentUrl = `${host}${currentRoute}`;

  const { handleAddToCart } = useCartState();
  const [copied, setCopied] = useState<boolean>(false);

  const session = useSession();

  const addToCart = async (qty: number, productId: string) => {
    handleAddToCart(qty, productId);
  };

  const handleCopy = (text: string) => {
    copy(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      {/* <TopNav /> */}

      <div
        className={`
          pt-2
         w-screen px-2  pb-2 flex gap-2 justify-between items-center`}
      >
        <div className="bg-gray-100 py-2 rounded-sm px-3">
          <HiArrowLeft onClick={() => router.push("/")} />
        </div>
        <p className="text-base text-rose-500 font-semibold">Dodavah Wigs</p>
        <div></div>
      </div>

      <div className="h-80">
        <ApImage
          src={product.images[0].uri}
          alt="Product Image"
          className="full-image rounded-b-3xl object-cover"
        />
      </div>
      <div className="px-3 ">
        <div className="border-b border-b-gray-300">
          <div className="flex items-center mt-4 gap-2">
            <AiOutlineShoppingCart
              className="font-semibold text-rose-500"
              size={16}
            />
            <p className="text-rose-500 font-semibold">Shopping</p>
          </div>
          <div className="flex mb-3 justify-between items-center">
            <div>
              <p className="font-semibold  text-lg ">{product.name}</p>
              <div className="flex gap-3 items-center">
                <p className="text-base font-semibold text-red-600 line-through">
                  ₦ {product.priceBefore.toFixed(2)}
                </p>
                <p className="text text-base  font-semibold">
                  ₦ {product.price.toFixed(2)}
                </p>
              </div>
              <span className="text-sm font-normal text-gray-500">
                Tax Rate 3% - ₦{product.price * 0.03} (~ ₦{" "}
                {product.price + product.price * 0.03})
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div
                className="p-3 bg-gray-100 rounded-full"
                onClick={() => handleCopy(currentUrl)}
              >
                <TbCopy size={16} className="text-rose-500" />
              </div>

              {copied && <p>copied!</p>}
            </div>
          </div>
          <p className="text-sm   mb-3">{product.detail}</p>{" "}
        </div>

        <div className="my-3 font-semibold text-lg">
          <p className="">Ratings & Reviews</p>

          <ApRating
            defaultValue={3.7}
            className="text-orange-400"
            disabled
            allowHalf
          />
        </div>

        <ApAuthRequired>
          <ApButton
            className="w-full py-3 bg-rose-500 text-white rounded-lg  hover:bg-rose-600 active:bg-rose-600 active:text-white focus:bg-rose-600"
            name="Add to Cart"
            onClick={() => session?.data && addToCart(1, product._id)}
          />
        </ApAuthRequired>
      </div>
    </>
  );
};

export default ProductDetail;
