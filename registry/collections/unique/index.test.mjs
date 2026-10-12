import assert from 'node:assert/strict';
import test from 'node:test';

import { uniqueBy } from './index.ts';

test('keeps the first item for each selected key in input order', () => {
  const items = [
    { id: 1, name: 'first' },
    { id: 2, name: 'second' },
    { id: 1, name: 'later' }
  ];
  assert.deepEqual(uniqueBy(items, (item) => item.id), [items[0], items[1]]);
});

test('supports a key selector that normalizes values', () => {
  assert.deepEqual(uniqueBy(['Ada', 'ada', 'Grace'], (name) => name.toLowerCase()), ['Ada', 'Grace']);
});

test('handles empty input and NaN keys', () => {
  assert.deepEqual(uniqueBy([], (value) => value), []);
  assert.deepEqual(uniqueBy([1, 2, 3], () => Number.NaN), [1]);
});
