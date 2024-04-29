import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "./reducers/coinSlice";
import proposalsReducer from "./reducers/proposalsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      coin: coinReducer,
      proposals: proposalsReducer,
    },
  });
};
