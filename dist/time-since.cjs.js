'use strict';

/**
 * Calculates the time elapsed since a given date and returns it in various time units.
 * Utilizes native JavaScript Date and Intl.RelativeTimeFormat for date difference calculations.
 *
 * @param {Date | string} date - The starting date from which to calculate the elapsed time.
 *                               Can be a JavaScript Date object or a string that can be parsed into a date.
 *
 * @returns {Object} An object containing the original date, the date as of the calculation,
 *                   and the elapsed time in years, months, days, hours, minutes, seconds, and milliseconds.
 *
 * Example usage:
 * const elapsedTime = timeSince('2020-01-01');
 * console.log(elapsedTime.years); // Output: 4 (assuming the current year is 2024)
 */
function timeSince(date) {
  var startDate = typeof date === 'string' ? new Date(date) : date;

  // Ensure the start date is a valid date
  if (isNaN(startDate)) {
    throw new Error('Invalid date input');
  }

  // Get the current date and time
  var now = new Date();

  // Calculate the differences
  var diffMilliseconds = now - startDate;
  var diffSeconds = Math.floor(diffMilliseconds / 1000);
  var diffMinutes = Math.floor(diffSeconds / 60);
  var diffHours = Math.floor(diffMinutes / 60);
  var diffDays = Math.floor(diffHours / 24);
  var diffMonths = Math.floor(diffDays / 30); // Approximate month length
  var diffYears = Math.floor(diffMonths / 12);

  // Calculate individual components
  var years = diffYears;
  var months = diffMonths % 12;
  var days = diffDays % 30; // Approximate day length in a month
  var hours = diffHours % 24;
  var minutes = diffMinutes % 60;
  var seconds = diffSeconds % 60;
  var milliseconds = diffMilliseconds % 1000;
  return {
    date: startDate,
    asOf: now,
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
}

// Example usage
var elapsedTime = timeSince('2020-01-01');
console.log(elapsedTime);

exports.timeSince = timeSince;
