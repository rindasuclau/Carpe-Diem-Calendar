import dayjs from "dayjs";
import React from "react";
import classes from "./CalendarHeader.module.css";

const CalendarHeader = (props) => {
  const displayedMonthTitle = dayjs(
    new Date(dayjs().year(), props.monthIndex)
  ).format("MMMM YYYY");

  const prevMonthHandler = () => {
    props.prevMonth();
  };

  const nextMonthHandler = () => {
    props.nextMonth();
  };

  return (
    <div>
      <header className={classes.header}>
        {props.left && (
          <p className={props.titleClass}>{displayedMonthTitle}</p>
        )}
        <div className={classes.actions}>
          <button
            className={classes["icon-wrapper"]}
            onClick={prevMonthHandler}
          >
            <span className={`material-icons`}>chevron_left</span>
          </button>
          <button
            className={classes["icon-wrapper"]}
            onClick={nextMonthHandler}
          >
            <span className={`material-icons`}>chevron_right</span>
          </button>
        </div>
        {props.right && (
          <p className={props.titleClass}>{displayedMonthTitle}</p>
        )}
      </header>
    </div>
  );
};

export default CalendarHeader;
