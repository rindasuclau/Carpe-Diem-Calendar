import { configureStore, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const calendarState = {
    monthIndex: dayjs().month()
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState: calendarState,
  reducers: {
    setMonthIndex(state, newIndex) {
        state.monthIndex = newIndex.payload;
    },
    increment(state) {
        state.monthIndex++;
    },
    decrement(state) {
        state.monthIndex--;
    }
  },
});

const store = configureStore({
  reducer: { calendar: calendarSlice.reducer },
});

export const calendarActions = calendarSlice.actions;

export default store;
