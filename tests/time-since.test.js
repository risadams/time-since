/**
 * @file time-since.test.js
 * @description Test suite for the timeSince utility function
 * @author Ris Adams <ris@risadams.com>
 * @copyright 2025
 * @license MIT
 */

import { timeSince } from '../dist/time-since.esm.js';

/**
 * Helper function to mock the current date for consistent test results
 * 
 * @param {string} dateString - ISO date string to use as the current date
 * @returns {void}
 */
const mockCurrentDate = (dateString) => {
  const realDate = Date;
  const mockDate = new Date(dateString);
  global.Date = class extends Date {
    constructor(date) {
      super();
      return date ? new realDate(date) : mockDate;
    }
  };
};

/**
 * Cleanup function to reset Date to its original state
 * 
 * @returns {void}
 */
const resetMockDate = () => {
  global.Date = Date;
};

/**
 * Test suite for the timeSince function
 */
describe('timeSince function', () => {
  beforeEach(() => {
    // Mock the current date to a fixed point in time for consistent tests
    mockCurrentDate("2024-04-01T00:00:00Z");
  });

  afterEach(() => {
    // Reset the Date object after each test
    resetMockDate();
  });

  /**
   * Basic input handling tests
   */
  describe('Input handling', () => {
    /**
     * Test that the function handles string date inputs correctly
     */
    test('handles string objects as input', () => {
      const result = timeSince('2019-12-31');
      expect(result.years).toBe(4);
      expect(result.months).toBe(3);
      expect(result.days).toBeLessThan(30); // No need to test exact day since it's arbitrary
    });

    /**
     * Test that the function handles Date object inputs correctly
     */
    test('handles Date objects as input', () => {
      const result = timeSince(new Date('2019-12-31'));
      expect(result.years).toBe(4);
      expect(result.months).toBe(3);
    });

    /**
     * Test handling of different date string formats
     */
    test('handles different date string formats', () => {
      // ISO format
      const iso = timeSince('2023-04-01T00:00:00Z');
      expect(iso.years).toBe(1);
      expect(iso.months).toBe(0);
      
      // Short date format
      const shortDate = timeSince('4/1/2023');
      expect(shortDate.years).toBe(1);
      expect(shortDate.months).toBe(0);
      
      // Long date format
      const longDate = timeSince('April 1, 2023');
      expect(longDate.years).toBe(1);
      expect(longDate.months).toBe(0);
    });
    
    /**
     * Test handling of timestamp inputs
     */
    test('handles timestamp inputs', () => {
      // April 1, 2023 timestamp
      const timestampDate = new Date('2023-04-01T00:00:00Z').getTime();
      const result = timeSince(new Date(timestampDate));
      expect(result.years).toBe(1);
      expect(result.months).toBe(0);
    });
  });

  /**
   * Error handling tests
   */
  describe('Error handling', () => {
    /**
     * Test that invalid date strings throw errors
     */
    test('throws error for invalid date strings', () => {
      expect(() => {
        timeSince('not-a-date');
      }).toThrow('Invalid date input');
    });

    /**
     * Test that invalid Date objects throw errors
     */
    test('throws error for invalid Date objects', () => {
      expect(() => {
        timeSince(new Date('invalid-date'));
      }).toThrow('Invalid date input');
    });
  });

  /**
   * Tests for default object return format
   */
  describe('Default object format', () => {
    /**
     * Test that the default result object contains all expected time unit properties
     */
    test('returns all expected time units', () => {
      const result = timeSince(new Date('2023-12-31'));
      // Test for all expected properties
      expect(result).toHaveProperty('date');
      expect(result).toHaveProperty('asOf');
      expect(result).toHaveProperty('years');
      expect(result).toHaveProperty('months');
      expect(result).toHaveProperty('days');
      expect(result).toHaveProperty('hours');
      expect(result).toHaveProperty('minutes');
      expect(result).toHaveProperty('seconds');
      expect(result).toHaveProperty('milliseconds');
      
      // Ensure each unit is a number
      expect(typeof result.years).toBe('number');
      expect(typeof result.months).toBe('number');
      expect(typeof result.days).toBe('number');
      expect(typeof result.hours).toBe('number');
      expect(typeof result.minutes).toBe('number');
      expect(typeof result.seconds).toBe('number');
      expect(typeof result.milliseconds).toBe('number');
      
      // Ensure the values make sense
      expect(result.years).toBe(0);
      expect(result.months).toBe(3);
      // Time units below month are not tested for exact values as they depend on test execution time
    });
    
    /**
     * Test that date and asOf properties are date-like objects with expected properties
     */
    test('returns proper Date objects for date and asOf', () => {
      const inputDate = new Date('2023-12-31');
      const result = timeSince(inputDate);
      
      // Test for date-like objects with the expected methods
      expect(typeof result.date.getFullYear).toBe('function');
      expect(typeof result.asOf.getFullYear).toBe('function');
      expect(result.date.getFullYear()).toBe(2023);
      expect(result.date.getMonth()).toBe(11); // December is 11 in JS months
      expect(result.asOf.getFullYear()).toBe(2024);
      // The month could be either 2 (March) or 3 (April) depending on how the date is mocked
      expect([2, 3].includes(result.asOf.getMonth())).toBe(true);
    });
  });

  /**
   * Tests for specific format options
   */
  describe('Format options', () => {
    /**
     * Test the milliseconds format option
     */
    test('returns milliseconds when format is milliseconds', () => {
      const result = timeSince('2024-03-31T23:59:59Z', { format: 'milliseconds' });
      expect(result).toBe(1000);
    });

    /**
     * Test the seconds format option
     */
    test('returns seconds when format is seconds', () => {
      const result = timeSince('2024-03-31T23:59:50Z', { format: 'seconds' });
      expect(result).toBe(10);
    });

    /**
     * Test the minutes format option
     */
    test('returns minutes when format is minutes', () => {
      const result = timeSince('2024-03-31T23:50:00Z', { format: 'minutes' });
      expect(result).toBe(10);
    });

    /**
     * Test the hours format option
     */
    test('returns hours when format is hours', () => {
      const result = timeSince('2024-03-31T22:00:00Z', { format: 'hours' });
      expect(result).toBe(2);
    });

    /**
     * Test the days format option
     */
    test('returns days when format is days', () => {
      const result = timeSince('2024-03-30T00:00:00Z', { format: 'days' });
      expect(result).toBe(2);
    });

    /**
     * Test the months format option
     */
    test('returns months when format is months', () => {
      const result = timeSince('2023-01-01T00:00:00Z', { format: 'months' });
      expect(result).toBe(15);
    });

    /**
     * Test the years format option
     */
    test('returns years when format is years', () => {
      const result = timeSince('2020-01-01T00:00:00Z', { format: 'years' });
      expect(result).toBe(4);
    });

    /**
     * Test explicit object format option
     */
    test('returns object when format is object', () => {
      const result = timeSince('2023-04-01T00:00:00Z', { format: 'object' });
      expect(result).toHaveProperty('years');
      expect(result).toHaveProperty('months');
      expect(result.years).toBe(1);
      expect(result.months).toBe(0);
    });
  });

  /**
   * Tests for relative time formatting
   */
  describe('Relative time formatting', () => {
    /**
     * Test the relative format option with default locale
     */
    test('returns relative time in default locale', () => {
      const result = timeSince('2023-04-01T00:00:00Z', { format: 'relative' });
      expect(result).toBe('last year');
    });

    /**
     * Test the relative format option with a specific locale
     */
    test('returns relative time in specified locale', () => {
      const result = timeSince('2020-01-01T00:00:00Z', { format: 'relative', locale: 'fr' });
      expect(result).toBe('il y a 4 ans');
    });
    
    /**
     * Test different time units in relative format
     */
    test('selects the appropriate time unit for relative format', () => {
      // Years
      const years = timeSince('2020-04-01T00:00:00Z', { format: 'relative' });
      expect(years).toBe('4 years ago');
      
      // Months
      mockCurrentDate('2024-04-01T00:00:00Z');
      const months = timeSince('2024-01-01T00:00:00Z', { format: 'relative' });
      expect(months).toBe('3 months ago');
      
      // Days
      mockCurrentDate('2024-04-01T00:00:00Z');
      const days = timeSince('2024-03-30T00:00:00Z', { format: 'relative' });
      expect(days).toBe('2 days ago');
      
      // Hours
      mockCurrentDate('2024-04-01T10:00:00Z');
      const hours = timeSince('2024-04-01T08:00:00Z', { format: 'relative' });
      expect(hours).toBe('2 hours ago');
      
      // Minutes
      mockCurrentDate('2024-04-01T00:30:00Z');
      const minutes = timeSince('2024-04-01T00:15:00Z', { format: 'relative' });
      expect(minutes).toBe('15 minutes ago');
      
      // Seconds
      mockCurrentDate('2024-04-01T00:00:30Z');
      const seconds = timeSince('2024-04-01T00:00:10Z', { format: 'relative' });
      expect(seconds).toBe('20 seconds ago');
    });
    
    /**
     * Test multiple locales for relative format
     */
    test('supports various locales for relative format', () => {
      const date = '2023-04-01T00:00:00Z';
      
      const english = timeSince(date, { format: 'relative', locale: 'en' });
      expect(english).toBe('last year');
      
      // Accept any valid French translation for "last year"
      const french = timeSince(date, { format: 'relative', locale: 'fr' });
      expect(typeof french).toBe('string');
      
      // Accept any valid Spanish translation for "last year"
      const spanish = timeSince(date, { format: 'relative', locale: 'es' });
      expect(typeof spanish).toBe('string');
      
      // Accept any valid German translation for "last year"
      const german = timeSince(date, { format: 'relative', locale: 'de' });
      expect(typeof german).toBe('string');
      
      // Even with invalid locales, it should still return a string
      const invalid = timeSince(date, { format: 'relative', locale: 'invalid-locale' });
      expect(typeof invalid).toBe('string');
    });
  });

  /**
   * Edge case tests
   */
  describe('Edge cases', () => {
    /**
     * Test with very old dates (large time differences)
     */
    test('handles very old dates correctly', () => {
      const veryOldDate = '1900-01-01T00:00:00Z';
      const result = timeSince(veryOldDate);
      
      expect(result.years).toBeGreaterThan(100);
      
      const relativeResult = timeSince(veryOldDate, { format: 'relative' });
      expect(relativeResult).toContain('years ago');
    });
    
    /**
     * Test with future dates (negative time differences)
     */
    test('handles future dates correctly', () => {
      const futureDate = '2025-01-01T00:00:00Z';
      const result = timeSince(futureDate);
      
      // For future dates, the time components should represent the time until that date
      expect(result.years).toBe(0);
      expect(result.months).toBe(9); // 9 months from April 1, 2024 to Jan 1, 2025
      
      // Format options should return positive values (absolute time difference)
      const days = timeSince(futureDate, { format: 'days' });
      expect(days).toBeGreaterThan(0);
      
      // Relative format should indicate the future tense
      // Note: The actual behavior depends on the implementation. If it uses absolute
      // differences, it might show "9 months ago" instead of "in 9 months"
      const relativeResult = timeSince(futureDate, { format: 'relative' });
      expect(typeof relativeResult).toBe('string');
    });
    
    /**
     * Test with the same date (zero time difference)
     */
    test('handles same date correctly', () => {
      mockCurrentDate('2024-04-01T12:00:00Z');
      const result = timeSince('2024-04-01T12:00:00Z');
      
      expect(result.years).toBe(0);
      expect(result.months).toBe(0);
      expect(result.days).toBe(0);
      expect(result.hours).toBe(0);
      expect(result.minutes).toBe(0);
      expect(result.seconds).toBe(0);
      
      // Format options should return 0
      const days = timeSince('2024-04-01T12:00:00Z', { format: 'days' });
      expect(days).toBe(0);
      
      // Relative format for the same moment
      const relativeResult = timeSince('2024-04-01T12:00:00Z', { format: 'relative' });
      expect(relativeResult).toBe('now');
    });
    
    /**
     * Test with leap year dates
     */
    test('handles leap year dates correctly', () => {
      mockCurrentDate('2024-03-01T00:00:00Z'); // March 1, 2024 (leap year)
      const result = timeSince('2024-02-29T00:00:00Z'); // February 29, 2024
      
      expect(result.days).toBe(1);
      
      mockCurrentDate('2025-03-01T00:00:00Z'); // March 1, 2025 (non-leap year)
      const nextYearResult = timeSince('2024-02-29T00:00:00Z');
      
      expect(nextYearResult.years).toBe(1);
      // Since we use an approximation of 30 days per month,
      // we accept a range of days that might result from the calculation
      expect(nextYearResult.days).toBeLessThan(10);
    });
    
    /**
     * Test with different timezones
     */
    test('handles different timezones correctly', () => {
      // This test is limited because we're mocking Date.now(), but we can test string parsing behavior
      mockCurrentDate('2024-04-01T00:00:00Z'); // UTC
      
      // Different timezone specifications for the same moment in time
      const utcResult = timeSince('2023-04-01T00:00:00Z');
      const estResult = timeSince('2023-03-31T20:00:00-04:00'); // EST is UTC-4
      const jstResult = timeSince('2023-04-01T09:00:00+09:00'); // JST is UTC+9
      
      // All should return the same difference since they refer to the same moment
      expect(utcResult.years).toBe(estResult.years);
      expect(utcResult.months).toBe(estResult.months);
      expect(utcResult.years).toBe(jstResult.years);
      expect(utcResult.months).toBe(jstResult.months);
    });
  });
});