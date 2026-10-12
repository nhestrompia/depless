// Copyright (c) 2026 nhestrompia. Licensed under MIT; see the repository LICENSE.
export function uniqueBy<Item, Key>(
  items: Iterable<Item>,
  keyFor: (item: Item) => Key
): Item[] {
  const seen = new Set<Key>();
  const result: Item[] = [];

  for (const item of items) {
    const key = keyFor(item);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result;
}
