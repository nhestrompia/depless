# Parse boolean text proposal

`parseBooleanText(value)` trims and lowercases a string, then returns `true` for `true`, `false` for `false`, or `undefined` for every other value. It never treats a nonempty string such as `false` as truthy merely because the string exists.

This is an example contribution proposal, not an item in the public DepLess registry. It has original MIT-licensed source, public-export tests, metadata, runtime declarations, and no external runtime dependencies. Node.js behavior is tested; browser and Bun use has not been validated. It has no package-to-capability mapping because it does not claim to replace a specific package.

The proposer still needs maintainer review before adding it to the root registry catalog. Consumers can inspect the raw source now, and the separate proposal catalog can be built for an installation check after review.
