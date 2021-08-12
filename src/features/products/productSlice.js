import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductApi from "../../api/productAPI";
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (param) => {
    const { data } = await ProductApi.getAll(param);
    return data;
  }
);
export const removeProduct = createAsyncThunk(
  "product/removeProduct",
  async ({ token, id, userId }, { rejectWithValue }) => {
    try {
      const { data } = await ProductApi.delete(token, id, userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const addProducts = createAsyncThunk(
  "product/addProducts",
  async ({ product, token, id }, { rejectWithValue }) => {
    try {
      const { data } = await ProductApi.add(product, token, id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ product, token, productId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await ProductApi.update(
        product,
        token,
        productId,
        userId
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const getById = createAsyncThunk("product/getById", async (param) => {
  const { data } = await ProductApi.get(param);
  return data;
});
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
    [addProducts.pending]: (state) => {
      state.loading = true;
    },
    [addProducts.fulfilled]: (state, actions) => {
      state.loading = false;
      // state.listProduct = actions.payload;
    },
    [addProducts.rejected]: (state, actions) => {
      state.loading = false;
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

    [removeProduct.pending](state) {
      state.loading = true;
    },
    [removeProduct.fulfilled](state, actions) {
      state.loading = false;
      state.listProduct.itemsList = state.listProduct.itemsList.filter(
        (product) => product._id !== actions.payload._id
      );
    },
    [removeProduct.rejected](state) {
      state.loading = false;
    },
    [updateProduct.pending](state) {
      state.loading = true;
    },
    [updateProduct.fulfilled](state, actions) {
      state.loading = false;
    },
    [updateProduct.rejected](state) {
      state.loading = false;
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
