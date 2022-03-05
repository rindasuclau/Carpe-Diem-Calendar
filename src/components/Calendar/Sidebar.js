import React from "react";
import Day from "./Day";
import classes from "./Sidebar.module.css";
import CreateEventbutton from "../UI/CreateEventButton";
import SmallCalendar from "./SmallCalendar";

const Sidebar = ({ month }) => {
  return (
    <aside className={classes.container}>
      <div className={classes.wrapper}>
        <CreateEventbutton />
        <SmallCalendar />
      </div>
    </aside>
  );
};

export default Sidebar;
