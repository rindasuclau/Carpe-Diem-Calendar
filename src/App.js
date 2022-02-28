import React, { useEffect, useState } from "react";
import getMonth from "./utils/utils";

/* Layout Components */
import Calendar from "./components/Layout/Calendar";
import Header from "./components/Layout/Header";
import Layout from "./components/Layout/Layout";
import Main from "./components/Layout/Main";

/* View Components */
import Day from "./components/Day";
import Week from "./components/Week";
import Month from "./components/Month";
import Sidebar from "./components/Sidebar";
import {  useSelector } from "react-redux";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useSelector((state) => state.calendar);


  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <Layout>
      <Header />
      <Main>
        {/* <Sidebar /> */}
        <Calendar>
          {null && <Day />}
          {null && <Week />}
          {<Month month={currentMonth} />}
        </Calendar>
      </Main>
    </Layout>
  );
}

export default App;
