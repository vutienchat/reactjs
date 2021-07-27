import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="px-3 sm:px-0">
      <div className="border-t-4 border-gray-700 my-16" />
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 pb-5">
          <div className="contact">
            <ul>
              <li className="text-xl text-white leading-10"> Contact Us</li>
              <li className="leading-10 relative">
                <span className="main-text absolute top-0">Phone: </span>
                <Link className="text-white pl-[77px]" to={`/`}>
                  +98 0 9876 0954
                </Link>
              </li>
              <li className="leading-10 relative">
                <span className="main-text absolute top-0">Email: </span>
                <Link className="text-white pl-[77px]" to={`/`}>
                  Chatvtph11586@fpt.edu.vn
                </Link>
              </li>
              <li className="leading-10 relative">
                <span className="main-text absolute top-0">Address:</span>
                <p className="text-white pl-[77px]">
                  Box 565, Charlestown, Nevis, West Indies, Caribbean
                </p>
              </li>
              <li className="leading-10 relative">
                <span className="main-text absolute top-0">Social:</span>
                <span className="text-white pl-[77px]">Facebook:</span>
              </li>
            </ul>
          </div>
          <div className="support md:flex w-full justify-center">
            <ul>
              <li className="leading-10 relative">
                <span className="text-xl text-white">Support</span>
              </li>
              <li className="leading-10">
                <Link to={`/`} className="main-text hover:main-text">
                  Contact Us
                </Link>
              </li>
              <li className="leading-10">
                <Link to={`/`} className="main-text hover:main-text">
                  Feedback
                </Link>
              </li>
              <li className="leading-10">
                <Link to={`/`} className="main-text hover:main-text">
                  Unsubscribe
                </Link>
              </li>
              <li className="leading-10">
                <Link to={`/`} className="main-text hover:main-text">
                  Reservations
                </Link>
              </li>
            </ul>
          </div>
          <div className="policies px-5">
            <ul>
              <li className="leading-10">
                <span className="text-xl text-white">Policies</span>
              </li>
              <li className="leading-10">
                <Link to={`/`} className="main-text hover:main-text">
                  Privacy Policy
                </Link>
              </li>
              <li className="leading-10">
                <Link to={`/`} className="main-text hover:main-text">
                  Terms Of Use
                </Link>
              </li>
              <li className="leading-10">
                <Link to={`/`} className="main-text hover:main-text">
                  Gift Card Conditions
                </Link>
              </li>
              <li className="leading-10">
                <Link to={`/`} className="main-text hover:main-text">
                  Shipping
                </Link>
              </li>
              <li className="leading-10">
                <Link to={`/`} className="main-text hover:main-text">
                  Return
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-white">
            <ul>
              <li className="leading-10">
                <span className="text-xl text-white">Join Our Newsletter</span>
              </li>
              <li className="text-yellow-op hover:text-yellow-op leading-10">
                Subscribe to our newsletter and get 10% off your first purchase
              </li>
              <li className="leading-10">
                <input
                  type="text"
                  className="rounded-sm px-4 py-2 mt-3 focus:outline-none bg-gray-700 bg-opacity-50 w-full"
                  placeholder="Your email Address"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
