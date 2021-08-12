import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  customName,
  setCartLocalStorage,
  totalCartLocalStorage,
} from "../../Util";
import Image from "./Image";
import threeDot from "../../image/three-dots-black.svg";
import { useDispatch, useSelector } from "react-redux";
import { addCart, countCart, totalCart } from "../../features/cart/cartSlice";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const ListProduct = ({ listProduct, onCart }) => {
  const { listCart, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    setCartLocalStorage(listCart);
    dispatch(countCart(listCart));
    dispatch(totalCart(listCart));
  }, [listCart]);
  const addItem = async (product) => {
    const quantityCart = 1;
    await dispatch(addCart({ ...product, quantityCart }));

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
            ${quantityCart} Item added to your cart
          </div>
          <div class="flex py-5 border-b border-[#cebaa4]">
            <div class="img-modalCart">
              <img
                class="w-28 object-cover h-full"
                src="	https://binshop.herokuapp.com/api/product/photo/${
                  product._id
                }"
              />
            </div>
            <div class="info-modal-cart pl-3">
              <div class="text-white">${product.name}</div>
              <p class="text-[#707070]">Quantity: ${quantityCart}</p>
              <div>
                <span class="text-[#707070]">Cart Subtotal: </span
                ><span class="main-text-active">${new Intl.NumberFormat(
                  "de-DE",
                  {
                    style: "currency",
                    currency: "EUR",
                  }
                ).format(quantityCart * product.new_price)}</span>
              </div>
            </div>
          </div>
          </div>
          `,
      // <div class="modal-cart-footer flex pt-5">

      //  <Link to="">
      //  <div class="bg-white py-3 px-4 main-text" >continue shopping</div>
      //  </Link>
      //   <Link to=""><div class="main-bg-active py-3 px-4 text-white" >proceed to cart</div></Link>
      // </div>
      showConfirmButton: false,
    });
  };
  if (listProduct.length > 0) {
    return (
      <div className="container px-3 md:px-0 pt-16 pb-7">
        <div className="box-product grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 ">
          {listProduct.map((product) => {
            return (
              <div className="product-item fade bg-gray" key={product._id}>
                <div className="img-product h-56 sm:h-80 lg:h-72 relative overflow-hidden bg-gray-400">
                  <NavLink to={`/product/${product._id}`}>
                    <Image
                      url={`${process.env.REACT_APP_API_IMG_PRODUCT}/${product._id}`}
                      classname="object-cover transition duration-500 w-full h-full absolute top-0 left-0 img-main"
                    />
                  </NavLink>
                  <div className="product-action absolute bottom-2 w-full hidden sm:block">
                    <div className="flex justify-center ">
                      <button
                        disabled={loading}
                        onClick={() => addItem(product)}
                        className="disabled:cursor-not-allowed cursor-pointer main-bg-active p-3 mx-0.5 hover:main-bg main-text hover:text-white transition duration-500 transform translate-y-full opacity-0  add-product focus:outline-none"
                      >
                        {loading ? (
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                        )}
                      </button>
                      <span className="cursor-pointer bg-white p-3 mx-0.5 hover:main-bg main-text hover:text-white transition duration-500 transform translate-y-full opacity-0 delay-100  detail-product">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </span>
                      <span className="cursor-pointer bg-white p-3 mx-0.5 hover:main-bg main-text hover:text-white transition duration-500 delay-200 transform translate-y-full opacity-0  heart-product">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </span>
                      <span className="cursor-pointer bg-white p-3 mx-0.5 hover:main-bg main-text hover:text-white transition duration-500 delay-300 transform translate-y-full opacity-0 com-product">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 "
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="content-product pt-3">
                  <div className="name-product flex  justify-between">
                    <NavLink
                      className="text-white hover:text-yellow-600"
                      to={`/product/${product._id}`}
                    >
                      {customName(product.name)}
                    </NavLink>
                    <span className="pl-2 sm:pl-0 sm:hidden text-white">
                      <i className="bi bi-basket text-sm"></i>
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-5 flex-wrap">
                    <div className="star-product flex">
                      <span className="main-text text-md cursor-pointer pr-1">
                        <i className="bi bi-star-fill"></i>
                      </span>
                      <span className="main-text text-md cursor-pointer pr-1">
                        <i className="bi bi-star-fill"></i>
                      </span>
                      <span className="main-text text-md cursor-pointer pr-1">
                        <i className="bi bi-star-fill"></i>
                      </span>
                      <span className="main-text text-md cursor-pointer pr-1">
                        <i className="bi bi-star-fill"></i>
                      </span>
                      <span className="main-text text-md cursor-pointer pr-1">
                        <i className="bi bi-star-fill"></i>
                      </span>
                    </div>
                    <div className="price-product text-yellow-600">
                      {new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                      }).format(product.new_price)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container px-3 md:px-0 pt-16 pb-7">
        <div className="text-[#cebaa4] text-center text-4xl">
          No products ...
        </div>
      </div>
    );
  }
};

export default ListProduct;
