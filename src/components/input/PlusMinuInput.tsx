import { ErrorMessage, useField } from "formik";
import React, { useEffect } from "react";
import ApTextInput from "./TextInput";
import { AiOutlineMinus } from "react-icons/ai";

interface IProps {
  label?: string;
  name: string;
  disable?: boolean;
  inputClassName?: string;
  btnClassName?: string;
  onChange?: (value: number) => void;
}

export const ApPlusMinusInput: React.FC<IProps> = (props) => {
  const { label, name, btnClassName, inputClassName, onChange, disable } =
    props;
  const [field, meta, { setValue }] = useField(name);

  const buttonClassName =
    btnClassName ||
    "flex items-center justify-center w-6 h-6 rounded-full border border-gray-300";

  useEffect(() => {
    if (onChange) onChange(+field.value);
  }, [field.value]);
  return (
    <div className="">
      <div className="flex items-center">
        <button
          className={buttonClassName}
          type="button"
          onClick={() => {
            if (field.value && field.value > 1) {
              setValue(--field.value);
            }
          }}
        >
          <AiOutlineMinus size={10} className="gray-400" />
        </button>
        <ApTextInput
          className={`${inputClassName}`}
          name="quantity"
          type="button"
        />
        <button
          className={buttonClassName}
          type="button"
          title="+"
          onClick={() => {
            if (field.value) {
              setValue(++field.value);
            }
          }}
          disabled={disable}
        >
          <span>+</span>
        </button>
      </div>
    </div>
  );
};
