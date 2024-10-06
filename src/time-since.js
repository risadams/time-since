/**
 * Calculates the time elapsed since a given date and returns it in various formats.
 * Utilizes native JavaScript Date and Intl.RelativeTimeFormat for date difference calculations.
 *
 * @param {Date | string} date - The starting date from which to calculate the elapsed time.
 *                               Can be a JavaScript Date object or a string that can be parsed into a date.
 * @param {Object} [options={}] - Options to customize the output format.
 * @param {string} [options.format] - The format of the returned value. Possible values: 'milliseconds', 'seconds', 'minutes', 'hours', 'days', 'months', 'years', 'relative'.
 * @param {string} [options.timeZone] - The time zone to use for calculating the difference. Defaults to the local time zone.
 * @param {string} [options.locale] - The locale to use for relative formatting. Defaults to 'en'.
 * @param {boolean} [options.allowFuture=false] - Whether to allow future dates and calculate the time until that date.
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
  // Parse the input date
  const startDate = typeof date === 'string' ? new Date(date) : date;

  // Ensure the start date is a valid date
  if (isNaN(startDate.getTime())) {
    throw new Error('Invalid date input');
  }

  // Handle the time zone option
  const { format = 'object', locale = 'en', timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone, allowFuture = false } = options;
  
  // Get the current date and time in the specified time zone
  const now = new Date(new Date().toLocaleString('en-US', { timeZone }));

  // Calculate the differences
  const diffMilliseconds = now - startDate;
  
  // Handle future dates if allowed
  if (diffMilliseconds < 0 && !allowFuture) {
    throw new Error('Future dates are not allowed unless allowFuture is set to true.');
  }
  
  const diffSeconds = Math.floor(Math.abs(diffMilliseconds) / 1000);
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
  const milliseconds = Math.abs(diffMilliseconds) % 1000;

  // Supported languages list
  const supportedLocales = [
    'en', 'fr', 'es', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'hi', 'ar', 'tr'
  ];

  // Check if the locale is supported, if not default to 'en'
  const validLocale = supportedLocales.includes(locale) ? locale : 'en';

  // Handle different output formats
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
      const rtf = new Intl.RelativeTimeFormat(validLocale, { numeric: 'auto' });
      if (diffYears !== 0) return rtf.format(-years, 'year');
      if (diffMonths !== 0) return rtf.format(-months, 'month');
      if (diffDays !== 0) return rtf.format(-days, 'day');
      if (diffHours !== 0) return rtf.format(-hours, 'hour');
      if (diffMinutes !== 0) return rtf.format(-minutes, 'minute');
      return rtf.format(-seconds, 'second');
    }
    default:
      return {
        date: startDate,
        asOf: now,
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        milliseconds
      };
  }
}

// Example usage
const elapsedTime = timeSince('2020-01-01', { format: 'days', timeZone: 'UTC' });
console.log(elapsedTime); // Output: Number of days since the given date

const elapsedTimeInDays = timeSince('2020-01-01', { format: 'days', timeZone: 'Asia/Kolkata' });
console.log(elapsedTimeInDays); // Output: Number of days since the given date in specified time zone

const relativeTimeFr = timeSince('2020-01-01', { format: 'relative', locale: 'fr' });
console.log(relativeTimeFr); // Output: "il y a 4 ans" in French

const relativeTimeEs = timeSince('2020-01-01', { format: 'relative', locale: 'es' });
console.log(relativeTimeEs); // Output: "hace 4 años" in Spanish

const relativeTimeKo = timeSince('2020-01-01', { format: 'relative', locale: 'ko' });
console.log(relativeTimeKo); // Output: "4년 전" in Korean

const futureTime = timeSince('2025-01-01', { format: 'relative', locale: 'en', allowFuture: true });
console.log(futureTime); // Output: "in 1 year"