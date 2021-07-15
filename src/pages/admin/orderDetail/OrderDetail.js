import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderDetailApi from "../../../api/OrderDetailAPI";
const OrderDetail = () => {
  const { idorder } = useParams();
  const [listOrderDetail, setLostOrderDetail] = useState([]);
  useEffect(() => {
    const getOrderDetail = async () => {
      const { data } = await OrderDetailApi.get(idorder);
      setLostOrderDetail(data);
    };
    getOrderDetail();
  }, [idorder]);
  return (
    <table className="w-full table-auto text-center shadow-md fade">
      <thead>
        <tr className="bg-white text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 font-medium">#</th>
          <th className="py-3 px-6 font-medium">Name</th>
          <th className="py-3 px-6 font-medium">Image</th>
          <th className="py-3 px-6 font-medium">Price</th>
          <th className="py-3 px-6 font-medium">Quantity</th>
          <th className="py-3 px-6 font-medium">Total</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {listOrderDetail.map((detailItem, index) => {
          return (
            <tr className="border-b border-gray-200 bg-white hover:bg-gray-100">
              <td className="py-3 px-6 whitespace-nowrap font-medium">
                {index + 1}
              </td>
              <td className="py-3 px-6">{detailItem.productId.name}</td>
              <td className="py-3 px-6">
                <img
                  className="w-20 mx-auto"
                  src={`${process.env.REACT_APP_API_IMG_PRODUCT}/${detailItem.productId._id}`}
                  alt=""
                />
              </td>
              <td className="py-3 px-6">{detailItem.productId.new_price}</td>
              <td className="py-3 px-6">{detailItem.quantity}</td>
              <td className="py-3 px-6">{detailItem.intomoney}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrderDetail;
