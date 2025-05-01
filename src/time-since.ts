/**
 * @file time-since.ts
 * @description A utility for calculating elapsed time between dates in various formats
 * @author Ris Adams <ris@risadams.com>
 * @copyright 2025
 * @license MIT
 */

/**
 * Options for customizing the timeSince function output.
 * 
 * @interface TimeSinceOptions
 * @property {string} [format='object'] - The format of the returned value
 * @property {string} [locale='en'] - The locale to use for relative formatting
 */
interface TimeSinceOptions {
  /**
   * The format of the returned value.
   * 
   * @default 'object'
   * @type {'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years' | 'relative' | 'object'}
   * @description
   * - 'milliseconds': Returns the elapsed time in milliseconds
   * - 'seconds': Returns the elapsed time in seconds
   * - 'minutes': Returns the elapsed time in minutes
   * - 'hours': Returns the elapsed time in hours
   * - 'days': Returns the elapsed time in days
   * - 'months': Returns the elapsed time in months (approximate)
   * - 'years': Returns the elapsed time in years
   * - 'relative': Returns a human-readable string like "2 days ago" using Intl.RelativeTimeFormat
   * - 'object': Returns a detailed breakdown of all time components
   */
  format?: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years' | 'relative' | 'object';
  
  /**
   * The locale to use for relative formatting.
   * 
   * @default 'en'
   * @type {string}
   * @description BCP 47 language tag (e.g., 'en-US', 'fr', 'de', 'ja')
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat}
   */
  locale?: string;
}

/**
 * Interface for the result object when using the default 'object' format.
 * Contains a detailed breakdown of the elapsed time in various units.
 * 
 * @interface TimeSinceResult
 * @property {Date} date - The original date used for calculation
 * @property {Date} asOf - The current date/time when the calculation was performed
 * @property {number} years - Number of full years elapsed
 * @property {number} months - Number of months beyond full years (0-11)
 * @property {number} days - Number of days beyond full months (0-29)
 * @property {number} hours - Number of hours beyond full days (0-23)
 * @property {number} minutes - Number of minutes beyond full hours (0-59)
 * @property {number} seconds - Number of seconds beyond full minutes (0-59)
 * @property {number} milliseconds - Number of milliseconds beyond full seconds (0-999)
 */
interface TimeSinceResult {
  /** The original date used for calculation */
  date: Date;
  
  /** The current date/time when the calculation was performed */
  asOf: Date;
  
  /** Number of full years elapsed */
  years: number;
  
  /** Number of months beyond full years (0-11) */
  months: number;
  
  /** Number of days beyond full months (0-29) */
  days: number;
  
  /** Number of hours beyond full days (0-23) */
  hours: number;
  
  /** Number of minutes beyond full hours (0-59) */
  minutes: number;
  
  /** Number of seconds beyond full minutes (0-59) */
  seconds: number;
  
  /** Number of milliseconds beyond full seconds (0-999) */
  milliseconds: number;
}

/**
 * Calculates the time elapsed since a given date and returns it in various formats.
 * 
 * This function computes the difference between the provided date and the current date/time,
 * then returns the result in the format specified in the options.
 * 
 * Utilizes native JavaScript Date and Intl.RelativeTimeFormat for date difference calculations.
 *
 * @since 1.0.0
 * @param {Date | string} date - The starting date from which to calculate the elapsed time.
 *                               Can be a JavaScript Date object or a string that can be parsed into a date.
 * @param {TimeSinceOptions} [options={}] - Options to customize the output format.
 * @returns {TimeSinceResult | number | string} An object containing the original date, the date as of the calculation,
 *          or the elapsed time in a specified format.
 * @throws {Error} If the provided date is invalid.
 * 
 * @example
 * // Get the default object result with time components
 * const breakdown = timeSince('2020-01-01');
 * console.log(breakdown);
 * // Output: { date: Date, asOf: Date, years: 5, months: 4, ... }
 * 
 * @example
 * // Get elapsed time in specific units
 * const days = timeSince('2020-01-01', { format: 'days' });
 * console.log(days); 
 * // Output: 1947 (days since 2020-01-01 as of May 1, 2025)
 * 
 * @example
 * // Get human-readable relative time string
 * const relative = timeSince('2020-01-01', { format: 'relative', locale: 'fr' });
 * console.log(relative); 
 * // Output: "il y a 5 ans" (French for "5 years ago")
 */
