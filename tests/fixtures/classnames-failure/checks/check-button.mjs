import assert from 'node:assert/strict';
import test from 'node:test';

import { buttonClass } from '../src/button.js';

test('includes inherited class flags used by this project', () => {
  assert.equal(buttonClass(true), 'active base');
  assert.equal(buttonClass(false), 'base');
});
