import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../../store/redux";
import getMonth, { getWeekTimeMatrix } from "../../utils/utils";
import classes from "./Week.module.css";

const Week = ({ month }) => {
  const dispatch = useDispatch();
  const weekIdx = useSelector((state) => state.calendar.weekIndex);
  const selectedDay = useSelector((state) => state.calendar.selectedDay);
  const [currentWeek, setCurrentWeek] = useState(month[weekIdx]);
  const monthIndex = useSelector((state) => state.calendar.monthIndex);
  const events = useSelector((state) => state.calendar.filteredEvents);

  useEffect(() => {
    const week = getMonth(monthIndex)[weekIdx];
    setCurrentWeek(week);
  }, [weekIdx, monthIndex]);

  useEffect(() => {
    if (selectedDay) {
      const week = month.filter((week) => {
        let hasDay = false;
        for (let d of week) {
          const day = d.format("YYYY-MM-DD");
          if (day === selectedDay) {
            hasDay = true;
            break;
          }
        }
        return hasDay;
      })[0];
      if (week) {
        setCurrentWeek(week);
      }
    }
  }, [selectedDay, month]);

  const getSelectedDayClasses = (day) => {
    let selClass = null;
    if (day.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")) {
      selClass = classes.today;
    } else if (selectedDay && selectedDay === day.format("YYYY-MM-DD")) {
      selClass = classes["selected-day"];
    } else {
      selClass = "";
    }
    return selClass;
  };

  const getEventsArrayForDay = (day) => {
    const newEvents = events.filter(
      (event) =>
        dayjs(new Date(event.date)).format("YYYY-MM-DD") ===
        day.format("YYYY-MM-DD")
    );

    return newEvents;
  };

  const updateEventHandler = (event) => {
    dispatch(calendarActions.setSelectedEvent(event));
    dispatch(calendarActions.setSelectedDay(event.date))
    dispatch(calendarActions.setShowEventModal(true));
  };

  return (
    <div className={classes.week}>
      <header className={classes.header}>
        <div className={classes["header-container"]}>
          {currentWeek.map((day, idx) => {
            return (
              <span
                key={idx}
                style={{ gridColumn: idx + 2 }}
                className={classes["day-short-name"]}
              >
                {day.format("ddd")}
              </span>
            );
          })}
          {currentWeek.map((day, idx) => {
            return (
              <React.Fragment key={idx}>
                <button
                  style={{ gridColumn: idx + 2 }}
                  className={` ${
                    classes["btn-day-short"]
                  } ${getSelectedDayClasses(day)}`}
                >
                  <span className={classes["day-short"]}>
                    {day.format("DD")}
                  </span>
                </button>
                <div
                  className={classes["event-container"]}
                  style={{
                    gridColumn: idx + 2,
                    gridRow: 3,
                  }}
                >
                  {getEventsArrayForDay(day).map((ev, i) => {
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          updateEventHandler(ev);
                        }}
                        className={classes.event}
                        style={{
                          backgroundColor: ev.color ? ev.color : "black",
                          gridColumn: idx + 2,
                          gridRow: 3,
                        }}
                      >
                        {`${ev.startTime ? ev.startTime : ""} ${
                          ev.title ? ev.title : "(No Title)"
                        }`}
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div className={classes["time-grid"]}>
          {getWeekTimeMatrix()[0].map((time, i) => {
            return (
              <span
                className={classes.time}
                style={{ gridRow: i + 1, gridColumn: 1 }}
              >
                {time}
              </span>
            );
          })}
          {getWeekTimeMatrix().map((day, i) => {
            return (
              <React.Fragment key={i}>
                {day.map((t, idx) => {
                  return (
                    <div
                      className={classes.column}
                      style={{ gridRow: idx + 1, gridColumn: i + 2 }}
                      key={idx}
                    >
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </header>
    </div>
  );
};

export default Week;
