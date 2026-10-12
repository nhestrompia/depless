# Throttle

`throttle(callback, waitMs)` starts a fixed window on the first call. It invokes the callback once at the end of that window with the latest arguments. Calls during the window do not move its end. A call after the window starts a new one, so steady traffic can produce one call per interval.

`cancel()` discards the pending call. `flush()` immediately invokes the latest pending call, returns its result, and ends the window. It returns `undefined` when nothing is pending. The throttled function returns `void`. The wait must be a non-negative finite number; zero schedules a timer. The callback's `this` binding is not preserved.

This entry has no leading invocation or configurable leading and trailing options. It is not a drop-in replacement for Lodash throttle or other throttle packages. Check the consumer's required timing behavior before replacing a dependency.

The source is original DepLess code under the repository's MIT license and has no runtime package dependencies. Node.js behavior is tested with controlled timers. Modern browser and Bun use is intended but has not yet been run in CI. Copy the source from a reviewed revision and preserve the license notice.
