import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUserAction : (state, action) =>{
        return {
            ...state,
            authData: action.payload
        }
    }
  },
});

export const { authUserAction } = AuthSlice.actions;
export default AuthSlice.reducer;
