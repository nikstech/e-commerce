import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    navbarHamburgur: false,
    loginSignupModal: false
}

export const LayoutSlice = createSlice({
    name: 'layout',
    initialState, 
    reducers: {
        hamburgerrToggle: (state,action) =>{
            return {
                ...state,
                navbarHamburgur: action.payload,
            }
        },
        loginSignupModalToggle: (state,action) => {
            return {
                ...state,
                loginSignupModal: action.payload,

            }
        }
    }
})

export const { hamburgerrToggle, loginSignupModalToggle } = LayoutSlice.actions;
export default LayoutSlice.reducer;