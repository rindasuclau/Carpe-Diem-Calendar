import classes from "./Header.module.css";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { calendarActions } from "../../store/redux";
import CalendarHeader from "../UI/CalendarHeader";
import Dropdown from "../UI/Dropdown";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth-slice";

const displayOptions = ["Month", "Week"];

const Header = () => {
  const monthIndex = useSelector((state) => state.calendar.monthIndex);
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const viewMode = useSelector(state => state.calendar.viewMode);

  const monthView = viewMode === "Month" ? true : false;


  const resetHandler = () => {
    const currIndex = dayjs().month() + Math.random(); // Update it even if it didn't change.
    dispatch(calendarActions.setSelectedDay(dayjs().format("YYYY-MM-DD")));
    dispatch(calendarActions.setMonthIndex(currIndex));
  };

  const nextMonthHandler = () => {
    if (monthView) {
      dispatch(calendarActions.increment());
    } else {
      dispatch(calendarActions.incrementWeek());
    }
  };

  const prevMonthHandler = () => {
    if (monthView) {
      dispatch(calendarActions.decrement());
    } else {
      dispatch(calendarActions.decrementWeek());
    }
  };

  const viewModeHandler = (mode) => {
    dispatch(calendarActions.setViewMode(mode));
  }

  const authHandler = () => {
    if (isLoggedIn) {
      dispatch(authActions.logout());
    } else {
      history.push("/login");
    }
  }

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
      <span className={classes.filler} />
      <Dropdown
        onChange={viewModeHandler}
        options={displayOptions}
        value={viewMode}
        className={classes.dropdown}
      />
      <button type="button" className={classes.auth} onClick={authHandler}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </header>
  );
};

export default Header;
