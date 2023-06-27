import React, { useState } from "react";
import { IOrder, IOrderItem } from "../model";
import { MdDelete, MdOutlineDelete } from "react-icons/md";
import { Form, Formik } from "formik";
import { toastSvc } from "../../../services";
import { ApPlusMinusInput } from "../../../components/input/PlusMinuInput";
import { ApImage } from "../../../components/image";
import { AiFillCar } from "react-icons/ai";
import moment from "moment";
interface IProps {
  item: IOrder;
  // onDismiss: () => void;
  // onViewDetail: () => void;
}
export const OrderListItem: React.FC<IProps> = ({
  item,
  // onDismiss,
  // onViewDetail,
}) => {
  return (
    <div className="flex py-1 my-2 bg-slate-100 px-2 rounded-md gap-4 justify-between items-center">
      <div className="flex items-center gap-4">
        <AiFillCar size={30} className="text-green-500" />
        <div>
          <p className="font-bold">{item?.ref}</p>
          <p className="text-sm">Total Price: ₦{item?.totalPrice}</p>
          <p className="text-sm">
            Date: {moment(+item.createdAt).format("MMMM, D, YYYY")}
          </p>
        </div>
      </div>

      <p>Status: {item?.status}</p>
    </div>
  );
};
