// Copyright (c) 2026 nhestrompia. Licensed under MIT; see the repository LICENSE.
export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly ClassValue[]
  | Readonly<Record<string, unknown>>;

export function classNames(...values: ClassValue[]): string {
  const classes: string[] = [];

  function append(value: ClassValue): void {
    if (!value) return;

    if (typeof value === 'string' || typeof value === 'number') {
      classes.push(String(value));
      return;
    }

    if (Array.isArray(value)) {
      for (const nested of value) append(nested);
      return;
    }

    if (typeof value === 'object') {
      for (const [name, enabled] of Object.entries(value)) {
        if (enabled) classes.push(name);
      }
    }
  }

  for (const value of values) append(value);
  return classes.join(' ');
}
