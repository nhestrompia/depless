import assert from 'node:assert/strict';
import test from 'node:test';

import { createId } from '../src/id.js';

test('creates a random v4 UUID string', () => {
  const first = createId();
  const second = createId();
  assert.match(first, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  assert.notEqual(first, second);
});
