import { ConfigProvider, Modal, ModalProps } from "antd";
import React from "react";

interface IPros extends ModalProps {
  open: boolean;
  centered?: boolean;
  title?: string;
  onDismiss?: () => void;
  width?: string | number;
  children: React.ReactNode;
}

export const ApModal: React.FC<IPros> = ({
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
      <Modal
        {...props}
        open={open}
        centered={centered}
        width={width}
        title={title}
        onCancel={onDismiss}
        footer={null}
      >
        {children}
      </Modal>
    </ConfigProvider>
  );
};
