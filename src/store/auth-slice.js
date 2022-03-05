import { createSlice } from "@reduxjs/toolkit";

const authState = {isLoggedIn: false};

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
      login(state) {},
      logout(state) {},
      autoLogin(state) {}
  },
});

export const authActions = authSlice.actions;

export default authSlice;
