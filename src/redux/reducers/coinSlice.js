import { createSlice } from '@reduxjs/toolkit';

const coinSlice = createSlice({
  name: 'coin',
  initialState: {
    name: null
  },
  reducers: {
    SetCoin: (state, action) => {
      state.name = action.payload;
    }
  }
});

export const { SetCoin } = coinSlice.actions;
export default coinSlice.reducer;