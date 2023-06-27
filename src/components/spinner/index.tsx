import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24 }} className="text-rose-500" spin />
);

const ApLoader: React.FC = () => <Spin indicator={antIcon} />;

export default ApLoader;
