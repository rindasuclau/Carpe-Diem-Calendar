import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import EventModal from "./components/UI/EventModal";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { Route } from "react-router-dom";
import { retrieveStoredToken } from "./utils/utils";
import { authActions } from "./store/auth-slice";

let timer = null;

function App() {
  const dispatch = useDispatch();
  const showEventModal = useSelector((state) => state.calendar.showEventModal);

  useEffect(() => {
    const storedData = retrieveStoredToken();
    const expirationTime = storedData ? storedData.duration : null;
    console.log(storedData)
    const token = storedData ? storedData.token : null;
    if(storedData) {
      dispatch(authActions.login());
      dispatch(authActions.setToken(token))
      timer = setTimeout(() => {
        dispatch(authActions.logout());
      }, expirationTime)
    }
    return (() => {
      // if (timer) {
      //   timer.clear()
      // }
    })
  }, [dispatch])

  return (
    <Fragment>
      {showEventModal && <EventModal />}
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
