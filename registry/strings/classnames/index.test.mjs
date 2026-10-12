import assert from 'node:assert/strict';
import test from 'node:test';

import { classNames } from './index.ts';

test('joins strings, nested arrays, and enabled object keys', () => {
  assert.equal(
    classNames('button', ['large', ['focused']], { disabled: false, selected: true }),
    'button large focused selected'
  );
});

test('ignores false values and preserves nonzero numbers', () => {
  assert.equal(classNames(0, 2, false, true, '', null, undefined), '2');
});

test('does not include inherited object keys', () => {
  const options = Object.create({ inherited: true });
  options.own = true;
  assert.equal(classNames(options), 'own');
});
