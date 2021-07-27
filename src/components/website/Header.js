import React, { useState, useEffect } from "react";
import MainMenu from "./MainMenu";
import { NavLink, Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import MiniCart from "./miniCart";
import { isAuthenticate, signOut } from "../../auth";
const Header = (props) => {
  const { countCart } = props;
  const [openCart, setOpenCart] = useState(false);
  const [bgOverlay, setbgOverlay] = useState(false);
  const [fixedHeader, setFixedHeader] = useState(true);
  const [openAccount, setOpenAccount] = useState(false);
  let location = useLocation();
  const history = useHistory();
  useEffect(() => {
    setOpenAccount(false);
    setOpenCart(false);
    setbgOverlay(false);
  }, [location]);
  let firstYOffset = window.pageYOffset;
  const changeFixed = () => {
    let lastYOffset = window.pageYOffset;
    if (firstYOffset > lastYOffset) {
      setFixedHeader(true);
    } else {
      setFixedHeader(false);
    }
    firstYOffset = lastYOffset;
  };
  window.addEventListener("scroll", changeFixed);
  return (
    <>
      {bgOverlay ? (
        <div className="fixed h-screen w-screen bg-black bg-opacity-50 z-20 cursor-pointer  bg-toggle-active"></div>
      ) : (
        ""
      )}

      <header
        className={
          fixedHeader
            ? "sticky w-full top-0 z-10 bg-gray transition delay-300 duration-500 px-3 md:px-10 py-5 lg:py-9"
            : "sticky w-full transform -translate-y-full top-0 z-10 bg-gray transition delay-300 duration-500 px-3 md:px-10 py-5 lg:py-9"
        }
      >
        <div className="flex items-center justify-between w-full ">
          <div className="lg:hidden icon-menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 main-text"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <div className="lg:w-2/12">
            <NavLink to="/">
              <img
                className="logo w-20"
                src="//cdn.shopify.com/s/files/1/0342/2686/4266/files/logo_liquor.png?v=1615544100"
                alt=""
              />
            </NavLink>
          </div>
          <MainMenu />
          <div className="header-right-icon flex lg:ml-auto">
            <span className="px-2">
              <svg
                className="w-5 main-text hover:main-text transition duration-500 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <span className="px-2 relative hidden lg:block">
              <svg
                onClick={() => setOpenAccount(!openAccount)}
                className=" cursor-pointer w-5 main-text hover:main-text transition duration-500 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {openAccount ? (
                <ul className="absolute top-[150%] left-0 transform -translate-x-1/2 bg-white w-48 py-5 fade  rounded-md shadow-sm">
                  <li className="flex items-center px-5 py-2.5 border-b border-gray-200 hover:text-[#c27b43] ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <Link className="pl-2 text-sm w-full" to="/signup">
                      Sign up
                    </Link>
                  </li>
                  <li className="flex items-center px-5 py-2.5 border-b border-gray-200 hover:text-[#c27b43]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <Link className="pl-2 text-sm w-full " to="/signin">
                      Sign in
                    </Link>
                  </li>
                  <li className="flex items-center border-b border-gray-200 px-5 py-2.5 hover:text-[#c27b43]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span
                      className="pl-2 text-sm w-full cursor-pointer"
                      onClick={() => {
                        signOut(() => {
                          history.push("/");
                        });
                      }}
                    >
                      Sign out
                    </span>
                  </li>
                  {isAuthenticate() && isAuthenticate().user.role === 0 ? (
                    <li className="flex items-center px-5 py-2.5  hover:text-[#c27b43]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <Link className="pl-2 text-sm w-full " to="/admin">
                        Admin
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              ) : (
                ""
              )}
            </span>
            <span className="px-2 hidden lg:block">
              <svg
                className="w-5 main-text hover:main-text transition duration-500 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </span>
            <span
              className="px-2 relative hidden lg:block"
              onClick={() => {
                setOpenCart(true);
                setbgOverlay(true);
              }}
            >
              {countCart > 0 ? (
                <span className="absolute rounded-full main-bg-active w-4 h-4 text-xs -top-1/2 right-0 text-center text-white">
                  {countCart}
                </span>
              ) : (
                ""
              )}
              <svg
                className="w-5 main-text hover:main-text transition duration-500 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </span>
          </div>
        </div>
      </header>
      <MiniCart
        {...props}
        openCart={openCart}
        setOpenCart={setOpenCart}
        setbgOverlay={setbgOverlay}
      />
    </>
  );
};

export default Header;
