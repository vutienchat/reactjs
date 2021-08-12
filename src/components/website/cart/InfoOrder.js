import React from "react";
import { useSelector } from "react-redux";
import { customName } from "../../../Util";

const InfoOrder = () => {
  const { listCart, totalCart } = useSelector((state) => state.cart);
  return (
    <div className="border-2 border-[#cebaa4] p-4 mt-4">
      <div className="text-2xl mb-4 font-semibold text-white">
        ĐƠN HÀNG CỦA BẠN
      </div>
      <div className="flex justify-between border-b-[2px] border-[#cebaa4] py-2">
        <div className="font-semibold text-white">Sản Phẩm</div>
        <div className="font-semibold mr-4 text-white">Tổng</div>
      </div>
      {listCart.map((cart) => {
        return (
          <div
            className="flex justify-between py-2  border-b border-[#cebaa4]"
            key={cart._id}
          >
            <div className="text-[#707070]">{customName(cart.name)}</div>
            <div className=" mr-4 text-[#707070]">
              {cart.new_price * cart.quantityCart}
            </div>
          </div>
        );
      })}

      <div className="don_hang_total">
        <div className="flex justify-between py-2  border-b border-[#cebaa4] ">
          <div className="font-semibold text-white">Tổng</div>
          <div className="text-primary mr-4 text-[#707070]" id="totalOrder">
            {totalCart}
          </div>
        </div>
      </div>
      <div className="py-4 text-[#707070]">
        Thực hiện thanh toán khi hàng đã giao, Khách hàng có quyền kiểm tra hàng
        trước khi thanh toán
      </div>
    </div>
  );
};

export default InfoOrder;
