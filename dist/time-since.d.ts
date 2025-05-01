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
export declare function timeSince(date: Date | string, options?: TimeSinceOptions): TimeSinceResult | number | string;
export {};
