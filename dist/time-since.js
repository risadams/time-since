import moment from "./moment.js";

export function timeSince(date)  {
  let now = new Date();
  let diff = (Number(now) - Number(date));

  console.log(now,date,diff);

  const years = Math.floor(diff / 31536000);
  const months = Math.floor((diff % 31536000) / 2628000);
  const days = Math.floor((diff % 2628000) / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = Math.floor(diff % 60);

  return {
    date: date,
    asOf: now,
    years: getYears(date),
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

const getYears = (from = 2017) => {
  const diff = moment(new Date()).diff(new Date(`01/01/${from}`), 'years') ;
  return [...Array(diff >= 0 ? diff + 1 : 0).keys()].map((num) => {
    return from + num;
  });
}
