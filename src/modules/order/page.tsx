import Router from "next/router";
import React, { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";

import { useOrderState } from "./context";
import { IOrder } from "./model";
import { OrderListItem } from "./components/listitem";
import { HiArrowLeft } from "react-icons/hi";

export const OrderPage = () => {
  const { orders, fetchOrderPage, loading } = useOrderState();
  const [modal, setModal] = useState<{ show: boolean; data?: any }>({
    show: false,
  });

  useEffect(() => {
    fetchOrderPage(0);
  }, []);

  const handlePrevious = () => {
    Router.back();
  };

  const handleViewOrder = (order: IOrder) => {
    setModal({ show: true, data: order });
  };

  return (
    <div className="text-sm">
      <div
        className={`
          pt-2
         w-screen px-2  pb-2 flex gap-2 justify-between items-center`}
      >
        <div className="bg-gray-100 py-2 rounded-sm px-3">
          <HiArrowLeft onClick={handlePrevious} />
        </div>
        <p className="text-base  font-semibold">My Orders</p>
        <div></div>
      </div>
      <div className="pb-12">
        {!loading && orders?.length == 0 ? (
          <div className="w-fit h-fit m-auto inset-0 fixed">
            <div>
              <FiShoppingBag
                size="70"
                className="active:text-sky-500 m-auto text-gray-400"
              />
              <p className="text-sm ">No order placed yet</p>
            </div>
          </div>
        ) : (
          <div className="px-2">
            {orders?.map((item, i) => (
              <OrderListItem item={item} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
