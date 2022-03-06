import { createSlice } from "@reduxjs/toolkit";

const authState = { isLoggedIn: false, token: "", expiresIn: 0 };

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
    setToken(state, token) {
      state.token = token.payload;
    },
    setExpireTime(state, time) {
      state.expiresIn = +time.payload;
    }
  },
});


export const authActions = authSlice.actions;

export default authSlice;
