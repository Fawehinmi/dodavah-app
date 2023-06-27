import { App, Drawer, message, Modal, Popconfirm } from "antd";
import React, { use, useEffect, useState } from "react";
import ApButton from "../../components/button";
import { ApImage } from "../../components/image";
import { ApSearchInput } from "../../components/input/search";
import TopNav from "../../components/navbar";
import ApTable from "../../components/table";
import { useCategoryState } from "../category/context";
import CategoryListItem from "./components/categoryListItem";
import ProductListItem from "./components/productListItem";
import { useProductState } from "./context";
import ProductDetail from "./detail";
import { useCreateProduct } from "./gql/query";
import { IProduct, IProductFilter } from "./model";
import ApLoader from "../../components/spinner";

const limit = 5;

const ProductsPage = () => {
  // States

  const { products, totalRecords, fetchProductPage, loading } =
    useProductState();
  const { fetchCategoryPage, categories } = useCategoryState();

  const [modal, setModal] = useState<{ open: boolean; data?: any }>({
    open: false,
  });

  const [filter, setFilter] = useState<IProductFilter>({ skip: 0 });

  // Custom Hooks

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchCategoryPage({ skip: 0 });
  }, []);
  useEffect(() => {
    fetchProductPage({ ...filter });
  }, [filter]);

  // Table Header column

  return (
    <App>
      {contextHolder}

      {!modal.open ? (
        <>
          <TopNav />

          <>
            <div className="px-2">
              <ApSearchInput
                placeholder="What are you looking for?"
                className="border px-4 rounded-full mb-3 mt-1 py-1 w-full bg-slate-100 "
                onSearchChange={(val) => setFilter({ ...filter, keyword: val })}
              />
            </div>

            {loading ? (
              <div className="h-40 flex items-center justify-center">
                <ApLoader />
              </div>
            ) : (
              <>
                <div className="w-screen px-2">
                  <p className="pb-3  font-semibold">Categories</p>

                  <div className="flex  gap-3 mb-2">
                    <div
                      className="flex items-center flex-col "
                      onClick={() => setFilter({ ...filter, categoryId: "" })}
                    >
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center"></div>

                      <p className="text-sm font-semibold mt-1">All</p>
                    </div>

                    <div className="overflow-x-scroll flex gap-3 ">
                      {categories.map((c) => (
                        <CategoryListItem
                          category={c}
                          key={c._id}
                          onClick={() =>
                            setFilter({ ...filter, categoryId: c._id })
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 px-2">
                  {products.map((p) => (
                    <ProductListItem
                      product={p}
                      key={p._id}
                      onViewDetail={() => setModal({ open: true, data: p })}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        </>
      ) : (
        <ProductDetail
          product={modal.data}
          onDissmiss={() => {
            setModal({ open: false, data: null });
          }}
        />
      )}
    </App>
  );
};

export default ProductsPage;
