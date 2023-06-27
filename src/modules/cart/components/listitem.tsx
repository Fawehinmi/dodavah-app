import React, { useState } from "react";
import { ICartItem, ICart } from "../model";
import { MdDelete, MdOutlineDelete } from "react-icons/md";
import { Form, Formik } from "formik";
import { useCartState } from "../context";
import { toastSvc } from "../../../services";
import { ApPlusMinusInput } from "../../../components/input/PlusMinuInput";
import { ApImage } from "../../../components/image";
interface IProps {
  item: ICartItem;
  // onDismiss: () => void;
  // onViewDetail: () => void;
}
export const CartListItem: React.FC<IProps> = ({
  item,
  // onDismiss,
  // onViewDetail,
}) => {
  const { updateCartItem, removeFromCart } = useCartState();
  const [qty, setQty] = useState<number>(1);

  return (
    <div className="flex gap-4 relative flex-row my-5">
      <div
        className="flex p-1 rounded-full bg-gray-100 absolute bottom-0 right-0"
        onClick={() => removeFromCart(item?._id)}
      >
        <MdOutlineDelete size={14} className="text-red-600 float-right " />
      </div>
      <div className="w-36 h-28">
        <ApImage
          src={item?.product?.images[0]?.uri}
          alt={`${item?.product?.name} image`}
          className="full-image rounded-lg object-cover"
          // onClick={() => onViewDetail()}
        />
      </div>
      <div className="h-28 relative">
        <p className="font-semibold text-base">{item.product.name}</p>
        <span className="text-sm font-normal text-gray-500">
          ₦ {item.product.price + item.product.price * 0.03} (~ ₦
          {item.product.price * 0.03} Tax included)
        </span>

        <div className="absolute bottom-0">
          <Formik
            initialValues={{
              quantity: item?.quantity || "",
            }}
            onSubmit={() => {}}
          >
            {({ values }) => (
              <Form>
                <div>
                  <ApPlusMinusInput
                    name="quantity"
                    inputClassName="border-none w-10"
                    onChange={(val) => {
                      setQty(val);
                      if (val !== item?.quantity)
                        updateCartItem(item._id, +val);
                    }}
                    disable={qty == item?.product?.quantity ? true : false}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
