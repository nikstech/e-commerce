import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryListDropDown: false,
  filterListDropDown: false,
  searchDropDown: false,
  loading: false,
  products: null,
};

export const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    categoryListDropDownAction: (state, action) => {
      return {
        ...state,
        categoryListDropDown: action.payload,
        filterListDropDown: false,
        searchDropDown: false,
      };
    },
    filterListDropDownAction: (state, action) => {
      return {
        ...state,
        categoryListDropDown: false,
        filterListDropDownAction: action.payload,
        searchDropDown: false,
      };
    },
    searchDropDownAction: (state, action) => {
      return {
        ...state,
        categoryListDropDown: false,
        filterListDropDown: false,
        searchDropDownAction: action.payload,
      };
    },
    loadingAction: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setProductAction: (state, action) => {
      return {
        ...state,
        products: action.payload,
      };
    },
  },
});

export const {
  categoryListDropDownAction,
  filterListDropDownAction,
  searchDropDownAction,
  loadingAction,
  setProductAction,
} = HomeSlice.actions;
export default HomeSlice.reducer;
