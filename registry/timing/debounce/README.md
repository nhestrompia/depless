# Debounce

`debounce(callback, waitMs)` returns a trailing-edge function. Each call restarts the timer and replaces the pending arguments. After `waitMs` milliseconds without another call, it invokes the callback once with the latest arguments.

`cancel()` discards a pending call. `flush()` runs a pending call immediately, returns that callback result, and prevents a later timer call. It returns `undefined` when nothing is pending. The debounced function itself returns `void`. The wait must be a non-negative finite number; zero still schedules a timer. The callback's `this` binding is not preserved.

This entry does not implement leading calls, `maxWait`, or Lodash's return-value behavior. It is not a drop-in replacement for `lodash/debounce`. Check those behaviors in the consuming project before migrating.

This is original DepLess source under the repository's MIT license and has no runtime package dependencies. Node.js behavior is tested here with controlled timers. It is intended for modern browsers and Bun as well, but those runtimes have not yet been run in CI. The source file stands alone; copy it from a reviewed revision and preserve the license notice.
