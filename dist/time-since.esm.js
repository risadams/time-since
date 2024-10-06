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
function timeSince(date) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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

  // Handle different output formats
  var _options$format = options.format,
    format = _options$format === void 0 ? 'object' : _options$format,
    _options$locale = options.locale,
    locale = _options$locale === void 0 ? 'en' : _options$locale;
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
    case 'relative':
      {
        var rtf = new Intl.RelativeTimeFormat(locale, {
          numeric: 'auto'
        });
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
var elapsedTime = timeSince('2020-01-01');
console.log(elapsedTime); // Output: Number of days since the given date

timeSince('2020-01-01', {
  format: 'days'
});
console.log(elapsedTime); // Output: Number of days since the given date

var relativeTime = timeSince('2020-01-01', {
  format: 'relative',
  locale: 'fr'
});
console.log(relativeTime); // Output: "il y a 4 ans"

export { timeSince };
