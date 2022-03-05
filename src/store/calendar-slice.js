import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";


const calendarState = {
    monthIndex: dayjs().month(),
    selectedDay: null,
    selectedEvent: null,
    showEventModal: false,
    events: []
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
    },

    setSelectedDay(state, day) {
        state.selectedDay = day.payload;
    },
    setShowEventModal(state, value) {
       state.showEventModal = value.payload;
    },

    loadEvents(state, events) {
      events.forEach(event => {
        state.events.push(event);
      })
    },

    addEvent(state, event) {
      state.events.push(event.payload);
      console.log(event.payload);
    },
    removeEvent(state, eventId) {
      state.events = state.events.filter(event => event.id !== eventId.payload)
      state.selectedEvent = null;
      state.showEventModal = false;
    },
    updateEvent(state, event) {
      const newEvent = event.payload;
      state.events = state.events.map(ev => ev.id === newEvent.id ? newEvent : ev);
    },
    setSelectedEvent(state, event) {
      state.selectedEvent = event.payload;
    }

  },
});

export default calendarSlice;