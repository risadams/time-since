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
  const startDate = typeof date === 'string' ? moment(new Date(date)) : moment(date);

  // Ensure the start date is valid
  if (!startDate.isValid()) {
    throw new Error('Invalid date input');
  }

  // Get the current date and time as a moment object
  const now = moment();

  const duration = moment.duration(now.diff(startDate));

  const years = duration.get('years');
  const months = duration.get('months');
  const days = duration.get('days');
  const hours = duration.get('hours');
  const minutes = duration.get('minutes');
  const seconds = duration.get('seconds');
  const milliseconds = duration.get('milliseconds');

  return {
    date: date,
    asOf: now.toDate(),
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
}
