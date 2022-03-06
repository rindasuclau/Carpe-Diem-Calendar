import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../../store/redux";
import classes from "./Day.module.css";

const Day = ({ day, idx }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.calendar.filteredEvents);
  
  useEffect(() => {
    const newEvents = events.filter(
      (event) =>
        dayjs(new Date(event.date)).format("DD-MM-YY") === day.format("DD-MM-YY")
    );

    setDayEvents(newEvents);
  }, [events, day]);

  const dayNameShort = day.format("ddd").toUpperCase();
  const dayShort = day.format("DD");

  const isCurrentDay = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  };

  const getCurrentDayColor = () => {
    return isCurrentDay() ? classes["current-day"] : "";
  };

  const createEventHandler = () => {
    dispatch(calendarActions.setSelectedDay(day.format("YYYY-MM-DD")));
    dispatch(calendarActions.setShowEventModal(true));
  };

  const updateEventHandler = (event) => {
    dispatch(calendarActions.setSelectedEvent(event))
  }

  return (
    <div className={classes.day}>
      <header className={classes.header}>
        {idx === 0 && (
          <p className={classes["day-short--name"]}>{dayNameShort}</p>
        )}
        <p className={`${classes["day-short"]} ${getCurrentDayColor()}`}>
          {dayShort}
        </p>
      </header>
      <div className={classes["event-area"]} onClick={createEventHandler}>
        {dayEvents.map((ev, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                updateEventHandler(ev)
              }}
              className={classes.event}
              style={{ backgroundColor: ev.color ? ev.color : "black" }}
            >
              {`${ev.startTime ? ev.startTime : ""} ${ev.title ? ev.title : "(No Title)"}`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Day;
