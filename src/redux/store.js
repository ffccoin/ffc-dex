import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "./reducers/coinSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      coin: coinReducer,
    },
  });
};
