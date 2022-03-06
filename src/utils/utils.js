import dayjs from "dayjs";

export const times = ["12:00am", "12:15am", "12:30am", "12:45am", "1:00am"];
export const labelColors = [
  "tomato",
  "skyblue",
  "dodgerblue",
  "green",
  "plum",
  "orange",
];
export const FIREBASE_API_KEY = "AIzaSyCCFW-It40BBdJbcH8GjTHi9NaEnAcPCTw";
export const eventsArray = [
  {
    title: "Peace day",
    description: "A beautiful day of peace",
    startTime: null,
    endTime: null,
    date: "2022-03-22",
    color: "plum",
    id: Date.now()
  },
  {
    title: "Ukraina support day",
    description: "A beautiful day of peace",
    startTime: "12:00 AM",
    endTime: "1:00 AM",
    date: "2022-03-09",
    color: "dodgerblue",
    id: Date.now() + 1
  },
  {
    title: "Epstein didn't kill himself.",
    description: "A beautiful day of peace",
    startTime: "12:00 AM",
    endTime: "1:00 AM",
    date: "2022-04-09",
    color: "green",
    id: Date.now() + 2
  },
];

const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfMonth;

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return daysMatrix;
};

export const getTimeGrid = () => {
  let time = 1;
  const matrix =  new Array(24).fill(null).map(() => {
      if (time <= 12) {
        return time++ + ":00 AM";
      } else {
        return time++ - 12 + ":00 PM";
      }
    });
  return matrix;
};

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export default getMonth;
