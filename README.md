# Time-Since

Given a date, return a data structure that contains the number of years,months, days, hours, minutes, and seconds since that have elapsed since that date.

## Install

```sh
npm install @risadams/time-since
```

### Examples

```javascript
const timeSince = require('@risadams/time-since');

let then = new Date(2020, 0, 1);
let elapsed = timeSince(then);

console.table(elapsed);
```

## Contribute

If you think this could be better, please [open an issue](https://github.com/risadams/time-since/issues/new)!

Please note that all interactions in this organization fall under our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © 1996+ Ris Adams
