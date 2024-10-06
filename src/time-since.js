/**
 * Calculates the time elapsed since a given date and returns it in various formats.
 * Utilizes native JavaScript Date and Intl.RelativeTimeFormat for date difference calculations.
 *
 * @param {Date | string} date - The starting date from which to calculate the elapsed time.
 *                               Can be a JavaScript Date object or a string that can be parsed into a date.
 * @param {Object} [options={}] - Options to customize the output format.
 * @param {string} [options.format] - The format of the returned value. Possible values: 'milliseconds', 'seconds', 'minutes', 'hours', 'days', 'months', 'years', 'relative'.
 * @param {string} [options.locale] - The locale to use for relative formatting. Defaults to 'en'.
 *
 * @returns {Object | string | number} An object containing the original date, the date as of the calculation,
 *                                     or the elapsed time in a specified format.
 *
 * Example usage:
 * const elapsedTime = timeSince('2020-01-01', { format: 'days' });
 * console.log(elapsedTime); // Output: 1461 (assuming the current year is 2024)
 *
 * const relativeTime = timeSince('2020-01-01', { format: 'relative', locale: 'fr' });
 * console.log(relativeTime); // Output: "il y a 4 ans"
 */
export function timeSince(date, options = {}) {
  const startDate = typeof date === 'string' ? new Date(date) : date;

  // Ensure the start date is a valid date
  if (isNaN(startDate)) {
    throw new Error('Invalid date input');
  }

  // Get the current date and time
  const now = new Date();

  // Calculate the differences
  const diffMilliseconds = now - startDate;
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30); // Approximate month length
  const diffYears = Math.floor(diffMonths / 12);

  // Calculate individual components
  const years = diffYears;
  const months = diffMonths % 12;
  const days = diffDays % 30; // Approximate day length in a month
  const hours = diffHours % 24;
  const minutes = diffMinutes % 60;
  const seconds = diffSeconds % 60;
  const milliseconds = diffMilliseconds % 1000;

  // Handle different output formats
  const { format = 'object', locale = 'en' } = options;

  switch (format) {
    case 'milliseconds':
      return diffMilliseconds;
    case 'seconds':
      return diffSeconds;
    case 'minutes':
      return diffMinutes;
    case 'hours':
      return diffHours;
    case 'days':
      return diffDays;
    case 'months':
      return diffMonths;
    case 'years':
      return diffYears;
    case 'relative': {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      if (diffYears !== 0) return rtf.format(-diffYears, 'year');
      if (diffMonths !== 0) return rtf.format(-diffMonths, 'month');
      if (diffDays !== 0) return rtf.format(-diffDays, 'day');
      if (diffHours !== 0) return rtf.format(-diffHours, 'hour');
      if (diffMinutes !== 0) return rtf.format(-diffMinutes, 'minute');
      return rtf.format(-diffSeconds, 'second');
    }
    default:
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
}

// Example usage
const elapsedTime = timeSince('2020-01-01');
console.log(elapsedTime); // Output: Number of days since the given date

const elapsedTimeInDays = timeSince('2020-01-01', { format: 'days' });
console.log(elapsedTime); // Output: Number of days since the given date

const relativeTime = timeSince('2020-01-01', { format: 'relative', locale: 'fr' });
console.log(relativeTime); // Output: "il y a 4 ans"