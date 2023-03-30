import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/get",
  async ({ sort, page }, { extra }) => {
    const { api } = extra;
    try {
      const response = await api.get(`/products/`, {
        params: { _limit: "10", _page: page, _sort: sort },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const initialState = {
  productList: [],
  pendingProducts: false,
  endOfCatalog: false,
};

export const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      state.productList = [];
      state.endOfCatalog = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.productList = payload;
        state.pendingProducts = false;
        if (payload.length === 0) {
          state.endOfCatalog = true;
        }
      })
      .addCase(getProducts.pending, (state) => {
        state.pendingProducts = true;
      })
      .addCase(getProducts.rejected, (state) => {
        state.pendingProducts = false;
      });
  },
});

export const resetProductList = slice.actions.reset;

export const selectProducts = (state) => state.productList;
export const selectEndOfCatalog = (state) => state.endOfCatalog;
export const selectPendingProducts = (state) => state.pendingProducts;

export default slice.reducer;
