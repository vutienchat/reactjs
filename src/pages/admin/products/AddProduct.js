import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import SelectCategory from "../../../components/admin/products/SelectCategory";
import { isAuthenticate } from "../../../auth";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../../features/products/productSlice";
import playholderImg from "../../../image/playholder-img.jpg";
import { unwrapResult } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
const AddProduct = () => {
  const dispatch = useDispatch();
  const [urlImgPreview, setUrlImgPreview] = useState(playholderImg);
  const { loading } = useSelector((state) => state.product);
  const { register, handleSubmit } = useForm();
  const { token, user } = isAuthenticate();
  const history = useHistory();
  const onSelectFile = (e) => {
    const file = e.target.files[0];
    setUrlImgPreview(URL.createObjectURL(file));
  };
  const addProduct = async (product) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
    try {
      const resultAction = await dispatch(
        addProducts({ product, token, id: user._id })
      );
      unwrapResult(resultAction);
      Toast.fire({
        icon: "success",
        title: "Thêm sản phẩm Thành công",
      });
      history.push("/admin/product");
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error,
      });
    }
  };
  const photo = { ...register("photo") };
  const onHandleSubmit = (data) => {
    const fd = new FormData();
    fd.append("name", data.nameProduct);
    fd.append("old_price", parseInt(data.old_price));
    fd.append("new_price", parseInt(data.new_price));
    fd.append("description", data.description);
    fd.append("classify", parseInt(data.classify));
    fd.append("quantity", data.quantity);
    fd.append("shipping", data.shipping === "1" ? true : false);
    fd.append("photo", data.photo[0]);
    fd.append("category", data.category);
    addProduct(fd);
  };
  return (
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
                Add Product
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Name Product
            </label>
            <input
              {...register("nameProduct")}
              className="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent ring-opacity-50"
              type="text"
              placeholder="Name Product"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Old Price
              </label>
              <input
                {...register("old_price")}
                className="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent ring-opacity-50"
                type="text"
                placeholder="Old Price"
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                New Price
              </label>
              <input
                {...register("new_price")}
                className="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent ring-opacity-50"
                type="text"
                placeholder="New Price"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Category
            </label>
            <select
              {...register("category")}
              className="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent ring-opacity-50 text-gray-400"
            >
              <SelectCategory />
            </select>
          </div>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Quantity
            </label>
            <input
              type="text"
              {...register("quantity")}
              className="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent ring-opacity-50"
              placeholder="Quantity"
            />
          </div>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Description
            </label>
            <textarea
              name=""
              {...register("description")}
              className="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent ring-opacity-50"
              cols="30"
              rows="7"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 mt-5 mx-7">
            <div>
              <p className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                classify
              </p>
              <div className="flex mt-2">
                <span className="flex items-center pr-2">
                  <label htmlFor="classify1">Đặc Biệt</label>
                  <input
                    type="radio"
                    value="1"
                    {...register("classify", { required: true })}
                    id="classify1"
                  />
                </span>
                <span className="flex items-center">
                  <label htmlFor="classify2">Bình Thường</label>
                  <input
                    type="radio"
                    defaultChecked
                    value="0"
                    {...register("classify", { required: true })}
                    id="classify2"
                  />
                </span>
              </div>
            </div>
            <div>
              <p className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                shipping
              </p>
              <div className="flex mt-2">
                <span className="flex items-center  pr-2">
                  <label htmlFor="shipping2"> Chưa Hoàn Thành</label>
                  <input
                    defaultChecked
                    value="0"
                    {...register("shipping", { required: true })}
                    type="radio"
                    id="shipping2"
                  />
                </span>
                <span className="flex items-center">
                  <label htmlFor="shipping1">Hoàn Thành</label>
                  <input
                    value="1"
                    {...register("shipping", { required: true })}
                    type="radio"
                    id="shipping1"
                  />
                </span>
              </div>
            </div>
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
            <div className="w-28 h-32">
              <img
                className="w-full h-full object-cover"
                src={urlImgPreview}
                alt=""
              />
            </div>
          </div>
          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <button className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
              Cancel
            </button>
            <button className="inline-flex items-center w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 ring-opacity-50">
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
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
                ""
              )}
              Add product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
