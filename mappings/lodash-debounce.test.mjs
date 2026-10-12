import assert from 'node:assert/strict';
import test from 'node:test';

import lodash from 'lodash';
import { debounce as replacement } from '../registry/timing/debounce/index.ts';

test('trailing calls use the latest arguments in both implementations', (context) => {
  context.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const originalCalls = [];
  const replacementCalls = [];
  const original = lodash.debounce((value) => originalCalls.push(value), 20);
  const local = replacement((value) => replacementCalls.push(value), 20);

  original('first');
  local('first');
  context.mock.timers.tick(10);
  original('last');
  local('last');
  context.mock.timers.tick(20);

  assert.deepEqual(replacementCalls, originalCalls);
  assert.deepEqual(replacementCalls, ['last']);
});

test('cancel and pending flush agree for the documented overlap', (context) => {
  context.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const originalCalls = [];
  const replacementCalls = [];
  const original = lodash.debounce((value) => {
    originalCalls.push(value);
    return value.toUpperCase();
  }, 20);
  const local = replacement((value) => {
    replacementCalls.push(value);
    return value.toUpperCase();
  }, 20);

  original('discard');
  local('discard');
  original.cancel();
  local.cancel();
  context.mock.timers.tick(20);
  assert.deepEqual(replacementCalls, originalCalls);

  original('ready');
  local('ready');
  assert.equal(local.flush(), original.flush());
  context.mock.timers.tick(20);
  assert.deepEqual(replacementCalls, originalCalls);
  assert.deepEqual(replacementCalls, ['ready']);
});

test('flush after completion has a documented return-value difference', (context) => {
  context.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const original = lodash.debounce((value) => value.toUpperCase(), 20);
  const local = replacement((value) => value.toUpperCase(), 20);

  original('done');
  local('done');
  context.mock.timers.tick(20);

  assert.equal(original.flush(), 'DONE');
  assert.equal(local.flush(), undefined);
});
