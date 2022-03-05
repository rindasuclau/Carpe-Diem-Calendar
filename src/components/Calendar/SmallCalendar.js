import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../../store/redux";
import getMonth from "../../utils/utils";
import CalendarHeader from "../UI/CalendarHeader";
import classes from "./SmallCalendar.module.css";

const SmallCalendar = (props) => {
  const dispatch = useDispatch();

  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const monthIndex = useSelector((state) => state.calendar.monthIndex);
  const selectedDay = useSelector((state) => state.calendar.selectedDay);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  const prevMonthHandler = () => {
    setCurrentMonthIndex((monthIndex) => {
      return monthIndex - 1;
    });
  };

  const nextMonthHandler = () => {
    setCurrentMonthIndex((monthIndex) => {
      return monthIndex + 1;
    });
  };

  const getDayClass = (day) => {
    const format = "YYYY-MM-DD";
    if (day.format(format) === dayjs().format(format)) {
      return classes["current-day"];
    } else if (selectedDay && selectedDay === day.format(format)) {
      return classes["selected-day"];
    } else {
      return "";
    }
  };

  const dayHandler = (day) => {
    dispatch(calendarActions.setMonthIndex(day.month()));
    dispatch(calendarActions.setSelectedDay(day.format("YYYY-MM-DD")));
  };

  return (
    <div className={classes.container}>
      <CalendarHeader
        left
        monthIndex={currentMonthIndex}
        nextMonth={nextMonthHandler}
        prevMonth={prevMonthHandler}
        titleClass={classes["month-title"]}
      />
      <div className={classes.calendar}>
        {currentMonth[0].map((day, idx) => {
          return (
            <span key={idx} className={classes["day-letter"]}>
              {day.format("dd").charAt(0)}
            </span>
          );
        })}
        {currentMonth.map((week, weekIdx) => {
          return (
            <React.Fragment key={weekIdx}>
              {week.map((day, dayIdx) => {
                return (
                  <button
                    key={dayIdx}
                    className={`${classes.day} ${getDayClass(day)}`}
                    onClick={() => {
                      dayHandler(day);
                    }}
                  >
                    <span>{day.format("D")}</span>
                  </button>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default SmallCalendar;
