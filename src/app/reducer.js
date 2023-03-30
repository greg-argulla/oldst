import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/get",
  async (_, { extra }) => {
    const { api } = extra;
    try {
      const { data } = await api.get(`/products/`);
      return data.results;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const initialState = {
  productList: [],
  pendingProducts: false,
};

export const slice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.productList = payload;
        state.pendingProducts = false;
      })
      .addCase(getProducts.pending, (state) => {
        state.pendingProducts = true;
      })
      .addCase(getProducts.rejected, (state) => {
        state.pendingProducts = false;
      });
  },
});

export const selectProducts = (state) => state.products.productList;

export const selectPendingMonthlyUseByLotSize = (state) =>
  state.products.pendingProducts;

export default slice.reducer;
