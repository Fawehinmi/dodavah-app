import { ConfigProvider, Drawer, DrawerProps } from "antd";
import React from "react";

interface IPros extends DrawerProps {
  open: boolean;
  centered?: boolean;
  title?: string;
  onDismiss?: () => void;
  width?: string | number;
  children: React.ReactNode;
}

export const ApDrawer: React.FC<IPros> = ({
  open,
  title,
  children,
  onDismiss,
  centered = true,
  width,
  ...props
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "",
        },
      }}
    >
      <Drawer {...props} open={open} width={width} title={title}>
        {children}
      </Drawer>
    </ConfigProvider>
  );
};
