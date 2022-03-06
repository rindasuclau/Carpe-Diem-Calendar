import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const calendarState = {
  monthIndex: dayjs().month(),
  selectedDay: dayjs().format("YYYY-MM-DD"),
  selectedEvent: null,
  showEventModal: false,
  startTime: null,
  weekIndex: 0,
  viewMode: "Month",
  labels: [],
  events: [],
  filteredEvents: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState: calendarState,
  reducers: {
    setMonthIndex(state, newIndex) {
      state.monthIndex = newIndex.payload;
      state.weekIndex = 0;
    },
    increment(state) {
      state.monthIndex++;
    },
    decrement(state) {
      state.monthIndex--;
    },
    incrementWeek(state) {
      if (state.weekIndex <= 3) {
        state.weekIndex++;
      } else {
        state.weekIndex = 0;
        ++state.monthIndex;
      }
    },
    decrementWeek(state) {
      if (state.weekIndex >= 1) {
        state.weekIndex--;
      } else {
        state.weekIndex = 4;
        --state.monthIndex;
      }
    },

    setSelectedDay(state, day) {
      state.selectedDay = day.payload;
    },
    setShowEventModal(state, value) {
      state.showEventModal = value.payload;
    },

    loadEvents(state, events) {
      for (let key in events.payload) {
        const newEvent = events.payload[key];
        newEvent.key = key;
        state.events.push(newEvent)
      }
    },

    addEvent(state, event) {
      console.log(event.payload);
      state.events.push(event.payload);
    },
    removeEvent(state, eventId) {
      state.events = state.events.filter(
        (event) => event.id !== eventId.payload
      );
      state.selectedEvent = null;
      state.showEventModal = false;
    },
    updateEvent(state, event) {
      const newEvent = event.payload;
      state.events = state.events.map((ev) =>
        ev.id === newEvent.id ? newEvent : ev
      );
    },
    setSelectedEvent(state, event) {
      state.selectedEvent = event.payload;
    },
    setStartTime(state, time) {
      state.startTime = time.payload;
    },
    setLabels(state) {
      state.labels = [...new Set(state.events.map((event) => event.color))].map(
        (color) => {
          const currentLabel = state.labels.find((lbl) => lbl.color === color);
          return {
            color,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    },
    updateLabel(state, label) {
      state.labels = state.labels.map((lb) => {
        return label.payload.color === lb.color ? label.payload : lb;
      });
    },
    setFilteredEvents(state, newEvents) {
      state.filteredEvents = newEvents.payload ? newEvents.payload.slice() : [];
    },
    setViewMode(state, mode) {
      state.viewMode = mode.payload;
      state.weekIndex = 0;
    },
  },
});

export default calendarSlice;
