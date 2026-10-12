import assert from 'node:assert/strict';
import test from 'node:test';

import { createSearchScheduler } from '../src/search.js';

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('latest search runs once after quiet period', async () => {
  const calls = [];
  const scheduler = createSearchScheduler((query) => calls.push(query));
  scheduler.update('a');
  scheduler.update('ab');
  await pause(35);
  assert.deepEqual(calls, ['ab']);
});

test('cancel prevents a pending search', async () => {
  const calls = [];
  const scheduler = createSearchScheduler((query) => calls.push(query));
  scheduler.update('cancelled');
  scheduler.cancel();
  await pause(35);
  assert.deepEqual(calls, []);
});

test('flush runs pending search immediately', async () => {
  const calls = [];
  const scheduler = createSearchScheduler((query) => calls.push(query));
  scheduler.update('now');
  assert.equal(scheduler.flush(), 1);
  assert.deepEqual(calls, ['now']);
  await pause(35);
  assert.deepEqual(calls, ['now']);
});
