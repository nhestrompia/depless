import assert from 'node:assert/strict';
import test from 'node:test';

import { buttonClass } from '../src/button.js';

test('class name reflects active state', () => {
  assert.equal(buttonClass(true), 'button active');
  assert.equal(buttonClass(false), 'button');
});
