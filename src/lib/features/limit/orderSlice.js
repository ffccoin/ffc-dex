import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;
