import { Button, Popover, ConfigProvider } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";
import React from "react";

interface IProps {
  show: boolean;
  onClick: (show: boolean) => void;
  children: React.ReactNode;
  title?: string;
  placement?: TooltipPlacement;
}
export const ApPopOver: React.FC<IProps> = ({
  show,
  children,
  onClick,
  title,
  placement,
}) => {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "white",
            fontFamily: "",
          },
        }}
      >
        <Popover
          content={children}
          title={title}
          trigger="click"
          open={show}
          placement={placement}
          onOpenChange={() => onClick(show)}
        >
          {/* <Button type="primary">Click me</Button> */}
        </Popover>
      </ConfigProvider>
    </div>
  );
};
