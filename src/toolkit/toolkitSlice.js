import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  searchText: '',
  cart: [],
  id: 0,
  categories: [],
  topSales: []
};

const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState,
  reducers: {
    setCatalogItems(state, action) {
        state.items = action.payload;
    },
    setSearchValue(state, action) {
      state.searchText = action.payload;
    },
    setCart(state, action) {
      state.cart = action.payload;
    },
    showItem(state, action) {
      state.id = action.payload
    }, 
    setTopSales(state, action) {
      state.topSales = action.payload;
    }
  }
});

export default toolkitSlice.reducer;
export const { setCatalogItems, setSearchValue, setCart, showItem, setTopSales } = toolkitSlice.actions;
