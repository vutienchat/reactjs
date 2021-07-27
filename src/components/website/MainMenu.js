import React, { useEffect, useState } from "react";
import categoryApi from "../../api/categoryAPI";
import { NavLink } from "react-router-dom";
import { customName } from "../../Util";
const MainMenu = () => {
  const [listCategory, setListCategory] = useState([]);
  useEffect(() => {
    const getNameCategory = async () => {
      const { data } = await categoryApi.getAll(4);
      setListCategory(data);
    };
    getNameCategory();
  }, []);
  return (
    <nav className="hidden lg:block">
      <ul className="main-menu flex">
        <li className="menu-item">
          <NavLink exact className="px-3 menu-link main-text" to="/">
            Home
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink className=" px-3 menu-link main-text" to="/products">
            Products
          </NavLink>
        </li>
        {listCategory.map((category) => {
          return (
            <li key={category._id} className="menu-item">
              <NavLink
                className="px-3 menu-link main-text"
                to={`/category/${category.name}?id=${category._id}`}
              >
                {customName(category.name)}
              </NavLink>
            </li>
          );
        })}
        <li className="menu-item">
          <NavLink className="px-3 menu-link main-text" to="/contact">
            Contact
          </NavLink>
        </li>
      </ul>

      {/* <ul className="flex flex-col absolute z-20 top-0 left-0  h-screen lg:h-full w-full sm:w-4/6 md:w-2/6 lg:w-full bg-red-400 lg:bg-transparent  lg:static lg:flex-row">
        <div className=" flex items-center justify-end bg-white px-2 md:px-5 h-20 lg:hidden">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
        <li className="overflow-hidden">
          <NavLink
            className="px-4 text-main-menu transition duration-500"
            to="/"
          >
            Home
          </NavLink>{" "}
        </li>
        <li className="overflow-hidden">
          <NavLink
            className="px-4 text-main-menu transition duration-500"
            to="/products"
          >
            Products
          </NavLink>
        </li>

        <li className="overflow-hidden">
          <NavLink
            className="px-4 text-main-menu transition duration-500"
            to="/"
          >
            Contact Us
          </NavLink>
        </li>
      </ul> */}
    </nav>
  );
};

export default MainMenu;
