import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getMonth, { eventsArray } from "../utils/utils";
import Month from "../components/Calendar/Month";
import Sidebar from "../components/Calendar/Sidebar";
import Week from "../components/Calendar/Week";
import Calendar from "../components/Layout/Calendar";
import Header from "../components/Layout/Header";
import Layout from "../components/Layout/Layout";
import Main from "../components/Layout/Main";
import dayjs from "dayjs";
import { calendarActions } from "../store/redux";

const Home = () => {
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useSelector((state) => state.calendar);

  const viewMode = useSelector(state => state.calendar.viewMode);

  useEffect(() => {
    dispatch(calendarActions.loadEvents(eventsArray));
  }, [])

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
