import React from "react";

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
      // loading={loading}
      disabled={disabled || loading}
      type={htmlType}
      onClick={onClick}
      className={className}
      {...props}
    >
      <span>{name}</span>
    </button>
  );
};

export default ApButton;
