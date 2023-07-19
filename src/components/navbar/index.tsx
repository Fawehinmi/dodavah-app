import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiUser } from "react-icons/ci";

import { useRouter } from "next/router";
import { useCartState } from "../../modules/cart/context";
import { useSession } from "next-auth/react";
import ApButton from "../button";
import ApAuthRequired from "../auth";

const TopNav = () => {
  const router = useRouter();
  const session = useSession();

  const { cart, fetchCartPage } = useCartState();

  useEffect(() => {
    if (!session.data) return;

    fetchCartPage();
  }, []);

  return (
    <div
      className={`${
        !session?.data && "pt-2"
      } px-4  py-2 flex gap-2 justify-between fixed z-30 top-0 w-full items-center border-b border-b-gray-200 bg-white`}
    >
      <p className="text-base text-rose-500 font-semibold">Dodavah Wigs</p>

      <div>
        <ul className="flex gap-7">
          <li
            onClick={() => router.push("/")}
            className={`border-b  delay-200 px-4 cursor-pointer hover:border-rose-400 pb-3 text-gray-500  ${
              router.pathname === "/" ? "border-rose-400" : "border-white"
            }`}
          >
            Home
          </li>
          <li
            onClick={() => router.push("/product")}
            className={`border-b border-white delay-200 px-4 cursor-pointer hover:border-rose-400 pb-3 text-gray-500 ${
              router.pathname === "/product" && "border-rose-400"
            }`}
          >
            Products
          </li>
          <li
            className={`border-b border-white delay-200 px-4 cursor-pointer hover:border-rose-400 pb-3 text-gray-500 ${
              router.pathname === "/contact" && "border-rose-400"
            }`}
          >
            Contact
          </li>
        </ul>
      </div>

      <div className="">
        <div className="flex items-center gap-2">
          <ApAuthRequired>
            <div
              className="relative cursor-pointer"
              onClick={() => session?.data && router.push("/cart")}
            >
              {session?.data && (
                <p className="text-center absolute right-0 top-0 text-white rounded-full  text-xs px-1  font-bold bg-rose-500">
                  {cart.items.length}
                </p>
              )}

              <AiOutlineShoppingCart className="cursor-pointer" size={25} />
            </div>
          </ApAuthRequired>
          <ApAuthRequired>
            <CiUser
              className="cursor-pointer"
              size={25}
              onClick={() => session?.data && router.push("/profile")}
            />
          </ApAuthRequired>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
