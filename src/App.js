import React, { useState } from "react";
import ProductApi from "./api/productAPI";
import Routers from "./Routers";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  countCartLocalStorage,
  getCartLocalStorage,
  setCartLocalStorage,
  totalCartLocalStorage,
} from "./Util";
const App = () => {
  const [listCart, setListCart] = useState(getCartLocalStorage());
  const [countCart, setCountCart] = useState(countCartLocalStorage());
  const [totalCart, setTotalCart] = useState(totalCartLocalStorage());
  const getproduct = async (id) => {
    try {
      const { data } = await ProductApi.get(id);
      const { photo, ...product } = data;
      return product;
    } catch (error) {
      console.log(error);
    }
  };
  const addCart = async (id) => {
    const isCart = listCart.findIndex((cart) => cart._id === id);
    if (isCart < 0) {
      const newCart = await getproduct(id);
      newCart.quantityCart = 1;
      setListCart([...listCart, newCart]);
      setCartLocalStorage([...listCart, newCart]);
    } else {
      let updateCart = listCart;
      updateCart[isCart]["quantityCart"]++;
      setListCart(updateCart);
      setCartLocalStorage(updateCart);
    }
    // setCountCart(countCartLocalStorage());
    setTotalCart(totalCartLocalStorage());
  };
  const removeCartItem = (id) => {
    const newCart = listCart.filter((list) => list._id !== id);
    setListCart(newCart);
    setCartLocalStorage(newCart);
    // setCountCart(countCartLocalStorage());
    setTotalCart(totalCartLocalStorage());
  };
  return (
    <>
      <Routers
        onCart={addCart}
        listCart={listCart}
        countCart={countCart}
        totalCart={totalCart}
        removeCartItem={removeCartItem}
      />
    </>
  );
};

export default App;
