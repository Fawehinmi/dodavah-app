import React, { useEffect } from "react";
import { useProductState } from "../product/context";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useRouter } from "next/router";
import ProductListItem from "../product/components/productListItem";
import { ApImage } from "../../components/image";
import ApLoader from "../../components/spinner";
import ApButton from "../../components/button";

const HomePage = () => {
  const { loading, products, fetchProductPage } = useProductState();

  const router = useRouter();

  useEffect(() => {
    fetchProductPage({ skip: 0, take: 10 });
  }, []);
  return (
    <div className="px-16">
      <div className="h-screen"></div>

      <section className="my-4">
        {loading === true ? (
          <div className="text-center">
            <ApLoader />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className=" font-bold">Recently Added</p>
              <div className="flex items-center gap-3">
                <p
                  className="font-semibold text-sm cursor-pointer"
                  onClick={() => router.push("/product")}
                >
                  View all products
                </p>
                <HiOutlineArrowNarrowRight />
              </div>
            </div>

            <div className="flex relative overflow-x-auto w-full gap-4">
              {products.map((p) => (
                <div className="w-60 px-3 py-4 rounded-md shadow-md bg-gray-100 cursor-pointer">
                  <div className="h-36  relative">
                    <ApImage
                      src={p.images[0].uri}
                      alt="Product Image"
                      className="full-image object-contain rounded-sm"
                    />
                  </div>

                  <p className="text-sm text-center py-1 font-semibold cursor-pointer">
                    {p?.name}
                  </p>

                  <div className="flex gap-2 justify-center">
                    <p className="text-sm font-semibold ">
                      ₦ {p.price.toFixed(2)} /
                    </p>
                    <p className="text-sm font-semibold  text-red-600">
                      ₦ {p.priceBefore.toFixed(2)}
                    </p>
                  </div>
                </div>

                // <ProductListItem
                //   onViewDetail={() => {}}
                //   product={p}
                //   key={p._id}
                // />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;
