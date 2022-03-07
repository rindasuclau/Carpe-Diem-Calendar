import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../../store/redux";
import Checkbox from "../UI/Checkbox";
import classes from "./Labels.module.css";

const Labels = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.calendar.events);
  const labels = useSelector((state) => state.calendar.labels);

  useEffect(() => {
    dispatch(calendarActions.setLabels());
  }, [dispatch, events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      return labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.color)
        .includes(event.color);
    });
  }, [labels, events]);

  useEffect(() => {
    dispatch(calendarActions.setFilteredEvents(filteredEvents));
  }, [filteredEvents, dispatch]);

  const updateLabelHandler = ({ color, checked }) => {
    dispatch(calendarActions.updateLabel({ color, checked }));
  };
  return (
    <React.Fragment>
      <p className={classes.title}>My Calendars</p>
      {labels.map(({ color, checked }, idx) => {
        return (
          color !== "green" && (
            <label key={idx} className={classes.label}>
              <Checkbox
                checked={checked}
                color={color}
                onChange={updateLabelHandler}
              />
            </label>
          )
        );
      })}
      {labels.map(({ color, checked }, idx) => {
        return (
          color === "green" && (
            <div key={idx} className={classes.national}>
              <p className={classes.title}>Other Calendars</p>
              <label className={classes.label}>
                <Checkbox
                  checked={checked}
                  color={color}
                  onChange={updateLabelHandler}
                />
              </label>
            </div>
          )
        );
      })}
    </React.Fragment>
  );
};

export default Labels;
