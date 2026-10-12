import assert from 'node:assert/strict';
import test from 'node:test';

import { throttle } from './index.ts';

test('runs once per fixed window with the latest arguments', (context) => {
  context.mock.timers.enable({ apis: ['setTimeout'] });
  const calls = [];
  const limited = throttle((value) => calls.push(value), 20);

  limited('first');
  context.mock.timers.tick(10);
  limited('second');
  context.mock.timers.tick(10);
  assert.deepEqual(calls, ['second']);

  limited('third');
  context.mock.timers.tick(20);
  assert.deepEqual(calls, ['second', 'third']);
});

test('cancel discards a pending window', (context) => {
  context.mock.timers.enable({ apis: ['setTimeout'] });
  const calls = [];
  const limited = throttle((value) => calls.push(value), 20);
  limited('discard');
  limited.cancel();
  context.mock.timers.tick(20);
  assert.deepEqual(calls, []);
});

test('flush runs the latest pending call once', (context) => {
  context.mock.timers.enable({ apis: ['setTimeout'] });
  const limited = throttle((value) => value.toUpperCase(), 20);
  limited('first');
  limited('last');
  assert.equal(limited.flush(), 'LAST');
  context.mock.timers.tick(20);
  assert.equal(limited.flush(), undefined);
});
