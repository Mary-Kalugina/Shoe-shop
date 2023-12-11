import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCatalogItems(state, action) {
      state.items = action.payload;
    },
  }
});

export const {setCatalogItems} = catalogSlice.actions;
export default catalogSlice.reducer;