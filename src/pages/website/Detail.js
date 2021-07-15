import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductApi from "../../api/productAPI";
import Related from "../../components/website/detail/Related";
import { customName } from "../../Util";
import ReactImageZoom from "react-image-zoom";
const Detail = () => {
  const [productDetail, setProductDetail] = useState("");
  const { productId } = useParams();
  
  useEffect(() => {
    const getProductDetail = async () => {
      const { data } = await ProductApi.get(productId);
      setProductDetail(data);
    };
    getProductDetail();
  }, [productId]);
  const imageZoom = {
    width: 500,
    zoomPosition: "original",
    img: `${process.env.REACT_APP_API_IMG_PRODUCT}/${productDetail._id}`,
  };
  return (
    <div className="container">
      <section className=" overflow-hidden">
        <div className="container pt-20 pb-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-2/5 w-full  h-1/2 rounded border border-[#cebaa4] overflow-hidden hover:cursor-[crosshair]">
              {
              productDetail ? <ReactImageZoom {...imageZoom} /> : ''
              }
            </div>
            {/* <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-[#cebaa4]" src={`http://localhost:4000/api/product/photo/${productDetail._id}`} /> */}
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-white text-3xl title-font font-medium mb-1">
                {customName(productDetail.name)}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-[#c27b43] ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </a>
                </span>
              </div>
              <div className="text-[#c27b43] text-2xl">
                {productDetail.new_price}
              </div>
              <div>
                <div className="flex flex-row my-5">
                  <div className=" border border-[#cebaa4]  text-[#cebaa4] hover:text-white hover:bg-[#cebaa4] h-14 w-14 flex cursor-pointer">
                    <span className="m-auto">-</span>
                  </div>
                  <input
                    type="number"
                    value="1"
                    className="pl-2.5 text-xs text-white md:text-base bg-transparent h-14 w-14 border border-[#cebaa4] focus:outline-none text-center transform mn"
                    readOnly
                  />
                  <div className=" border border-[#cebaa4]  text-[#cebaa4] hover:text-white hover:bg-[#cebaa4] h-14 w-14 flex  cursor-pointer">
                    <span className="m-auto">+</span>
                  </div>
                </div>
              </div>
              <p className="leading-relaxed text-[#707070]">
                {productDetail.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Related productid={productId} />
    </div>
  );
};

export default Detail;
