import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "../../api/productAPI";
import {
  countCartLocalStorage,
  getCartLocalStorage,
  totalCartLocalStorage,
} from "../../Util";

export const addCart = createAsyncThunk("cart/addCart", async (param) => {
  return await new Promise((resolve) => setTimeout(() => resolve(param), 2000));
});
export const editCart = createAsyncThunk("cart/editCart", async (param) => {
  return await new Promise((resolve) => setTimeout(() => resolve(param), 2000));
});
export const removeCart = createAsyncThunk("cart/removeCart", async (param) => {
  return await new Promise((resolve) => setTimeout(() => resolve(param), 2000));
});
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    listCart: getCartLocalStorage(),
    countCart: countCartLocalStorage(getCartLocalStorage()),
    totalCart: totalCartLocalStorage(getCartLocalStorage()),
  },
  reducers: {
    countCart(state, actions) {
      state.countCart = countCartLocalStorage(actions.payload);
    },
    totalCart(state, actions) {
      state.totalCart = totalCartLocalStorage(actions.payload);
    },
    removeListCart(state) {
      state.listCart = [];
    },
  },
  extraReducers: {
    [addCart.pending]: (state, actions) => {
      state.loading = true;
    },
    [addCart.fulfilled]: (state, actions) => {
      state.loading = false;
      const existed = state.listCart.findIndex(
        (cart) => cart._id === actions.payload._id
      );
      if (existed < 0) {
        state.listCart.push(actions.payload);
      } else {
        state.listCart[existed].quantityCart += actions.payload.quantityCart;
      }
    },

    [editCart.pending]: (state, actions) => {
      state.loading = true;
    },
    [editCart.fulfilled]: (state, actions) => {
      state.loading = false;
      const existed = state.listCart.findIndex(
        (cart) => cart._id === actions.payload._id
      );
      if (existed >= 0) {
        state.listCart[existed].quantityCart += actions.payload.quantityCart;
      }
    },
    [removeCart.pending](state) {
      state.loading = true;
    },
    [removeCart.fulfilled](state, actions) {
      state.loading = false;
      state.listCart = state.listCart.filter(
        (cart) => cart._id !== actions.payload
      );
    },
  },
});
export const { countCart, totalCart, removeListCart } = cartSlice.actions;
export default cartSlice.reducer;
