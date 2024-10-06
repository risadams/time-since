# Time-Since

This project provides an enhanced JavaScript utility function `timeSince` that calculates the time elapsed since a given date, with support for various time units and human-readable formats in different locales. The `timeSince` function is useful for applications that need to display time differences in a flexible and customizable manner.

## Features

- Calculates time elapsed in various units such as years, months, days, hours, minutes, seconds, and milliseconds.
- Supports customizable output formats (e.g., `relative`, `milliseconds`, `days`, etc.).
- Utilizes `Intl.RelativeTimeFormat` to provide human-readable relative time in different locales.
- Handles both string and `Date` object inputs.

## Install

```sh
npm install @risadams/time-since
```

## Usage

The `timeSince` function can be used to calculate the elapsed time from a given date and return the result in different formats. Below are some examples of how to use the function.

### Example 1: Basic Usage

```javascript
const timeSince = require('@risadams/time-since');

const elapsedTime = timeSince('2020-01-01');
console.log(elapsedTime);
// Output: { years: 4, months: 3, days: ..., hours: ..., minutes: ..., seconds: ..., milliseconds: ... }
```

### Example 2: Custom Format

```javascript
const elapsedDays = timeSince('2020-01-01', { format: 'days' });
console.log(elapsedDays);
// Output: 1461 (assuming the current year is 2024)
```

### Example 3: Relative Time in Different Locales

```javascript
const relativeTimeFr = timeSince('2020-01-01', { format: 'relative', locale: 'fr' });
console.log(relativeTimeFr);
// Output: "il y a 4 ans"
```

## Running Tests

The project includes unit tests written using the Jest framework. These tests cover all major functionalities of the `timeSince` function, including various input formats and customizable options.

To run the tests:

```bash
npm test
```

The test suite includes:

- Handling of both string and `Date` object inputs.
- Validation of different time units (e.g., `milliseconds`, `seconds`, `minutes`, etc.).
- Testing of relative time outputs in different locales.

## Contribute

If you think this could be better, please [open an issue](https://github.com/risadams/time-since/issues/new)!

Please note that all interactions in this organization fall under our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © 1996+ Ris Adams
