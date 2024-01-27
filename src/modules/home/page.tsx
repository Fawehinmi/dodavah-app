import React, { useEffect } from "react";
import { useProductState } from "../product/context";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useRouter } from "next/router";
import ProductListItem from "../product/components/productListItem";
import { ApImage } from "../../components/image";
import ApLoader from "../../components/spinner";
import ApButton from "../../components/button";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { TypeAnimation } from "react-type-animation";

const HomePage = () => {
  const { loading, products, fetchProductPage } = useProductState();

  const router = useRouter();

  useEffect(() => {
    fetchProductPage({ skip: 0, take: 10 });
  }, []);
  return (
    <div className="">
      <div className="lg:h-screen h-[70vh] relative">
        <Carousel
          className="lg:h-screen h-[70vh]"
          autoPlay
          interval={1200000}
          showIndicators={false}
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          infiniteLoop
        >
          <div className="lg:h-screen h-[70vh] relative">
            <img
              src="/beauty-black-mixed-race-african-american-woman-with-long-curly-hair-perfect-smile-looking-camera-smiling-blue.jpg"
              className="h-full w-full object-cover "
              alt="Home img"
            />
            <div className="absolute h-full inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white">
              <div className="lg:w-3/5 lg:px-0 px-5">
                <TypeAnimation
                  sequence={[
                    // Same substring at the start will only be typed out once, initially
                    "Discover an endless world of Glamour.",
                    3000, // wait 1s before replacing "Mice" with "Hamsters"
                    "Discover an endless world of Elegance.",
                    3000,
                    "Discover an endless world of Beauty.",
                    3000,
                  ]}
                  wrapper="h1"
                  speed={15}
                  deletionSpeed={15}
                  style={{ fontSize: "2em", display: "inline-block" }}
                  repeat={Infinity}
                  className="text-4xl my-3  font-serif"
                />
                <p className="text-sm lg:text-base">
                  Welcome to Dodavah wigs, where glamour meets versatility! Step
                  into a world of endless possibilities as we bring you a
                  curated collection of exquisite wigs designed to transform
                  your style effortlessly
                </p>
                <ApButton
                  className="bg-white text-black px-5 py-2 mt-5 rounded-full hover:bg-gray-100"
                  name="Shop Now"
                  onClick={() => {
                    router.push("/product");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="lg:h-screen h-[70vh] relative">
            <img
              src="/mixed-race-black-woman-portrait-with-big-afro-hair-curly-hair-beige-background-dancing-closeup.jpg"
              className="h-full w-full object-cover"
              alt="Home img"
            />
            <div className="absolute h-full inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white">
              <div className="lg:w-3/5 lg:px-0 px-5">
                <h1 className="text-3xl my-3">
                  Elevate Your Look, Redefine Your Style at Dodavah Wigs
                </h1>

                <p className="">
                  Elevate your style, redefine your beauty, and dive into the
                  art of self-expression
                </p>
                <ApButton
                  className="bg-white text-black px-5 py-2 mt-5 rounded-full"
                  name="Our Products"
                  onClick={() => {
                    router.push("/product");
                  }}
                />
              </div>
            </div>
          </div>
        </Carousel>
      </div>

      <section className="my-4 lg:px-16 px-3">
        {loading === true ? (
          <div className="text-center">
            <ApLoader />
          </div>
        ) : (
          <>
            <div className="flex justify-between  mb-4">
              <div>
                <h1 className=" font-semibold text-lg">Recently Added</h1>
                <p>Check our recently added products</p>
              </div>

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
