import { createSlice } from "@reduxjs/toolkit";

// bitcoin,ethereum,solana,cardano,terra-luna,polkadot
export const coinsSlice = createSlice({
  name: "coins",
  initialState: {
    coins: [
      "bitcoin",
      "ethereum",
      "solana",
      "cardano",
      "terra-luna",
      "polkadot",
    ],
    pricesInUsd: {},
    coinDetails: [],
  },
  reducers: {
    addCoin: (state, action) => {
      state.coins.push(action.payload);
    },
    removeCoin: (state, action) => {
      state.coins = state.coins.filter((coin) => coin !== action.payload);
    },
    updatePrices: (state, action) => {
      state.pricesInUsd = action.payload;
    },
    updateCoinDetails: (state, action) => {
      state.coinDetails = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchCoinDetails.fulfilled, (state, action) => {
  //     state.coinDetails = action.payload;
  //   });
  // },
});

export const { addCoin, removeCoin, updatePrices, updateCoinDetails } =
  coinsSlice.actions;

export default coinsSlice.reducer;
