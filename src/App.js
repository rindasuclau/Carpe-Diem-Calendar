import React, { Fragment } from "react";

import { useSelector } from "react-redux";
import EventModal from "./components/UI/EventModal";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { Route } from "react-router-dom";

function App() {
  const showEventModal = useSelector((state) => state.calendar.showEventModal);

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
