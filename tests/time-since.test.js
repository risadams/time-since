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

});
