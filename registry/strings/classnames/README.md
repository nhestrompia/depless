# Class names

`classNames` joins truthy string and number arguments, nested arrays, and own enumerable object keys with truthy values. It ignores booleans, empty strings, zero, `NaN`, `null`, and `undefined`. It returns a space-separated string and does not deduplicate classes.

This is an original DepLess implementation under the repository's MIT license. It has no runtime package dependencies. Node.js behavior is tested in this repository. The implementation uses standard JavaScript operations and is intended for modern browsers and Bun as well, but those runtimes have not yet been run in CI.

Read or copy `index.ts` from a reviewed repository revision. The file stands alone; copying it does not require the rest of the registry. Preserve the MIT notice when redistributing it.

This capability overlaps with common `clsx` and `classnames` use, but it is not a claimed drop-in replacement. In particular, this entry does not promise their complete input type compatibility, export names, performance, or behavior for exotic objects. Inspect the consuming call sites before replacing either package.
