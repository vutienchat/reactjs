import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAuthenticate } from "../../../auth";
import { useDispatch, useSelector } from "react-redux";
import {
  getById,
  updateCategory,
} from "../../../features/category/categorySlice";
import imgLoading from "../../../image/Ajux_loader.gif";
import Swal from "sweetalert2";
import { unwrapResult } from "@reduxjs/toolkit";
const EditCategory = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = queryString.parse(useLocation().search);
  const { category, loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, user } = isAuthenticate();
  const [urlImgPreview, setUrlImgPreview] = useState("");
  const onSelectFile = (e) => {
    setUrlImgPreview(URL.createObjectURL(e.target.files[0]));
  };
  const update = async (data) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
    try {
      const resultAction = await dispatch(
        updateCategory({ data, token, id, userId: user._id })
      );
      unwrapResult(resultAction);
      Toast.fire({
        icon: "success",
        title: "Sửa danh mục Thành công",
      });
      history.push("/admin/category");
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error,
      });
    }
  };
  useEffect(() => {
    const categoryEdit = async () => {
      const x = await dispatch(getById(id));
      const { photo, ...newCategory } = x.payload;
      reset(newCategory);
    };
    categoryEdit();
  }, [reset, dispatch, id]);
  const onHandleSubmit = (data) => {
    const fd = new FormData();
    fd.append("name", data.name);
    if (data.photo.length > 0) {
      fd.append("photo", data.photo[0]);
    }

    update(fd);
  };
  const photo = { ...register("photo") };
  return loading ? (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 ">
      <img className="w-28" src={imgLoading} alt="" />
    </div>
  ) : !category ? (
    ""
  ) : (
    <div className="w-full fade">
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="grid bg-white rounded-lg shadow-xl">
          <div className="flex justify-center py-4">
            <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl">
                EDIT Category
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Name Category
            </label>
            <input
              {...register("name")}
              className="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent ring-opacity-50"
              type="text"
              placeholder="Name Product"
            />
            {/* <div className="text-red-500">{errors.name && "Tên danh mục không được để trống và không quá 32 ký tự"}</div> */}
          </div>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
              Upload Photo
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-gray-300 group">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    className="w-10 h-10 text-gray-400 group-hover:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="lowercase text-sm text-gray-400 group-hover:text-gray-600 pt-1 tracking-wider">
                    Select a photo
                  </p>
                </div>
                <input
                  name="photo"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    photo.onChange(e); // method from hook form register
                    onSelectFile(e); // your method
                  }}
                  onBlur={photo.onBlur}
                  ref={photo.ref}
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <div className="w-28 h-36">
              {category ? (
                <img
                  className="w-full h-full object-cover"
                  src={
                    urlImgPreview
                      ? urlImgPreview
                      : `${process.env.REACT_APP_API_IMG_CATEGORY}/${category._id}`
                  }
                  alt=""
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <button className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
              Cancel
            </button>
            <button className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 ring-opacity-50">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
