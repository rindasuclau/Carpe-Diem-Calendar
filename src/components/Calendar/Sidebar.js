import React from "react";
import classes from "./Sidebar.module.css";
import CreateEventbutton from "../UI/CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";

const Sidebar = ({ month }) => {
  return (
    <aside className={classes.container}>
      <div className={classes.wrapper}>
        <CreateEventbutton />
        <SmallCalendar />
        <Labels />
      </div>
    </aside>
  );
};

export default Sidebar;
