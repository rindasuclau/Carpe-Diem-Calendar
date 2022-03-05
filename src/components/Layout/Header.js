import classes from "./Header.module.css";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { calendarActions } from "../../store/redux";
import CalendarHeader from "../UI/CalendarHeader";

const Header = () => {
  const monthIndex = useSelector((state) => state.calendar.monthIndex);
  const dispatch = useDispatch();

  const resetHandler = () => {
    const currIndex = dayjs().month() + Math.random(); // Update it even if it didn't change.
    dispatch(calendarActions.setMonthIndex(currIndex));
  };

  const nextMonthHandler = () => {
    dispatch(calendarActions.increment());
  };

  const prevMonthHandler = () => {
    dispatch(calendarActions.decrement());
  };

  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" className={classes.logo} />
      <h1>Calendar</h1>
      <button className={classes.today} onClick={resetHandler}>
        Today
      </button>
      <CalendarHeader
        right
        monthIndex={monthIndex}
        prevMonth={prevMonthHandler}
        nextMonth={nextMonthHandler}
        titleClass={classes["month-title"]}
      />
    </header>
  );
};

export default Header;
