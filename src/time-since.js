import moment from "moment";

/**
 * Calculates the time elapsed since a given date and returns it in various time units.
 * Utilizes the moment.js library for accurate date difference calculations, accounting
 * for leap years, variable month lengths, and daylight saving time changes.
 * 
 * @param {Date | string} date - The starting date from which to calculate the elapsed time.
 *                               Can be a JavaScript Date object or a string that moment.js
 *                               can parse into a date.
 * 
 * @returns {Object} An object containing the original date, the date as of the calculation,
 *                   and the elapsed time in years, months, days, hours, minutes, and seconds.
 *                   Each time unit is represented as a separate property.
 * 
 * Example usage:
 * const elapsedTime = timeSince('2020-01-01');
 * console.log(elapsedTime.years); // Output: 4 (assuming the current year is 2024)
 */
export function timeSince(date) {
  let now = moment();
  let startDate = moment(date);

  // Using moment.js to calculate years, months, days, etc., directly
  // Adjust startDate after calculating each component

  const years = now.diff(startDate, 'years');
  startDate.add(years, 'years');

  const months = now.diff(startDate, 'months');
  startDate.add(months, 'months');

  const days = now.diff(startDate, 'days');
  startDate.add(days, 'days');

  const hours = now.diff(startDate, 'hours');
  startDate.add(hours, 'hours');

  const minutes = now.diff(startDate, 'minutes');
  startDate.add(minutes, 'minutes');

  const seconds = now.diff(startDate, 'seconds');

  return {
    date: date,
    asOf: now.toDate(),
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}
