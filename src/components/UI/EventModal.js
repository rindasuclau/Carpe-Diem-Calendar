import dayjs from "dayjs";
import { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../../store/redux";
import Dropdown from "./Dropdown";
import classes from "./EventModal.module.css";
import { labelColors, times } from "../../utils/utils";

const Modal = () => {
  const selectedEvent = useSelector((state) => state.calendar.selectedEvent);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [startTime, setStartTime] = useState(
    selectedEvent ? selectedEvent.startTime : ""
  );
  const [endTime, setEndTime] = useState(
    selectedEvent ? selectedEvent.endTime : ""
  );
  const [addTime, setAddTime] = useState(
    selectedEvent && selectedEvent.startTime ? true : false
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.color : "tomato"
  );

  const selectedDay = useSelector((state) => state.calendar.selectedDay);
  const eventDay = dayjs(new Date(selectedDay)).format("dddd, DD MMMM YYYY");

  const dispatch = useDispatch();

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const closeHandler = () => {
    dispatch(calendarActions.setSelectedEvent(null));
    dispatch(calendarActions.setShowEventModal(false));
  };

  const addTimeHandler = (value) => {
    if (value) {
      setStartTime(times[0]);
    } else {
      setStartTime(null);
    }
    setAddTime(value);
  };

  const startTimeHandler = (time) => {
    setStartTime(time);
  };

  const endTimeHandler = (time) => {
    setEndTime(time);
  };

  const labelHandler = (labelColor) => {
    setSelectedLabel(labelColor);
  };

  const deleteHandler = () => {
      if(selectedEvent) {
        dispatch(calendarActions.removeEvent(selectedEvent.id));
      }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (selectedEvent) {
      dispatch(
        calendarActions.updateEvent({
          title,
          description,
          startTime,
          endTime,
          date: selectedDay,
          color: selectedLabel,
          id: selectedEvent.id,
        })
      );
    } else {
      dispatch(
        calendarActions.addEvent({
          title,
          description,
          startTime,
          endTime,
          date: selectedDay,
          color: selectedLabel,
          id: Date.now(),
        })
      );
    }
    dispatch(calendarActions.setShowEventModal(false));
    dispatch(calendarActions.setSelectedEvent(null));
  };

  return (
    <div className={classes.modal}>
      <form onSubmit={submitHandler} className={classes.form}>
        <header className={classes.header}>
          <span className="material-icons">drag_handle</span>
          <div className={classes.actions}>
            <button type="button" className={classes.close} onClick={deleteHandler}>
              <span className="material-icons">delete_outline</span>
            </button>
            <button type="button" className={classes.close} onClick={closeHandler}>
              <span className="material-icons">close</span>
            </button>
          </div>
        </header>
        <div className={classes.wrapper}>
          <div className={classes.grid}>
            <input
              className={classes.title}
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              onChange={titleChangeHandler}
            />
            <span className={`material-icons ${classes["schedule"]}`}>
              schedule
            </span>
            <p className={classes["event-date"]}>{eventDay}</p>
            {!addTime && (
              <button
                type="button"
                className={classes["btn-add-time"]}
                onClick={() => {
                  addTimeHandler(true);
                }}
              >
                Add time
              </button>
            )}
            {addTime && (
              <button
                className={classes["btn-close-add-time"]}
                onClick={() => {
                  addTimeHandler(false);
                }}
              >
                <span className="material-icons">close</span>
              </button>
            )}
            <span className={`material-icons ${classes["segment"]}`}>
              segment
            </span>
            <textarea
              className={classes.description}
              type="text"
              name="description"
              placeholder="Add description"
              value={description}
              onChange={descriptionChangeHandler}
            />
            <span className={`material-icons ${classes["bookmark"]}`}>
              bookmark_border
            </span>
            {addTime && (
              <div className={classes["dropdown-container"]}>
                <Dropdown
                  className={classes["time-dropdown"]}
                  onChange={startTimeHandler}
                  options={times}
                />
                -
                <Dropdown
                  className={classes["time-dropdown"]}
                  onChange={endTimeHandler}
                  options={times}
                />
              </div>
            )}
            <div className={classes.labels}>
              {labelColors.map((lblColor, idx) => {
                return (
                  <span
                    key={idx}
                    className={`${classes.label} material-icons`}
                    style={{ backgroundColor: lblColor }}
                    onClick={() => {
                      labelHandler(lblColor);
                    }}
                  >
                    {selectedLabel === lblColor && "check"}
                  </span>
                );
              })}
              <span className={classes["label-text"]}>
                (Select event color)
              </span>
            </div>
            <button className={classes.save}>Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const EventModal = () => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Modal />, document.getElementById("overlays"))}
    </Fragment>
  );
};

export default EventModal;