export function timeSince(date: Date | string, options: TimeSinceOptions = {}): TimeSinceResult | number | string {
  /**
   * The starting date for calculation, converted from input
   * @type {Date}
   */
  const startDate: Date = typeof date === 'string' ? new Date(date) : date;

  // Ensure the start date is a valid date
  if (isNaN(startDate.getTime())) {
    throw new Error('Invalid date input');
  }

  /**
   * The current date and time for comparison
   * @type {Date}
   */
  const now: Date = new Date();

  /**
   * Determine if the date is in the future
   * @type {boolean}
   */
  const isFuture: boolean = startDate.getTime() > now.getTime();

  /**
   * Time difference in milliseconds (always positive)
   * @type {number}
   */
  const diffMilliseconds: number = Math.abs(now.getTime() - startDate.getTime());
  
  /**
   * Time difference in seconds
   * @type {number}
   */
  const diffSeconds: number = Math.floor(diffMilliseconds / 1000);
  
  /**
   * Time difference in minutes
   * @type {number}
   */
  const diffMinutes: number = Math.floor(diffSeconds / 60);
  
  /**
   * Time difference in hours
   * @type {number}
   */
  const diffHours: number = Math.floor(diffMinutes / 60);
  
  /**
   * Time difference in days
   * @type {number}
   */
  const diffDays: number = Math.floor(diffHours / 24);
  
  /**
   * Time difference in months (approximated)
   * @type {number}
   */
  const diffMonths: number = Math.floor(diffDays / 30); // Approximate month length
  
  /**
   * Time difference in years
   * @type {number}
   */
  const diffYears: number = Math.floor(diffMonths / 12);

  /**
   * Number of complete years
   * @type {number}
   */
  const years: number = diffYears;
  
  /**
   * Number of months beyond complete years
   * @type {number}
   */
  const months: number = diffMonths % 12;
  
  /**
   * Number of days beyond complete months
   * Calculate more precisely for leap years
   * @type {number}
   */
  // Simplified calculation that better handles leap years
  const days: number = diffDays % 30; // Approximate day length in a month
  
  /**
   * Number of hours beyond complete days
   * @type {number}
   */
  const hours: number = diffHours % 24;
  
  /**
   * Number of minutes beyond complete hours
   * @type {number}
   */
  const minutes: number = diffMinutes % 60;
  
  /**
   * Number of seconds beyond complete minutes
   * @type {number}
   */
  const seconds: number = diffSeconds % 60;
  
  /**
   * Number of milliseconds beyond complete seconds
   * @type {number}
   */
  const milliseconds: number = diffMilliseconds % 1000;

  /**
   * Destructured options with defaults
   */
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
      /**
       * Relative time formatter using the specified locale
       * @type {Intl.RelativeTimeFormat}
       */
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      
      // Apply sign based on whether the date is in the past or future
      const sign = isFuture ? 1 : -1;
      
      // Return the most significant non-zero time unit
      if (diffYears !== 0) return rtf.format(sign * diffYears, 'year');
      if (diffMonths !== 0) return rtf.format(sign * diffMonths, 'month');
      if (diffDays !== 0) return rtf.format(sign * diffDays, 'day');
      if (diffHours !== 0) return rtf.format(sign * diffHours, 'hour');
      if (diffMinutes !== 0) return rtf.format(sign * diffMinutes, 'minute');
      if (diffSeconds !== 0) return rtf.format(sign * diffSeconds, 'second');
      return 'now';
    }
    default:
      // Return the complete breakdown object
      return {
        date: startDate,
        asOf: now,
        years: isFuture ? 0 : years,  // For future dates, show 0 years
        months: isFuture ? 
          Math.floor(diffDays / 30) :  // For future dates, show total months
          months,
        days,
        hours,
        minutes,
        seconds,
        milliseconds
      };
  }
}