import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./features/coins/coinsSlice";
import { coinsApi } from "./services/coins";

export const makeStore = () => {
  return configureStore({
    reducer: {
      coins: coinsReducer,
      [coinsApi.reducerPath]: coinsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(coinsApi.middleware),
  });
};
