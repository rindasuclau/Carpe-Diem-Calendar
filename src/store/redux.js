import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import calendarSlice from "./calendar-slice"

const store = configureStore({
  reducer: { calendar: calendarSlice.reducer, auth: authSlice.reducer },
});

export const calendarActions = calendarSlice.actions;

export default store;
