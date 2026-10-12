import assert from 'node:assert/strict';
import test from 'node:test';

import { parseBooleanText } from './index.ts';

test('parses explicit true and false text', () => {
  assert.equal(parseBooleanText('true'), true);
  assert.equal(parseBooleanText(' FALSE '), false);
});

test('returns undefined for text without a defined boolean meaning', () => {
  assert.equal(parseBooleanText('1'), undefined);
  assert.equal(parseBooleanText(''), undefined);
});
