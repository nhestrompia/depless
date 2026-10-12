import assert from 'node:assert/strict';
import test from 'node:test';

import { debounce } from './index.ts';

test('calls once with the latest arguments after the quiet period', (context) => {
  context.mock.timers.enable({ apis: ['setTimeout'] });
  const calls = [];
  const delayed = debounce((value) => calls.push(value), 20);

  delayed('first');
  context.mock.timers.tick(10);
  delayed('last');
  context.mock.timers.tick(19);
  assert.deepEqual(calls, []);
  context.mock.timers.tick(1);
  assert.deepEqual(calls, ['last']);
});

test('cancel prevents a pending call', (context) => {
  context.mock.timers.enable({ apis: ['setTimeout'] });
  const calls = [];
  const delayed = debounce((value) => calls.push(value), 20);

  delayed('discard');
  delayed.cancel();
  context.mock.timers.tick(20);
  assert.deepEqual(calls, []);
});

test('flush runs a pending call once and returns its result', (context) => {
  context.mock.timers.enable({ apis: ['setTimeout'] });
  const calls = [];
  const delayed = debounce((value) => {
    calls.push(value);
    return value.toUpperCase();
  }, 20);

  delayed('ready');
  assert.equal(delayed.flush(), 'READY');
  context.mock.timers.tick(20);
  assert.deepEqual(calls, ['ready']);
  assert.equal(delayed.flush(), undefined);
});

test('rejects an invalid wait instead of scheduling an unpredictable timer', () => {
  assert.throws(() => debounce(() => {}, -1), RangeError);
  assert.throws(() => debounce(() => {}, Number.NaN), RangeError);
});
