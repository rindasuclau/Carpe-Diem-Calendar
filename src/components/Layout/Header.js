import classes from "./Header.module.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import getMonth from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { calendarActions } from "../../store/redux";

const Header = () => {
  const monthIndex = useSelector((state) => state.calendar.monthIndex);
  const currentMonth = dayjs(new Date(dayjs().year(), monthIndex, 1));
  const dispatch = useDispatch();

  const resetHandler = () => {
    const currIndex = dayjs().month();
    dispatch(calendarActions.setMonthIndex(currIndex));
  };

  const nextMonthHandler = () => {
      dispatch(calendarActions.increment())
  };

  const prevMonthHandler = () => {
    dispatch(calendarActions.decrement())
  };

  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" className={classes.logo} />
      <h1>Calendar</h1>
      <button className={classes.today} onClick={resetHandler}>
        Today
      </button>
      <button className={classes["icon-wrapper"]} onClick={prevMonthHandler}>
        <span className={`material-icons`}>chevron_left</span>
      </button>
      <button className={classes["icon-wrapper"]} onClick={nextMonthHandler}>
        <span className={`material-icons`}>chevron_right</span>
      </button>
      <h3 className={classes.month}>{currentMonth.format("MMMM YYYY")}</h3>
    </header>
  );
};

export default Header;
