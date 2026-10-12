import assert from 'node:assert/strict';
import test from 'node:test';

import clsx from 'clsx';
import { classNames } from '../registry/strings/classnames/index.ts';

test('common clsx inputs produce the same class string', () => {
  const values = ['button', ['large', ['focused']], { selected: true, disabled: false }, 2, null];
  assert.equal(classNames(...values), clsx(...values));
  assert.equal(classNames(...values), 'button large focused selected 2');
});
