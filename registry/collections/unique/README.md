# Unique by key

`uniqueBy(items, keyFor)` returns the first item for each key produced by `keyFor`, in input order. Keys use `Set` equality, including object identity and SameValueZero handling of `NaN`. The source does not mutate the input.

For exact primitive-value uniqueness, `new Set(items)` is simpler. This capability is for cases such as retaining the first record per `id` or comparing names after normalization, where a `Set` of whole items would give the wrong result. It does not implement Lodash iteratee shorthands or `uniqBy`'s complete input contract.

This is original DepLess source under the repository's MIT license and has no runtime package dependencies. Node.js behavior is tested here. Modern browser and Bun use is intended but has not yet been run in CI. Copy the standalone source from a reviewed revision and preserve the license notice.
