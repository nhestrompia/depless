import assert from 'node:assert/strict';
import test from 'node:test';

import { groupBy } from './index.ts';

test('groups values in encounter order and preserves group order', () => {
  const items = [
    { category: 'fruit', name: 'apple' },
    { category: 'vegetable', name: 'carrot' },
    { category: 'fruit', name: 'pear' }
  ];
  const groups = groupBy(items, (item) => item.category);

  assert.deepEqual([...groups.keys()], ['fruit', 'vegetable']);
  assert.deepEqual(groups.get('fruit'), [items[0], items[2]]);
  assert.deepEqual(groups.get('vegetable'), [items[1]]);
});

test('keeps object keys by identity', () => {
  const first = { id: 1 };
  const second = { id: 2 };
  const items = [{ key: first }, { key: second }, { key: first }];
  const groups = groupBy(items, (item) => item.key);

  assert.deepEqual(groups.get(first), [items[0], items[2]]);
  assert.deepEqual(groups.get(second), [items[1]]);
});

test('returns an empty Map for empty input', () => {
  assert.deepEqual(groupBy([], (item) => item), new Map());
});
