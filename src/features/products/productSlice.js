import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    getList: (state, actions) => {
      return (state = actions.payload);
    },
    addProductRd: (state, actions) => {
      state.push(actions.payload);
    },
    updateProductRd: (state, actions) => {
      const index = state.findIndex((items) => {
        return items._id === actions.payload._id;
      });
      // state.splice(index, 1, actions.payload);
      state[index] = actions.payload;
    },
  },
});
export const { getList, addProductRd, updateProductRd } = productSlice.actions;
export default productSlice.reducer;
