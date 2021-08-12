import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  countCart,
  removeCart,
  totalCart,
} from "../../../features/cart/cartSlice";
import { customName, setCartLocalStorage } from "../../../Util";
const ListCart = () => {
  const { listCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    setCartLocalStorage(listCart);
    dispatch(countCart(listCart));
    dispatch(totalCart(listCart));
  }, [listCart]);
  const removeCartItem = async (id) => {
    try {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      await dispatch(removeCart(id));
      Toast.fire({
        icon: "success",
        title: "Đã xóa sản phẩm khỏi giỏ hàng",
      });
    } catch (error) {}
  };
  return (
    <div className="table_cart">
      <table className=" w-full text-center table-hover my-8">
        <thead>
          <tr className="border-b-[3px] border-[#cebaa4]">
            <th className="w-1/4 text-left text-white text-sm">TÊN SẢN PHẨM</th>
            <th className="text-white text-sm">HÌNH</th>
            <th className="text-white text-sm">ĐƠN GIÁ</th>
            <th className="text-white text-sm">SỐ LƯỢNG</th>
            <th className="text-white text-sm">THÀNH TIỀN</th>
          </tr>
        </thead>
        <tbody>
          {listCart.map((cart) => {
            return (
              <tr key={cart._id} className="border-b border-[#cebaa4] ">
                <td className="w-1/4 text-left text-white">
                  {customName(cart.name)}
                </td>
                <td className="flex justify-center">
                  <Link to={`/product/${cart._id}`}>
                    <img
                      className="h-40 py-4 object-cover fade"
                      src={`${process.env.REACT_APP_API_IMG_PRODUCT}/${cart._id}`}
                      alt=""
                    />
                  </Link>
                </td>
                <td className="text-primary text-[#707070]">
                  {cart.new_price}
                </td>
                <td>
                  <div className="cart-name flex items-center justify-center mt-5">
                    <span>
                      <div className="flex flex-row border border-[#cebaa4]">
                        <div
                          data-id={cart._id}
                          className="text-[#cebaa4] hover:text-white hover:bg-[#cebaa4] h-7 w-7 flex cursor-pointer"
                        >
                          <span className="m-auto">-</span>
                        </div>
                        <input
                          data-id={cart._id}
                          type="text"
                          value={cart.quantityCart}
                          className="text-[#707070] text-xs md:text-base bg-transparent h-7 w-7 focus:outline-none text-center"
                          readOnly
                        />
                        <div
                          data-id={cart._id}
                          className="text-[#cebaa4] hover:text-white hover:bg-[#cebaa4] h-7 w-7 flex  cursor-pointer"
                        >
                          <span className="m-auto">+</span>
                        </div>
                      </div>
                    </span>
                  </div>
                </td>
                <td className="text-primary text-[#707070]">
                  {cart.new_price * cart.quantityCart}
                </td>
                <td onClick={() => removeCartItem(cart._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white duration-500 transform  hover:scale-125 hover:text-[#c27b43] cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListCart;
