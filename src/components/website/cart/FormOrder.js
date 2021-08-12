import React from "react";
import { useForm } from "react-hook-form";
import OrderAPI from "../../../api/OrderAPI";
import OrderDetailApi from "../../../api/OrderDetailAPI";
import { getCartLocalStorage } from "../../../Util";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { removeListCart } from "../../../features/cart/cartSlice";
const FormOrder = () => {
  const { totalCart, countCart, listCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const addOrder = async (order) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
    const { data } = await OrderAPI.add(order);
    listCart.map(async (item) => {
      const orderDetails = {
        orderId: data._id,
        productId: item._id,
        quantity: item.quantityCart,
        intomoney: item.quantityCart * item.new_price,
      };
      try {
        await OrderDetailApi.add(orderDetails);
      } catch (error) {
        console.log(error);
      }
    });
    await Toast.fire({
      icon: "success",
      title: "Bạn đã đặt hàng thành công",
    });
    localStorage.removeItem("cart");
    dispatch(removeListCart());
    history.push("/");
  };
  const onSubmit = (data) => {
    addOrder({ ...data, total: totalCart, quantity: countCart });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name")}
        className="w-full md:w-10/12 p-2 my-4 border border-[#cebaa4] placeholder-[#cebaa4] focus:outline-none focus:border-[#c27b43] text-white bg-transparent transition duration-300"
        placeholder="Họ và Tên"
        type="text"
      />
      <input
        {...register("address")}
        className="w-full md:w-10/12 p-2 my-4 border border-[#cebaa4] placeholder-[#cebaa4] focus:outline-none focus:border-[#c27b43] text-white bg-transparent transition duration-300"
        placeholder="Địa chỉ giao hàng"
        type="text"
      />
      <input
        {...register("phone")}
        className="w-full md:w-10/12 p-2 my-4 border border-[#cebaa4] placeholder-[#cebaa4] focus:outline-none focus:border-[#c27b43] text-white bg-transparent transition duration-300"
        placeholder="số điện thoại"
        type="text"
      />
      <input
        {...register("email")}
        className="w-full md:w-10/12 p-2 my-4 border border-[#cebaa4] placeholder-[#cebaa4] focus:outline-none focus:border-[#c27b43] text-white bg-transparent transition duration-300"
        placeholder="Địa chỉ email"
        type="email"
      />
      <br />
      <textarea
        {...register("node")}
        className="w-full md:w-10/12 p-2 my-4 border border-[#cebaa4] placeholder-[#cebaa4] focus:outline-none focus:border-[#c27b43] text-white bg-transparent transition duration-300"
        placeholder="Ghi chú"
      ></textarea>
      <button
        id="order"
        className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
      >
        Đặt Hàng
      </button>
    </form>
  );
};

export default FormOrder;
