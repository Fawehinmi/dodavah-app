import React from "react";
import { ApImage } from "../../../components/image";
import { ICategory } from "../../category/model";

interface IProps {
  category: ICategory;
  onClick: () => void;
  selected: boolean;
}

const CategoryListItem: React.FC<IProps> = ({
  category,
  onClick,
  selected,
}) => {
  return (
    <div
      className={`flex items-center flex-col  rounded-lg cursor-pointer ${
        selected === true ? "bg-rose-500 text-white" : "bg-gray-100"
      }`}
      onClick={onClick}
    >
      <p className="text-sm font-semibold py-1 rounded-lg">{category.name}</p>
    </div>
  );
};

export default CategoryListItem;
