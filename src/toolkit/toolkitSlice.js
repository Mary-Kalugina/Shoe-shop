import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: '',
  cart: [],
  id: 0,
  categories: [],
  topSales: [],
  activeTab: 'Главная'
};

const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchText = action.payload;
    },
    setCartToolkit(state, action) {
      state.cart = action.payload;
    },
    showItem(state, action) {
      state.id = action.payload
    }, 
    setTopSales(state, action) {
      state.topSales = action.payload;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setCategoriesArr(state, action) {
      state.categories = action.payload;
    },
  }
});

export default toolkitSlice.reducer;
export const { setSearchValue, setCartToolkit, showItem, setTopSales, setActiveTab, setCategoriesArr } = toolkitSlice.actions;
