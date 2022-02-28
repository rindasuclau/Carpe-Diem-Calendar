import React from "react";
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

function App() {
  console.table(getMonth());
  return (
    <Layout>
      <Header />
      <Main>
        <Sidebar />
        <Calendar>
          {<Day />}
          {<Week />}
          {<Month />}
        </Calendar>
      </Main>
    </Layout>
  );
}

export default App;
