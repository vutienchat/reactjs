import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { customName } from "../../../Util";
import { isAuthenticate } from "../../../auth";
import { useDispatch, useSelector } from "react-redux";
import {
  getListCategory,
  removeCategory,
} from "../../../features/category/categorySlice";
import imgLoading from "../../../image/Ajux_loader.gif";
import Image from "../../../components/website/Image";
import Swal from "sweetalert2";
import { unwrapResult } from "@reduxjs/toolkit";
const ListCategory = () => {
  const { listCategory, loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const { token, user } = isAuthenticate();
  useEffect(() => {
    const getList = async () => {
      dispatch(getListCategory());
    };
    getList();
  }, []);
  const remove = async (id) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
    Swal.fire({
      title: "Bạn có chắc chắn không?",
      text: "Danh mục sẽ bị mất vĩnh viễn",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resultAction = await dispatch(
            removeCategory({ token, categoryId: id, userId: user._id })
          );
          const originalPromiseResult = unwrapResult(resultAction);
          Toast.fire({
            icon: "success",
            title: "Xóa Thành công",
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
  return loading ? (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 ">
      <img className="w-28" src={imgLoading} alt="" />
    </div>
  ) : listCategory && listCategory.length > 0 ? (
    <div className="w-full fade">
      <Link to="/admin/category/add">
        {" "}
        <button
          type="button"
          className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg mb-5"
        >
          Thêm Sản Phẩm
        </button>
      </Link>

      <table className="min-w-max w-full table-auto text-center shadow-md box-border">
        <thead>
          <tr className="bg-white text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 font-medium">#</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Image</th>
            <th className="py-3 px-6">action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {listCategory.map((category, i) => {
            return (
              <tr
                key={i}
                className="border-b border-gray-200 bg-white hover:bg-gray-100 w-full box-border"
              >
                <td className="py-3 whitespace-nowrap font-medium">{i + 1}</td>
                <td className="py-3 ">{customName(category.name)}</td>
                <td className="py-3 flex justify-center ">
                  <Image
                    url={`${process.env.REACT_APP_API_IMG_CATEGORY}/${category._id}`}
                    classname="w-20 h-24 object-cover fade"
                  />

                  {/* <img
                    className="w-20 h-24 object-cover"
                    src={`${process.env.REACT_APP_API_IMG_CATEGORY}/${category._id}`}
                    alt={category.name}
                  /> */}
                </td>
                <td className="py-3">
                  <div className="flex item-center justify-center">
                    <span>
                      <Link to={`/admin/category/edit?id=${category._id}`}>
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
                      </Link>
                    </span>
                    <span
                      className="w-4 pl-3  hover:text-blue-500 cursor-pointer"
                      id="btn-remove"
                      onClick={() => remove(category._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className=" h-5 w-5 hover:text-blue-500 transform hover:scale-110 text-base"
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
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    "NO PRODUCTS"
  );
};

export default ListCategory;
