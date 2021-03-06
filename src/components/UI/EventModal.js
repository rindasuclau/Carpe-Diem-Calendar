import dayjs from "dayjs";
import { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../../store/redux";
import Dropdown from "./Dropdown";
import classes from "./EventModal.module.css";
import { getTimeGrid, labelColors } from "../../utils/utils";
import {
  createEventHandler,
  deleteEventHandler,
  updateEventHandler,
} from "../../store/calendar-actions";

const Modal = () => {
  const selectedEvent = useSelector((state) => state.calendar.selectedEvent);
  const newEventStartTime = useSelector((state) => state.calendar.startTime);

  const token = useSelector((state) => state.auth.token);

  const [editMode, setEditMode] = useState(selectedEvent ? false : true);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [startTime, setStartTime] = useState(
    selectedEvent
      ? selectedEvent.startTime
      : newEventStartTime
      ? newEventStartTime
      : ""
  );

  const [endTime, setEndTime] = useState(
    selectedEvent
      ? selectedEvent.endTime
      : newEventStartTime
      ? newEventStartTime
      : ""
  );
  const [addTime, setAddTime] = useState(
    (selectedEvent && selectedEvent.startTime) || newEventStartTime
      ? true
      : false
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
    dispatch(calendarActions.setStartTime(null));
  };

  const addTimeHandler = (value) => {
    if (value) {
      if (selectedEvent && selectedEvent.startTime) {
        setStartTime(selectedEvent.startTime);
        setEndTime(selectedEvent.endTime);
      } else {
        setStartTime(newEventStartTime ? newEventStartTime : getTimeGrid()[0]);
      }
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
    if (selectedEvent) {
      dispatch(deleteEventHandler(selectedEvent, token));
    }
  };

  const viewModeHandler = () => {
    setEditMode((prevState) => {
      return !prevState;
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (selectedEvent) {
      dispatch(
        updateEventHandler(
          {
            title,
            description,
            startTime,
            endTime,
            date: selectedDay,
            color: selectedLabel,
            key: selectedEvent.key,
            id: selectedEvent.id,
          },
          token
        )
      );
    } else {
      dispatch(
        createEventHandler(
          {
            title,
            description,
            startTime,
            endTime,
            date: selectedDay,
            color: selectedLabel,
            id: Date.now(),
          },
          token
        )
      );
    }
    dispatch(calendarActions.setShowEventModal(false));
    dispatch(calendarActions.setSelectedEvent(null));
    dispatch(calendarActions.setStartTime(null));
  };

  return (
    <div className={classes.modal}>
      <form onSubmit={submitHandler} className={classes.form}>
        <header className={classes.header}>
          <span className="material-icons">drag_handle</span>
          <div className={classes.actions}>
            {selectedEvent && selectedEvent.color !== "green" && (
              <button
                type="button"
                className={classes.close}
                onClick={viewModeHandler}
              >
                <span className="material-icons">edit</span>
              </button>
            )}
            {selectedEvent && selectedEvent.color !== "green" && (
              <button
                type="button"
                className={classes.close}
                onClick={deleteHandler}
              >
                <span className="material-icons">delete_outline</span>
              </button>
            )}
            <button
              type="button"
              className={classes.close}
              onClick={closeHandler}
            >
              <span className="material-icons">close</span>
            </button>
          </div>
        </header>
        <div className={classes.wrapper}>
          <div className={classes.grid}>
            {editMode && (
              <input
                className={classes.title}
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                onChange={titleChangeHandler}
              />
            )}
            {!editMode && (
              <span className={classes.title}>
                {title !== "" ? title : "(No Title)"}
              </span>
            )}
            <span className={`material-icons ${classes["schedule"]}`}>
              schedule
            </span>
            <p className={classes["event-date"]}>{eventDay}</p>
            {!addTime && editMode && (
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
            {addTime && editMode && (
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
            {editMode && (
              <textarea
                className={classes.description}
                type="text"
                name="description"
                placeholder="Add description"
                value={description}
                onChange={descriptionChangeHandler}
              />
            )}
            {!editMode && (
              <span className={classes.description}>
                {description !== "" ? description : "No Description"}
              </span>
            )}
            {!editMode && (
              <span className={`material-icons ${classes["bookmark"]}`}>
                event
              </span>
            )}
            {editMode && (
              <span className={`material-icons ${classes["bookmark"]}`}>
                bookmark_border
              </span>
            )}
            {addTime && editMode && (
              <div className={classes["dropdown-container"]}>
                <Dropdown
                  className={classes["time-dropdown"]}
                  onChange={startTimeHandler}
                  options={getTimeGrid()}
                  value={startTime} //Fix this
                />
                -
                <Dropdown
                  className={classes["time-dropdown"]}
                  onChange={endTimeHandler}
                  options={getTimeGrid()}
                  value={endTime}
                />
              </div>
            )}
            {!editMode && startTime && endTime && (
              <p
                className={classes["dropdown-container"]}
                style={{ fontSize: "x-small", fontWeight: "bold" }}
              >{`${startTime} - ${endTime}`}</p>
            )}
            {!editMode && selectedEvent && (
              <span className={classes.labels}>
                <span
                  className={`${classes.label} material-icons`}
                  style={{ backgroundColor: selectedEvent.color }}
                ></span>
              </span>
            )}
            {editMode && (
              <div className={classes.labels}>
                {labelColors.map((lblColor, idx) => {
                  return (
                    lblColor !== "green" && (
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
                    )
                  );
                })}
                <span className={classes["label-text"]}>
                  (Select an event type)
                </span>
              </div>
            )}
            {editMode && <button className={classes.save}>Save</button>}
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
