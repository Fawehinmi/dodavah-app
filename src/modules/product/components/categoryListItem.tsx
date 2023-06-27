import React from "react";
import { ApImage } from "../../../components/image";
import { ICategory } from "../../category/model";

interface IProps {
  category: ICategory;
  onClick: () => void;
}

const CategoryListItem: React.FC<IProps> = ({ category, onClick }) => {
  return (
    <div className="flex items-center flex-col " onClick={() => onClick()}>
      <div className="h-10 w-10 rounded-full">
        <ApImage
          src={category?.image?.uri}
          alt="Category Image"
          className="full-image object-cover rounded-full"
        />
      </div>

      <p className="text-sm font-semibold mt-1">{category.name}</p>
    </div>
  );
};

export default CategoryListItem;
