# Time-Since

A robust, type-safe utility for calculating and formatting time differences. `timeSince` provides a flexible solution for determining elapsed time with support for multiple output formats, internationalization, and precise handling of edge cases like future dates and timezone differences.

[![npm version](https://img.shields.io/npm/v/@risadams/time-since.svg)](https://www.npmjs.com/package/@risadams/time-since)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/risadams/time-since)

## Features

- **Type-Safe**: Written in TypeScript with full type definitions
- **Multiple Output Formats**: Return elapsed time as:
  - Complete breakdown object with years, months, days, etc.
  - Single unit values (milliseconds, seconds, days, etc.)
  - Human-readable relative strings ("2 days ago", "last year", etc.)
- **Internationalization Support**: Format relative times in any locale
- **Edge Case Handling**:
  - Future dates with correct time until representation
  - Accurate leap year calculations
  - Proper timezone handling
  - Zero time difference ("now")
- **Zero Dependencies**: Lightweight with no external dependencies
- **100% Test Coverage**: Comprehensive test suite ensures reliability

## Installation

### Using npm

```sh
npm install @risadams/time-since
```

### Using yarn

```sh
yarn add @risadams/time-since
```

### Using pnpm

```sh
pnpm add @risadams/time-since
```

## Usage

The library supports both ESM and CommonJS imports.

### ESM Import

```javascript
import { timeSince } from '@risadams/time-since';
```

### CommonJS Import

```javascript
const { timeSince } = require('@risadams/time-since');
```

### TypeScript

The package includes TypeScript type declarations:

```typescript
import { timeSince } from '@risadams/time-since';
// Types are automatically available
```

## Examples

### Basic Usage (Default Object Output)

```typescript
import { timeSince } from '@risadams/time-since';

// As of May 1, 2025
const result = timeSince('2020-01-01');
console.log(result);
/* Output:
{
  date: Date("2020-01-01T00:00:00.000Z"),
  asOf: Date("2025-05-01T00:00:00.000Z"),
  years: 5,
  months: 4,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0
}
*/
```

### Specific Time Unit Formats

```typescript
// Get total milliseconds elapsed
const ms = timeSince('2025-04-30', { format: 'milliseconds' });
console.log(ms); // Output: 86400000 (1 day in milliseconds)

// Get total days elapsed
const days = timeSince('2025-04-01', { format: 'days' });
console.log(days); // Output: 30 (30 days)

// Get total months elapsed
const months = timeSince('2024-05-01', { format: 'months' });
console.log(months); // Output: 12 (12 months)

// Get total years elapsed
const years = timeSince('2020-05-01', { format: 'years' });
console.log(years); // Output: 5 (5 years)
```

### Human-Readable Relative Time

```typescript
// Default locale (English)
const relative = timeSince('2025-04-30', { format: 'relative' });
console.log(relative); // Output: "yesterday"

// Different locales
const french = timeSince('2024-05-01', { format: 'relative', locale: 'fr' });
console.log(french); // Output: "il y a 1 an" (1 year ago)

const spanish = timeSince('2025-04-29', { format: 'relative', locale: 'es' });
console.log(spanish); // Output: "hace 2 días" (2 days ago)

const german = timeSince('2025-03-01', { format: 'relative', locale: 'de' });
console.log(german); // Output: "vor 2 Monaten" (2 months ago)
```

### Working with Future Dates

```typescript
// Future date (June 1, 2025 - 1 month in the future from May 1, 2025)
const futureResult = timeSince('2025-06-01');
console.log(futureResult.months); // Output: 1 (1 month until this date)

// Relative format automatically handles future dates
const futureRelative = timeSince('2025-06-01', { format: 'relative' });
console.log(futureRelative); // Output: "in 1 month"
```

### Working with Different Date Formats

```typescript
// ISO format
const isoDate = timeSince('2025-04-01T12:00:00Z');

// Short date format
const shortDate = timeSince('4/1/2025');

// Long date format
const longDate = timeSince('April 1, 2025');

// Unix timestamp
const timestamp = timeSince(new Date('2025-04-01').getTime());

// Date object
const dateObj = timeSince(new Date('2025-04-01'));
```

## API Reference

### timeSince(date, options?)

#### Parameters

- `date` (Date | string): The starting date from which to calculate elapsed time
- `options` (Object, optional): Configuration options
  - `format` (string, optional): Output format
    - `'object'` (default): Returns a detailed breakdown object
    - `'milliseconds'`, `'seconds'`, `'minutes'`, `'hours'`, `'days'`, `'months'`, `'years'`: Returns elapsed time in the specified unit
    - `'relative'`: Returns a human-readable string using Intl.RelativeTimeFormat
  - `locale` (string, optional): BCP 47 language tag for relative formatting (default: 'en')

#### Returns

- With format='object': A TimeSinceResult object containing date breakdown
- With format='milliseconds', 'seconds', etc.: A number representing elapsed time in that unit
- With format='relative': A localized string representing the relative time

## Running Tests

The project includes a comprehensive test suite with 100% code coverage:

```bash
# Run tests
npm test

# Run tests with coverage report
npm run test:coverage
```

## Contribute

If you think this could be better, please [open an issue](https://github.com/risadams/time-since/issues/new)!

Please note that all interactions in this organization fall under our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © 1996+ Ris Adams
