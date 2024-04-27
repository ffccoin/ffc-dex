import { createSlice } from '@reduxjs/toolkit';

const coinSlice = createSlice({
  name: 'coin',
  initialState: {
    name: null
  },
  reducers: {
    setCoin: (state, action) => {
      state.name = action.payload;
    }
  }
});

export const { setCoin } = coinSlice.actions;
export default coinSlice.reducer;