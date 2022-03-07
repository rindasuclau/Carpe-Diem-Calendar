import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getMonth from "../utils/utils";
import Month from "../components/Calendar/Month";
import Sidebar from "../components/Calendar/Sidebar";
import Week from "../components/Calendar/Week";
import Calendar from "../components/Layout/Calendar";
import Header from "../components/Layout/Header";
import Layout from "../components/Layout/Layout";
import Main from "../components/Layout/Main";

let firstLoad = true;

const Home = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useSelector((state) => state.calendar);

  const viewMode = useSelector(state => state.calendar.viewMode);


  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      <Layout>
        <Header />
        <Main>
          <Sidebar month={currentMonth} />
          <Calendar>
            {viewMode === "Week" && <Week month={currentMonth}/>}
            {viewMode === "Month" && <Month month={currentMonth} />}
          </Calendar>
        </Main>
      </Layout>
    </React.Fragment>
  );
};

export default Home;
