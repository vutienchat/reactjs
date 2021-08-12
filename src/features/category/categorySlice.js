import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryApi from "../../api/categoryAPI";
export const getById = createAsyncThunk("category/getById", async (id) => {
  try {
    const { data } = await categoryApi.get(id);
    return data;
  } catch (error) {
    return error.response.data.error;
  }
});
export const getListCategory = createAsyncThunk(
  "category/getListCategory",
  async () => {
    try {
      const { data } = await categoryApi.getAll();
      return data;
    } catch (error) {
      return error.response.data.error;
    }
  }
);
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ category, token, id }, { rejectWithValue }) => {
    try {
      const { data } = await categoryApi.add(category, token, id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const removeCategory = createAsyncThunk(
  "category/removeCategory",
  async ({ token, categoryId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await categoryApi.delete(token, categoryId, userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ data: category, token, id, userId }, { rejectWithValue }) => {
    try {
      const { data } = await categoryApi.update(category, token, id, userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    listCategory: [],
    category: "",
    // message: "",
  },
  extraReducers: {
    [getListCategory.pending](state) {
      state.loading = true;
    },
    [getListCategory.fulfilled](state, actions) {
      state.loading = false;
      state.listCategory = actions.payload;
    },
    [getListCategory.rejected](state, actions) {
      state.loading = false;
      // state.message = actions.payload;
    },
    [addCategory.pending](state) {
      state.loading = true;
    },
    [addCategory.fulfilled](state, actions) {
      state.loading = false;
      // state.listCategory = actions.payload;
    },
    [addCategory.rejected](state) {
      state.loading = false;
    },
    [removeCategory.pending](state) {
      state.loading = true;
    },
    [removeCategory.fulfilled](state, actions) {
      state.loading = false;
      state.listCategory = state.listCategory.filter(
        (category) => category._id !== actions.payload._id
      );
    },
    [removeCategory.rejected](state) {
      state.loading = false;
    },
    [updateCategory.pending](state) {
      state.loading = true;
    },
    [updateCategory.fulfilled](state, actions) {
      state.loading = false;
    },
    [updateCategory.rejected](state) {
      state.loading = false;
    },
    [getById.pending](state) {
      state.loading = true;
    },
    [getById.fulfilled](state, actions) {
      state.loading = false;
      state.category = actions.payload;
    },
  },
});
export default categorySlice.reducer;
