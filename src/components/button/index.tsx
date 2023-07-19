import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

interface IProps {
  name: string;
  className: string;
  loading?: boolean;
  htmlType?: "submit" | "button";
  variant?: "contained" | "text" | "outlined";
  onClick?: () => void;
  disabled?: boolean;
  // props?: {
  //   [x: string]: any;
  // };
}
const ApButton: React.FC<IProps> = ({
  name,
  className,
  loading = false,
  htmlType,
  onClick,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      type={htmlType}
      onClick={onClick}
      className={className}
      {...props}
    >
      {loading ? (
        <LoadingOutlined style={{ fontSize: 24 }} className="text-white" spin />
      ) : (
        <span>{name}</span>
      )}
    </button>
  );
};

export default ApButton;
