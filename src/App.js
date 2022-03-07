import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import EventModal from "./components/UI/EventModal";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { Route } from "react-router-dom";
import { retrieveStoredToken } from "./utils/utils";
import { authHandler } from "./store/auth-actions";
import { loadEventsHandler } from "./store/calendar-actions";

// let logoutTimer = null;

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const selectedEvent = useSelector((state) => state.calendar.selectedEvent);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const showEventModal = useSelector((state) => state.calendar.showEventModal);
  const tokenData = retrieveStoredToken();

  useEffect(() => {
    if (tokenData) {
      dispatch(
        authHandler({
          token: tokenData.token,
          expiresIn: tokenData.duration,
          type: "AUTO_LOGIN",
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadEventsHandler(token));
  }, [token, dispatch]);

  return (
    <Fragment>
      {((isLoggedIn && showEventModal) || (selectedEvent && showEventModal)) && <EventModal />}
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Fragment>
  );
}

export default App;
