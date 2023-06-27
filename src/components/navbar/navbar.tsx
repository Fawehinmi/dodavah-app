import React from "react";

import { RiProductHuntFill } from "react-icons/ri";
import { BiUser } from "react-icons/bi";

import { useRouter } from "next/router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillBagPlusFill } from "react-icons/bs";

const Navigations = () => {
  const router = useRouter();
  return (
    <div className="w-screen fixed bottom-0 bg-white px-10 py-2 flex gap-6 justify-between  items-center">
      <div className="flex items-center  flex-col">
        <RiProductHuntFill
          onClick={() => router.push("/")}
          className={`${
            router.pathname === "/" ? "text-rose-500" : "text-gray-600"
          }`}
          size={25}
        />
        <p className="text-sm">Products</p>
      </div>
      <div className="flex items-center  flex-col">
        <AiOutlineShoppingCart
          onClick={() => router.push("/cart")}
          className={`${
            router.pathname === "/cart" ? "text-rose-500" : "text-gray-600"
          }`}
          size={25}
        />
        <p className="text-sm">Cart</p>
      </div>
      <div className="flex items-center  flex-col">
        <BsFillBagPlusFill
          onClick={() => router.push("/orders")}
          className={`${
            router.pathname === "/orders" ? "text-rose-500" : "text-gray-600"
          }`}
          size={25}
        />
        <p className="text-sm">Orders</p>
      </div>
      <div className="flex items-center  flex-col">
        <BiUser
          className={`${
            router.pathname === "/profile" ? "text-rose-500" : "text-gray-600"
          }`}
          size={25}
          onClick={() => router.push("/profile")}
        />
        <p className="text-sm">Profile</p>
      </div>
    </div>
  );
};

export default Navigations;
