import React from "react";
import { Rate, RateProps } from "antd";

interface IProps extends RateProps {}

const ApRating: React.FC<IProps> = (props) => {
  return (
    <>
      <Rate {...props} />
    </>
  );
};

export default ApRating;
