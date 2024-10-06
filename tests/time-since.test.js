import { timeSince } from '../src/time-since.js';

// Helper function to mock the current date
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

// Cleanup function to reset Date to its original state
const resetMockDate = () => {
  global.Date = Date;
};

describe('timeSince function', () => {
  beforeEach(() => {
    // Mock the current date to a fixed point in time for consistent tests
    mockCurrentDate("2024-04-01T00:00:00Z");
  });

  afterEach(() => {
    // Reset the Date object after each test
    resetMockDate();
  });

  test('handles string objects as input', () => {
    const result = timeSince('2019-12-31');
    expect(result.years).toBe(4);
    expect(result.months).toBe(3);
    // Add more assertions as needed
  });

  test('handles Date objects as input', () => {
    const result = timeSince(new Date('2019-12-31'));
    expect(result.years).toBe(4);
    expect(result.months).toBe(3);
    // Add more assertions as needed
  });

  test('returns all expected time units', () => {
    const result = timeSince(new Date('2023-12-31'));
    expect(result).toHaveProperty('years');
    expect(result).toHaveProperty('months');
    expect(result).toHaveProperty('days');
    expect(result).toHaveProperty('hours');
    expect(result).toHaveProperty('minutes');
    expect(result).toHaveProperty('seconds');
    // Ensure each unit is a number
    expect(typeof result.years).toBe('number');
    expect(typeof result.months).toBe('number');
    // Add more assertions as needed
  });

  test('returns milliseconds when format is milliseconds', () => {
    const result = timeSince('2024-03-31T23:59:59Z', { format: 'milliseconds' });
    expect(result).toBe(1000);
  });

  test('returns seconds when format is seconds', () => {
    const result = timeSince('2024-03-31T23:59:50Z', { format: 'seconds' });
    expect(result).toBe(10);
  });

  test('returns minutes when format is minutes', () => {
    const result = timeSince('2024-03-31T23:50:00Z', { format: 'minutes' });
    expect(result).toBe(10);
  });

  test('returns hours when format is hours', () => {
    const result = timeSince('2024-03-31T22:00:00Z', { format: 'hours' });
    expect(result).toBe(2);
  });

  test('returns days when format is days', () => {
    const result = timeSince('2024-03-30T00:00:00Z', { format: 'days' });
    expect(result).toBe(2);
  });

  test('returns months when format is months', () => {
    const result = timeSince('2023-01-01T00:00:00Z', { format: 'months' });
    expect(result).toBe(15);
  });

  test('returns years when format is years', () => {
    const result = timeSince('2020-01-01T00:00:00Z', { format: 'years' });
    expect(result).toBe(4);
  });

  test('returns relative time in default locale', () => {
    const result = timeSince('2023-04-01T00:00:00Z', { format: 'relative' });
    expect(result).toBe('last year');
  });

  test('returns relative time in specified locale', () => {
    const result = timeSince('2020-01-01T00:00:00Z', { format: 'relative', locale: 'fr' });
    expect(result).toBe('il y a 4 ans');
  });
});