import dayjs from "dayjs";

export const FIREBASE_API_KEY = "AIzaSyCCFW-It40BBdJbcH8GjTHi9NaEnAcPCTw";

export const labelColors = [
  "tomato",
  "skyblue",
  "dodgerblue",
  "green",
  "plum",
  "orange",
];

export const LABEL_TYPE = [
  {color: "tomato", type: "Urgent"},
  {color: "skyblue", type: "Appointments"},
  {color: "dodgerblue", type: "Tasks"},
  {color: "green", type: "Romania National Days"},
  {color: "plum", type: "Reminders"},
  {color: "orange", type: "Personal"},
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
  const matrix = new Array(24).fill(null).map(() => {
    if (time <= 12) {
      return time++ + ":00 AM";
    } else {
      return time++ - 12 + ":00 PM";
    }
  });
  return matrix;
};


export const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");

  return {
    token: storedToken,
    duration: storedExpirationTime,
  };
};

export default getMonth;
