import React, { Fragment, useEffect, useState } from "react";
import getMonth from "./utils/utils";

/* Layout Components */
import Calendar from "./components/Layout/Calendar";
import Header from "./components/Layout/Header";
import Layout from "./components/Layout/Layout";
import Main from "./components/Layout/Main";

/* View Components */
import Day from "./components/Calendar/Day";
import Week from "./components/Calendar/Week";
import Month from "./components/Calendar/Month";
import Sidebar from "./components/Calendar/Sidebar";
import { useSelector } from "react-redux";
import EventModal from "./components/UI/EventModal";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useSelector((state) => state.calendar);

  const showEventModal = useSelector(state => state.calendar.showEventModal);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <Fragment>
      {showEventModal && <EventModal />}
      <Layout>
        <Header />
        <Main>
          <Sidebar month={currentMonth} />
          <Calendar>
            {null && <Day />}
            {null && <Week />}
            {<Month month={currentMonth} />}
          </Calendar>
        </Main>
      </Layout>
    </Fragment>
  );
}

export default App;
