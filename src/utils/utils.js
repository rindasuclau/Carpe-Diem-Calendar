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

export const manageTokenSorage = (token, expiresIn) => {
  if (token && expiresIn) {
    const expirationTime = calculateRemainingTime(expiresIn);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
  }
};

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");

  if (storedExpirationTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: storedExpirationTime,
  };
};

export default getMonth;
