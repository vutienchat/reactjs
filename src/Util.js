import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export const customName = (name = "") => {
  let newName = name.split(" ");
  newName = newName
    .map((item) => {
      return item.substr(0, 1).toUpperCase() + item.substr(1).toLowerCase();
    })
    .join(" ");
  return newName;
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};
export const getCartLocalStorage = () => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  return cart;
};
export const setCartLocalStorage = (listCart) => {
  localStorage.setItem("cart", JSON.stringify(listCart));
};
export const totalCartLocalStorage = () => {
  const result = getCartLocalStorage().reduce((accumulator, cart) => {
    return accumulator + cart.quantityCart * cart.new_price;
  }, 0);
  return result;
};
export const countCartLocalStorage = (data) => {
  if (data) {
    const result = data.reduce((accumulator, cart) => {
      return accumulator + cart.quantityCart;
    }, 0);
    return result;
  }
};
