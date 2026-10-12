// Copyright (c) 2026 nhestrompia. Licensed under MIT; see the repository LICENSE.
export function parseBooleanText(value: string): boolean | undefined {
  const normalized = value.trim().toLowerCase();
  if (normalized === 'true') return true;
  if (normalized === 'false') return false;
  return undefined;
}
