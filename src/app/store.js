import { configureStore } from "@reduxjs/toolkit";
import api from "./client";
import reducer from "./reducer";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api,
        },
      },
    }),
});

export default store;
