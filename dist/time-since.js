export default function timeSince(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();

  const years = Math.floor(diff / 31536000);
  const months = Math.floor((diff % 31536000) / 2628000);
  const days = Math.floor((diff % 2628000) / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = Math.floor(diff % 60);

  return {
    date: date,
    asOf: now,
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}
