import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { showError, showSuccess } from "../../../components/Alerts";
import categoryApi from "../../../api/categoryAPI";
import { customName } from "../../../Util";
import { isAuthenticate } from "../../../auth";
const ListCategory = () => {
  const [listCategory, setListCategory] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { token, user } = isAuthenticate();
  useEffect(() => {
    const getListCategory = async () => {
      try {
        const { data } = await categoryApi.getAll();
        setListCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    getListCategory();
  }, []);
  const remove = async (id) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    try {
      await categoryApi.delete(token, id, user._id);
      const newListCategory = listCategory.filter(
        (category) => category._id !== id
      );
      setListCategory(newListCategory);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  return (
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
      {success ? showSuccess("Xóa danh mục thành công") : ""}
      {error ? showError(error) : ""}
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
                <td className="py-3 flex justify-center">
                  <img
                    className="w-20 h-24 object-cover"
                    src={`${process.env.REACT_APP_API_IMG_CATEGORY}/${category._id}`}
                    alt={category.name}
                  />
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
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategory;
