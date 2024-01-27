// components/TopNav.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { useRouter } from "next/router";
import { useCartState } from "../../modules/cart/context";
import { signOut, useSession } from "next-auth/react";
import ApButton from "../button";
import ApAuthRequired from "../auth";
import { RxTextAlignJustify } from "react-icons/rx";
import { FaChevronRight } from "react-icons/fa";
import { ApDrawer } from "../modal";
import { CloseOutlined } from "@ant-design/icons";

const TopNav = () => {
  const router = useRouter();
  const session = useSession();

  const { cart, fetchCartPage } = useCartState();

  const [showNav, setShowNav] = useState<boolean>(false);

  useEffect(() => {
    if (!session.data) return;
    fetchCartPage();
  }, []);
  const drawerFooter = () => (
    <div className="z-50">
      {session?.data ? (
        <div className="py-3 px-3">
          <ApButton
            name="Logout"
            className="rounded-full bg-rose-500 font-bold w-full py-2.5 text-white"
            onClick={() => {
              signOut();
              location.href = "/";
            }}
          />
        </div>
      ) : (
        <div className="flex items-center gap-3 border-t py-3 px-3">
          <ApAuthRequired>
            <ApButton
              name="Signup"
              className="rounded-full bg-rose-500 font-bold w-full py-2.5 px-3 text-white"
              onClick={() => {}}
            />
          </ApAuthRequired>

          <ApAuthRequired>
            <ApButton
              name="Signin"
              className="rounded-full border border-rose-500 font-bold w-full py-2.5 px-3 text-rose-500"
              onClick={() => {}}
            />
          </ApAuthRequired>
        </div>
      )}
    </div>
  );
  return (
    <div
      className={`${
        !session?.data && "pt-2"
      } px-4 py-2 flex gap-2 justify-between fixed z-30 top-0 w-full items-center bg-white`}
    >
      {/* Logo */}
      <p className="text-base text-rose-500 font-semibold">Dodavah Wigs</p>
      {/* ---------- */}

      <div className="hidden lg:flex  gap-7">
        <Link href={"/"}>
          <p
            className={`border-b delay-200 px-4 hover:border-rose-400 pb-3 text-gray-500 ${
              router.pathname === "/" ? "border-rose-400" : "border-white"
            }`}
          >
            Home
          </p>
        </Link>
        <Link href={"/product"}>
          <p
            className={`border-b delay-200 px-4 hover:border-rose-400 pb-3 text-gray-500 ${
              router.pathname === "/product"
                ? "border-rose-400"
                : "border-white"
            }`}
          >
            Products
          </p>
        </Link>

        <Link href={"/contact"}>
          <p
            className={`border-b delay-200 px-4 hover:border-rose-400 pb-3 text-gray-500 ${
              router.pathname === "/contact"
                ? "border-rose-400"
                : "border-white"
            }`}
          >
            Contact
          </p>
        </Link>
      </div>

      <div className="flex items-center  gap-2">
        <ApAuthRequired>
          <div
            className="relative cursor-pointer"
            onClick={() => session?.data && router.push("/cart")}
          >
            {session?.data && (
              <p className="text-center absolute right-0 top-0 text-white rounded-full text-xs px-1 font-bold bg-rose-500">
                {cart.items.length}
              </p>
            )}
            <AiOutlineShoppingCart className="cursor-pointer" size={25} />
          </div>
        </ApAuthRequired>
        <div className="hidden lg:flex">
          <ApAuthRequired>
            <CiUser
              className="cursor-pointer "
              size={25}
              onClick={() => session?.data && router.push("/profile")}
            />
          </ApAuthRequired>
        </div>

        <div className="lg:hidden flex items-center justify-center">
          <button
            onClick={() => {
              setShowNav(true);
            }}
            className="text-gray-700 focus:outline-none"
          >
            <RxTextAlignJustify size={30} />
          </button>
        </div>
      </div>

      <ApDrawer
        zIndex={6000}
        footerStyle={{ padding: 0, borderWidth: 0 }}
        footer={drawerFooter()}
        bodyStyle={{ padding: 0 }}
        contentWrapperStyle={{ width: "320px" }}
        closable={false}
        placement="right"
        onClose={() => setShowNav(false)}
        open={showNav}
      >
        <div className="flex justify-between py-3 border-b px-3">
          <Link href={"/"}>
            <p className="text-base text-rose-500 font-semibold">
              Dodavah Wigs
            </p>
          </Link>

          <button onClick={() => setShowNav(false)}>
            <CloseOutlined />
          </button>
        </div>
        <div className="px-3 py-3 flex flex-col gap-1 text-sm">
          <Link
            href="/"
            className="flex items-center justify-between py-2 px-3 rounded hover:bg-primary/50 text-dark hover:text-black"
          >
            Home
            <FaChevronRight className="w-4 h-4" />
          </Link>
          <ApAuthRequired>
            <Link
              href="/cart"
              className="flex items-center justify-between py-2 px-3 rounded hover:bg-primary/50 text-dark hover:text-black"
            >
              My Cart
              <FaChevronRight className="w-4 h-4" />
            </Link>
          </ApAuthRequired>
          <ApAuthRequired>
            <Link
              href="/profile"
              className="flex items-center justify-between py-2 px-3 rounded hover:bg-primary/50 text-dark hover:text-black"
            >
              My Profile
              <FaChevronRight className="w-4 h-4" />
            </Link>
          </ApAuthRequired>
          <ApAuthRequired>
            <Link
              href="/orders"
              className="flex items-center justify-between py-2 px-3 rounded hover:bg-primary/50 text-dark hover:text-black"
            >
              My Orders
              <FaChevronRight className="w-4 h-4" />
            </Link>
          </ApAuthRequired>
        </div>
      </ApDrawer>
    </div>
  );
};

export default TopNav;
