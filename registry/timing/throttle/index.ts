// Copyright (c) 2026 nhestrompia. Licensed under MIT; see the repository LICENSE.
export type Throttled<Args extends unknown[], Result> = ((...args: Args) => void) & {
  cancel(): void;
  flush(): Result | undefined;
};

export function throttle<Args extends unknown[], Result>(
  callback: (...args: Args) => Result,
  waitMs: number
): Throttled<Args, Result> {
  if (!Number.isFinite(waitMs) || waitMs < 0) {
    throw new RangeError('waitMs must be a non-negative finite number');
  }

  let timer: ReturnType<typeof setTimeout> | undefined;
  let latestArgs: Args | undefined;

  function cancel(): void {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
    latestArgs = undefined;
  }

  function flush(): Result | undefined {
    if (timer === undefined || latestArgs === undefined) return undefined;
    const args = latestArgs;
    cancel();
    return callback(...args);
  }

  function limited(...args: Args): void {
    latestArgs = args;
    if (timer === undefined) {
      timer = setTimeout(() => {
        flush();
      }, waitMs);
    }
  }

  return Object.assign(limited, { cancel, flush });
}
