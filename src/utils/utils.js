import dayjs from "dayjs";

export const times = ["12:00am", "12:15am", "12:30am", "12:45am", "1:00am"]
export const labelColors = ["tomato", "skyblue", "dodgerblue", "green", "plum", "orange"];

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

export default getMonth;
