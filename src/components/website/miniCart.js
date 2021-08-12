import React from "react";
import { customName } from "../../Util";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editCart, removeCart } from "../../features/cart/cartSlice";
const MiniCart = ({
  openCart,
  setOpenCart,
  // listCart,
  setbgOverlay,
  // totalCart,
  // countCart,
}) => {
  const { listCart, loading, countCart, totalCart } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const remove = (id) => {
    dispatch(removeCart(id));
  };

  const updateCart = (dataEdit, qtyEdit) => {
    dispatch(editCart({ ...dataEdit, quantityCart: qtyEdit }));
  };

  return (
    <div
      className={`mini-cart relative fixed w-full sm:w-4/6 md:w-2/6 bg-white h-screen top-0 right-0 z-20 transition duration-500 ${
        openCart ? "" : "relative transform translate-x-full"
      } `}
    >
      {loading ? (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-70 flex items-center justify-center fade">
          <svg
            className="animate-spin h-7 w-7 main-text-active"
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
        </div>
      ) : (
        ""
      )}
      <div className="header-cart-title  flex items-center justify-between bg-gray-300 px-2 md:px-5 h-20">
        <span>Shopping Cart ({countCart})</span>
        <span
          onClick={() => {
            setOpenCart(false);
            setbgOverlay(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      {listCart.length > 0 ? (
        <>
          <div className="cart-wrapper px-2 md:px-5 overflow-y-auto h-full box-border pt-7">
            <div className="h-60 overflow-y-auto scrollbar-w-2">
              {listCart.map((cartItem) => {
                return (
                  <div
                    key={cartItem._id}
                    className="mini-cart-item flex justify-between border-b py-3 border-gray-300"
                  >
                    <div className="cart-item-img w-16 h-20">
                      <Link to="/">
                        <img
                          src={`${process.env.REACT_APP_API_IMG_PRODUCT}/${cartItem._id}`}
                          className="w-16 h-20 object-cover"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="flex-col w-10/12 pl-6">
                      <div className="cart-item-name flex items-center justify-between">
                        <span>{customName(cartItem.name)}</span>
                        <span onClick={() => remove(cartItem._id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-gray-500 cursor-pointer"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="cart-name flex items-center justify-between mt-5">
                        <span>
                          <div className="flex flex-row border border-[#cebaa4]">
                            <div
                              onClick={() => updateCart(cartItem, -1)}
                              data-id={cartItem._id}
                              className="text-[#cebaa4] hover:text-white hover:bg-[#cebaa4] h-7 w-7 text-center cursor-pointer"
                            >
                              <span className="m-auto">-</span>
                            </div>
                            <input
                              data-id={cartItem._id}
                              type="text"
                              value={cartItem.quantityCart}
                              className=" text-xs md:text-base text-center block w-7  focus:outline-none "
                              readOnly
                            />
                            <div
                              data-id={cartItem._id}
                              onClick={() => updateCart(cartItem, 1)}
                              className="text-[#cebaa4] hover:text-white hover:bg-[#cebaa4] h-7 w-7 text-center  cursor-pointer"
                            >
                              <span className="m-auto">+</span>
                            </div>
                          </div>
                        </span>
                        <span className="cart-item-price text-gray-500">
                          {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                          }).format(cartItem.quantityCart * cartItem.new_price)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="total-cart flex items-center justify-between py-8">
              <span>Subtotal</span>
              <span className="text-gray-500">
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(totalCart)}
              </span>
            </div>
            <div className="mini-cart-actions">
              <div className="checkout w-full bg-yellow-700 bg-opacity-75 h-16 flex items-center justify-center">
                <span className="text-white text-xl">Checkout</span>
              </div>
              <Link to="/cart">
                <div className="view-cart w-full h-16 border border-yellow-600 flex items-center justify-center my-3">
                  <span className="text-yellow-600 text-xl">View cart</span>
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="px-2 text-[#707070] text-center">
          Your cart is currently empty.
        </div>
      )}
    </div>
  );
};

export default MiniCart;
