import { timeSince } from '../src/time-since.js';

const mockCurrentDate = (dateString) => {
  const realDate = Date;
  const mockDate = new Date(dateString);
  global.Date = class extends Date {
    constructor(date) {
      if (date) {
        return new realDate(date);
      }
      return mockDate;
    }
  };
};

const resetMockDate = () => {
  global.Date = Date;
};

describe('timeSince function', () => {
  beforeEach(() => {
    mockCurrentDate("2024-04-01T00:00:00Z");
  });

  afterEach(() => {
    resetMockDate();
  });

  test('handles string objects as input', () => {
    const result = timeSince('2019-12-31');
    expect(result.years).toBe(4);
    expect(result.months).toBe(3);
  });

  test('handles Date objects as input', () => {
    const result = timeSince(new Date('2019-12-31'));
    expect(result.years).toBe(4);
    expect(result.months).toBe(3);
  });

  test('returns all expected time units', () => {
    const result = timeSince(new Date('2023-12-31'));
    expect(result).toHaveProperty('years');
    expect(result).toHaveProperty('months');
    expect(result).toHaveProperty('days');
    expect(result).toHaveProperty('hours');
    expect(result).toHaveProperty('minutes');
    expect(result).toHaveProperty('seconds');
    expect(typeof result.years).toBe('number');
    expect(typeof result.months).toBe('number');
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

  test('returns relative time in specified locale (French)', () => {
    const result = timeSince('2020-01-01T00:00:00Z', { format: 'relative', locale: 'fr' });
    expect(result).toBe('il y a 4 ans');
  });

  test('returns relative time in specified locale (Spanish)', () => {
    const result = timeSince('2020-01-01T00:00:00Z', { format: 'relative', locale: 'es' });
    expect(result).toBe('hace 4 años');
  });

  test('returns relative time in specified locale (Korean)', () => {
    const result = timeSince('2020-01-01T00:00:00Z', { format: 'relative', locale: 'ko' });
    expect(result).toBe('4년 전');
  });

  test('returns relative time in specified locale (Chinese)', () => {
    const result = timeSince('2020-01-01T00:00:00Z', { format: 'relative', locale: 'zh' });
    expect(result).toBe('4年前');
  });

  test('throws an error for future dates when allowFuture is false', () => {
    expect(() => {
      timeSince('2025-01-01T00:00:00Z', { format: 'relative' });
    }).toThrow('Future dates are not allowed unless allowFuture is set to true.');
  });

  test('handles relative time for a past date across various locales', () => {
    const locales = ['fr', 'es', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh'];
    locales.forEach(locale => {
      const result = timeSince('2020-01-01T00:00:00Z', { format: 'relative', locale });
      console.log(`Locale ${locale}:`, result);
    });
  });
});
