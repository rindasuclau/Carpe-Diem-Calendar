import React from "react";
import Day from "./Day";
import classes from "./Month.module.css";

const Month = ({ month }) => {
  return (
    <div className={classes.grid}>
      {month.map((week, idx) => {
        return <React.Fragment key={idx}>
          {week.map((day, dayIdx) => {
            return <Day day={day} idx={idx} key={dayIdx} />;
          })}
        </React.Fragment>;
      })}
    </div>
  );
};

export default Month;
