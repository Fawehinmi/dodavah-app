import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { AiOutlineShoppingCart } from "react-icons/ai";

import { useRouter } from "next/router";
import { useCartState } from "../../modules/cart/context";
import { useSession } from "next-auth/react";

const TopNav = () => {
  const router = useRouter();
  const session = useSession();

  const { cart, fetchCartPage } = useCartState();

  useEffect(() => {
    if (cart.items.length > 0 || !session.data) return;

    fetchCartPage();
  }, []);

  return (
    <div
      className={`${
        !session?.data && "pt-2"
      } w-screen px-2  pb-2 flex gap-2 justify-between items-center`}
    >
      <div></div>
      <p className="text-base text-rose-500 font-semibold">Dodavah Wigs</p>

      <div className="text-center">
        {session?.data && (
          <p className="text-center m-0 p-0 font-bold text-rose-500">
            {cart.items.length}
          </p>
        )}

        <AiOutlineShoppingCart size={25} onClick={() => router.push("/cart")} />
      </div>
    </div>
  );
};

export default TopNav;
