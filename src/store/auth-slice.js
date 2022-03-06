import { createSlice } from "@reduxjs/toolkit";

const authState = { isLoggedIn: false, token: "" };

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});


export const authActions = authSlice.actions;

export default authSlice;
