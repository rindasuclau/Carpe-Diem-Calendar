import { calendarActions } from "./redux";

const fetchFromFirebase = async (config, responeHandler) => {
    const url = config.url;
    const configObject = {
      method: config.method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (config.body) {
      configObject.body = JSON.stringify(config.body);
    }
    try {
      const response = await fetch(url, configObject);
      responeHandler(response);
    } catch (error) {
      alert(error.message);
    }
  };

export const createEventHandler = (event) => {
  return async (dispatch) => {
    const url =
      "https://carpe-diem-calendar-6b211-default-rtdb.europe-west1.firebasedatabase.app/events.json";

      const responeHandler = async (response) => {
        const data = await response.json();
        if (response.ok) {
          const key = data && data.name ? data.name : null;
          if (key) {
            event.key = key;
            dispatch(calendarActions.addEvent(event));
          } else {
            throw new Error("Failed to create, try again!");
          }
        } else {
          throw new Error("Failed to create, try again!");
        }
      }

     await fetchFromFirebase({url: url, method: "POST", body: event}, responeHandler);
  };
};

export const updateEventHandler = (event) => {
  return async (dispatch) => {
    const url =
      "https://carpe-diem-calendar-6b211-default-rtdb.europe-west1.firebasedatabase.app/events/" +
      event.key +
      ".json";
    const responeHandler = async (response) => {
      const data = await response.json();
      if (response.ok) {
        dispatch(calendarActions.updateEvent(event));
      } else {
        throw new Error("Failed to update, try again!");
      }
    };

    await fetchFromFirebase({url, method: "PATCH", body: event}, responeHandler);

  };
};

export const deleteEventHandler = (event) => {
    return async (dispatch) => {
      const url =
        "https://carpe-diem-calendar-6b211-default-rtdb.europe-west1.firebasedatabase.app/events/" +
        event.key +
        ".json";
      const responeHandler = async (response) => {
        const data = await response.json();
        if (response.ok) {
          dispatch(calendarActions.removeEvent(event.id));
        } else {
          throw new Error("Failed to delete, try again!");
        }
      };
  
      await fetchFromFirebase({url, method: "DELETE"}, responeHandler);
  
    };
  };



export const loadEventsHandler = () => {
  return async (dispatch) => {
    const url =
      "https://carpe-diem-calendar-6b211-default-rtdb.europe-west1.firebasedatabase.app/events.json";

      const responeHandler = async (response) => {
        const data = await response.json();
        if (response.ok) {
          dispatch(calendarActions.loadEvents(data));
        } else {
          throw new Error("Failed to load, try again!");
        }
      }

      await fetchFromFirebase({url: url, method:"GET"}, responeHandler);
  };
};



