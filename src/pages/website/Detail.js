import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Related from "../../components/website/detail/Related";
import { customName } from "../../Util";
import ReactImageZoom from "react-image-zoom";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../features/products/productSlice";
import { addCart } from "../../features/cart/cartSlice";
import Swal from "sweetalert2";
const Detail = () => {
  const { product, loading } = useSelector((state) => state.product);
  const { loading: loadingAddCart } = useSelector((state) => state.cart);
  const productDetail = product;
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [quantityProduct, setQuantityProduct] = useState(1);
  const editQtyMinus = () => {
    if (quantityProduct > 1) {
      setQuantityProduct(quantityProduct - 1);
    }
  };
  const editQtyplus = () => {
    if (quantityProduct < productDetail.quantity)
      setQuantityProduct(quantityProduct + 1);
  };
  const addToCart = async () => {
    await dispatch(
      addCart({ ...productDetail, quantityCart: quantityProduct })
    );
    await Swal.fire({
      background: "#1a1d24",
      // showCloseButton: true,
      width: 700,
      timer: 3000,
      showCancelButton: true,
      html: `
      <div class="modal-cart text-left">
        <div
          class="modal-cart-header text-white border-b border-[#cebaa4] pb-4"
        >
          ${quantityProduct} Item added to your cart
        </div>
        <div class="flex py-5 border-b border-[#cebaa4]">
          <div class="img-modalCart">
            <img
              class="w-28 object-cover h-full"
              src="	https://binshop.herokuapp.com/api/product/photo/${
                productDetail._id
              }"
            />
          </div>
          <div class="info-modal-cart pl-3">
            <div class="text-white">${productDetail.name}</div>
            <p class="text-[#707070]">Quantity: ${quantityProduct}</p>
            <div>
              <span class="text-[#707070]">Cart Subtotal: </span
              ><span class="main-text-active">${new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(quantityProduct * productDetail.new_price)}</span>
            </div>
          </div>
        </div>
        </div>
        `,
      showConfirmButton: false,
    });
  };
  useEffect(() => {
    const getProductDetail = async () => {
      dispatch(getById(productId));
    };
    getProductDetail();
  }, [productId]);
  const imageZoom = {
    width: 500,
    zoomPosition: "original",
    img: `${process.env.REACT_APP_API_IMG_PRODUCT}/${productDetail._id}`,
  };
  return loading ? (
    <div className="h-full flex items-center justify-center">
      <img
        src="https://img.pikbest.com/58pic/35/39/61/62K58PICb88i68HEwVnm5_PIC2018.gif!w340"
        alt=""
      />
    </div>
  ) : (
    <div className="container fade">
      <section className=" overflow-hidden">
        <div className="container pt-20 pb-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-2/5 w-full  h-1/2 rounded border border-[#cebaa4] overflow-hidden hover:cursor-[crosshair]">
              {productDetail ? <ReactImageZoom {...imageZoom} /> : ""}
            </div>
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
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(productDetail.new_price)}
              </div>
              <div>
                <div className="flex flex-row my-3">
                  <div
                    className=" border border-[#cebaa4]  text-[#cebaa4] hover:text-white hover:bg-[#cebaa4] h-14 w-14 flex cursor-pointer"
                    onClick={editQtyMinus}
                  >
                    <span className="m-auto">
                      <i className="bi bi-dash"></i>
                    </span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max={productDetail.quantity}
                    value={quantityProduct}
                    className="pl-2.5 text-xs text-white md:text-base bg-transparent h-14 w-14 border border-[#cebaa4] focus:outline-none text-center transform mn"
                    readOnly
                  />
                  <div
                    className=" border border-[#cebaa4]  text-[#cebaa4] hover:text-white hover:bg-[#cebaa4] h-14 w-14 flex  cursor-pointer"
                    onClick={editQtyplus}
                  >
                    <span className="m-auto">
                      <i className="bi bi-plus"></i>
                    </span>
                  </div>
                </div>
              </div>
              <button
                disabled={loadingAddCart}
                className="disabled:cursor-not-allowed add-to-cart main-bg h-[54px] w-full hover:main-bg text-white flex items-center justify-center transition duration-500 cursor-pointer text-[14px] focus:outline-none "
                onClick={addToCart}
              >
                {loadingAddCart ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <div className="fade">ADD TO CART</div>
                )}
              </button>
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
