# Group by

`groupBy(items, keyFor)` visits an iterable once and returns a `Map` of arrays. Each array keeps the input order, and the `Map` keeps the order in which keys first appeared. Keys use `Map` equality, so object keys keep their identity. An empty input returns an empty `Map`.

Use native `Map.groupBy` when every configured target supports it and its callback contract fits the application. This item is useful when `Map` exists but `Map.groupBy` does not. The native API also passes an index to its callback; this implementation passes only the item. It is not a drop-in replacement for Lodash `groupBy`, which returns an object with string keys.

This is original DepLess source under the repository's MIT license and has no runtime package dependencies. Node.js behavior is tested here. Modern browser and Bun use is intended but has not yet been run in CI. Copy the standalone source from a reviewed revision and preserve the license notice.

Native API reference: [ECMAScript `Map.groupBy`](https://tc39.es/ecma262/2024/multipage/keyed-collections.html#sec-map.groupby).
