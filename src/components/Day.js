import dayjs from "dayjs";
import classes from "./Day.module.css";

const Day = ({ day, idx }) => {
  const dayNameShort = day.format("ddd").toUpperCase();
  const dayShort = day.format("DD");

  const getCurrentDayClass = () => {
      return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? classes["current-day"] : "";
  }
  return (
    <div className={classes.day}>
      <header className={classes.header}>
        {idx === 0 && <p className={classes["day-short--name"]}>{dayNameShort}</p>}
        <p className={`${classes["day-short"]} ${getCurrentDayClass()}`}>{dayShort}</p>
      </header>
    </div>
  );
};

export default Day;
