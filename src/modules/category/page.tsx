import { Drawer, Modal } from "antd";
import React, { use, useEffect, useState } from "react";
import ApButton from "../../components/button";
import ApTable from "../../components/table";
import { useCategoryState } from "./context";
import CategoryDetail from "./detail";
import { useCreateCategory } from "./gql/query";
import { ICategory, ICategoryFilter } from "./model";

const CategoryPage = () => {
  // States

  const { categories, totalRecords, fetchCategoryPage, loading } =
    useCategoryState();

  const [modal, setModal] = useState<{ open: boolean; data?: any }>({
    open: false,
  });

  const [filter, setFilter] = useState<ICategoryFilter>({ skip: 0 });

  // Custom Hooks

  useEffect(() => {
    fetchCategoryPage({ ...filter });
  }, []);

  // Table Header column

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: ICategory) => {
        return (
          <div>
            <div className="flex  gap-2  justify-start ">
              {/* <Popconfirm
                  placement="top"
                  title={"Delete Content"}
                  description={
                    "Are you sure you want to delete Content?. Action cannot be reversed"
                  }
                  onConfirm={() => {
                    handleDelete(
                      record,
                      content.findIndex((e) => e._id === record._id)
                    );
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <ApButton
                    displayName="Delete Content"
                    className=" text-red-500 cursor-pointer"
                  />
                </Popconfirm> */}

              <ApButton
                className="text-cyan-500 "
                name="Edit"
                onClick={() => {
                  setModal({ open: true, data: record });
                }}
              />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="bg-white m-1">
        <div className="flex justify-end px-4 py-6">
          <ApButton
            name="New Category"
            className="bg-sky-500"
            onClick={() => setModal({ open: true })}
          />
        </div>
        <ApTable
          columns={columns}
          dataSource={categories}
          pagination={{ current: 1, total: totalRecords }}
          scroll={{ y: 400 }}
          loading={loading}
        />
      </div>
      <Drawer
        title={modal.data ? "Update Category" : "Create Category"}
        placement={"right"}
        closable={true}
        onClose={() => setModal({ open: false })}
        open={modal.open}
        maskClosable={false}
      >
        <CategoryDetail category={modal.data} />
      </Drawer>
    </>
  );
};

export default CategoryPage;
