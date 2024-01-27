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
          <div className="flex bg-gray-100">
            <div className="w-2/12 py-2 text-lg font-semibold bg-white mt-1  px-2 hidden lg:block">
              <p className="bold text-xl font-montserrat">Filter Product</p>
              {/* <ApSearchInput
                placeholder="What are you looking for?"
                className="border px-4 text-xs mb-3 mt-1 py-2 w-full hover:border-none hover:outline-none focus:outline-none bg-slate-100 "
                onSearchChange={(val) => setFilter({ ...filter, keyword: val })}
              /> */}
              <div className="mt-3">
                <p className="pb-1 font-semibold">Category</p>

                <div className="grid grid-cols-2  gap-1">
                  <div className="flex items-center flex-col bg-gray-100 rounded-lg text-dark">
                    <p className="text-sm font-semibold py-1 ">All</p>
                  </div>

                  {categories.map((c) => (
                    <CategoryListItem
                      category={c}
                      key={c._id}
                      onClick={() =>
                        setFilter({ ...filter, categoryId: c._id })
                      }
                      selected={true}
                    />
                  ))}
                </div>
              </div>
              {/* <div className="flex justify-center">
                    <ApButton
                      className="bg-rose-500 text-white px-2 text-base py-1 rounded-sm"
                      name="Apply filters"
                      onClick={() => fetchProductPage({ ...filter })}
                    />
                  </div> */}
            </div>
            <div className="w-full lg:w-10/12 h-screen py-2 px-2">
              {loading ? (
                <div className="w-full h-96 flex items-center justify-center">
                  <ApLoader />
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 px-2">
                  {products.map((p) => (
                    <ProductListItem
                      product={p}
                      key={p._id}
                      onViewDetail={() => setModal({ open: true, data: p })}
                    />
                  ))}
                  {products.map((p) => (
                    <ProductListItem
                      product={p}
                      key={p._id}
                      onViewDetail={() => setModal({ open: true, data: p })}
                    />
                  ))}
                  {products.map((p) => (
                    <ProductListItem
                      product={p}
                      key={p._id}
                      onViewDetail={() => setModal({ open: true, data: p })}
                    />
                  ))}
                  {products.map((p) => (
                    <ProductListItem
                      product={p}
                      key={p._id}
                      onViewDetail={() => setModal({ open: true, data: p })}
                    />
                  ))}
                  {products.map((p) => (
                    <ProductListItem
                      product={p}
                      key={p._id}
                      onViewDetail={() => setModal({ open: true, data: p })}
                    />
                  ))}
                  {products.map((p) => (
                    <ProductListItem
                      product={p}
                      key={p._id}
                      onViewDetail={() => setModal({ open: true, data: p })}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
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
