import React, { useEffect, useState } from "react";
import ProductApi from "../../../api/productAPI";
import { NavLink, Link } from "react-router-dom";
import { customName } from "../../../Util";
import { showError, showSuccess } from "../../../components/Alerts";
import { isAuthenticate } from "../../../auth";
import Pagination from "../../../components/Pagination";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  removeProduct,
  removeProductRd,
} from "../../../features/products/productSlice";
import imgLoading from "../../../image/Ajux_loader.gif";
import { unwrapResult } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
const ListProduct = () => {
  const [filters, setFilters] = useState({ _limit: 5, _page: 1 });
  const [pagination, setPagination] = useState({
    pageCount: 0,
    _page: 1,
  });
  const { listProduct, loading, message } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { token, user } = isAuthenticate();
  const handlePageClick = (newPage) => {
    setFilters({ ...filters, _page: newPage });
  };
  const remove = async (id) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });

    Swal.fire({
      title: "Bạn có chắc chắn không?",
      text: "Sản Phẩm sẽ bị mất vĩnh viễn",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resultAction = await dispatch(
            removeProduct({ token, id, userId: user._id })
          );
          unwrapResult(resultAction);
          Toast.fire({
            icon: "success",
            title: "Xóa sản phẩm Thành công",
          });
        } catch (error) {
          Toast.fire({
            icon: "error",
            title: error,
          });
        }
      }
    });
  };
  useEffect(() => {
    const getListProduct = async () => {
      try {
        const paramString = queryString.stringify(filters);
        const { payload } = await dispatch(fetchProducts(paramString));
        setPagination({
          pageCount: payload.pageCount,
          _page: payload.currentPage,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    getListProduct();
  }, [filters, dispatch]);

  return (
    <>
      {loading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 ">
          <img className="w-28" src={imgLoading} alt="" />
        </div>
      ) : // <img
      //   className="w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2"
      //   src="https://kif.info.pl/file/2018/12/lg.ring-loading-gif.gif"
      //   alt=""
      // />
      listProduct.itemsList.length > 0 ? (
        <div className="w-full fade">
          {success ? showSuccess("Xóa sản phẩm thành công") : ""}
          {error ? showError(error) : ""}
          <NavLink to="/admin/product/add">
            {" "}
            <button
              type="button"
              className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg mb-5"
            >
              Thêm Sản Phẩm
            </button>
          </NavLink>
          <div className="h-80 overflow-y-auto">
            <table className="min-w-max w-full table-auto text-center shadow-md ">
              <thead>
                <tr className="bg-white text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 font-medium">#</th>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Giá Sp</th>
                  <th className="py-3 px-6">Giá Bán</th>
                  {/* <th className="py-3 px-6">Image</th> */}
                  <th className="py-3 px-6">Phân Loại</th>
                  <th className="py-3 px-6" colSpan={2}>
                    action
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {listProduct.itemsList.map((product, i) => {
                  return (
                    <tr
                      key={i}
                      className="border-b border-gray-200 bg-white hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 whitespace-nowrap font-medium">
                        {i + 1}
                      </td>
                      <td className="py-3 px-6">{customName(product.name)}</td>
                      <td className="py-3 px-6">{product.old_price}</td>
                      <td className="py-3 px-6">{product.new_price}</td>
                      {/* <td className="py-3 px-6 w-32">
                  <img
                    src={`${process.env.REACT_APP_API_IMG_PRODUCT}/${product._id}`}
                    alt=""
                  />
                </td> */}
                      <td className="py-3 px-6">
                        {product.classify === 1 ? (
                          <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                            Đặc Biệt
                          </span>
                        ) : (
                          <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">
                            Bình thường
                          </span>
                        )}
                      </td>
                      <td className="py-3 ">
                        <Link to="/">
                          <span>
                            <i className="hover:text-blue-500 fas fa-pen transform hover:scale-125 text-base"></i>
                          </span>
                        </Link>{" "}
                        <span
                          className="w-4 pl-5  hover:text-blue-500 cursor-pointer"
                          id="btn-remove"
                        >
                          <i className="far fa-trash-alt transform hover:scale-125 text-base"></i>
                        </span>
                      </td>
                      <td className="py-3 flex">
                        <Link to={`/admin/product/edit?id=${product._id}`}>
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="hover:text-blue-500 transform hover:scale-110 text-base w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </span>
                        </Link>
                        <span
                          className="w-4 pl-3  hover:text-blue-500 cursor-pointer"
                          id="btn-remove"
                          onClick={() => remove(product._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 hover:text-blue-500 transform hover:scale-110 text-base"
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
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-10">
            <Pagination pagination={pagination} onPageClick={handlePageClick} />
          </div>
        </div>
      ) : (
        "ko"
      )}
    </>
  );
};

export default ListProduct;
