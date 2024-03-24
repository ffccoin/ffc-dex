import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./features/limit/orderSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add your reducers here
      order: orderReducer,
    },
  });
};
