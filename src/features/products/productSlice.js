import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductApi from "../../api/productAPI";
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (param, thunkApi) => {
    const { data } = await ProductApi.getAll(param);
    return data;
  }
);
export const getById = createAsyncThunk(
  "product/getById",
  async (param, thunkApi) => {
    const { data } = await ProductApi.get(param);
    return data;
  }
);
export const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    listProduct: {
      itemsList: [],
    },
    product: "",
    message: "",
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hiddenLoading: (state) => {
      state.loading = false;
    },
    addProductRd: (state, actions) => {
      state.push(actions.payload);
    },
    removeProductRd: (state, actions) => {
      state.listProduct.itemsList = state.listProduct.itemsList.filter(
        (product) => product._id !== actions.payload
      );
      // console.log(xx);
      // return {...state}
    },
    updateProductRd: (state, actions) => {
      const index = state.findIndex((items) => {
        return items._id === actions.payload._id;
      });
      // state.splice(index, 1, actions.payload);
      state[index] = actions.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, actions) => {
      state.loading = false;
      state.listProduct = actions.payload;
    },
    [fetchProducts.rejected]: (state, actions) => {
      state.loading = false;
      state.message = actions.error;
    },
    [getById.pending]: (state) => {
      state.loading = true;
    },
    [getById.fulfilled]: (state, actions) => {
      state.loading = false;
      state.product = actions.payload;
    },
    [getById.rejected]: (state, actions) => {
      state.loading = false;
      state.message = actions.error;
    },
  },
});
export const {
  showLoading,
  hiddenLoading,
  addProductRd,
  updateProductRd,
  removeProductRd,
} = productSlice.actions;
export default productSlice.reducer;
