import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import test from 'node:test';

import { validateRegistry } from './validate-registry.mjs';

const repository = resolve(import.meta.dirname, '..');

function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'depless-validation-'));
  const itemDirectory = 'registry/strings/classnames';
  mkdirSync(join(root, 'registry/strings'), { recursive: true });
  cpSync(join(repository, itemDirectory), join(root, itemDirectory), { recursive: true });
  cpSync(join(repository, 'LICENSE'), join(root, 'LICENSE'));
  const catalog = {
    items: [{
      name: 'classnames', type: 'registry:lib', title: 'Class names', description: 'Join names',
      files: [
        { path: `${itemDirectory}/index.ts`, type: 'registry:file', target: '@lib/classnames.ts' },
        { path: 'LICENSE', type: 'registry:file', target: '~/licenses/depless-classnames-LICENSE' }
      ]
    }]
  };
  writeFileSync(join(root, 'registry.json'), JSON.stringify(catalog));
  const output = join(root, 'built');
  mkdirSync(output);
  writeFileSync(join(output, 'classnames.json'), JSON.stringify({
    ...catalog.items[0],
    files: catalog.items[0].files.map((file) => ({ ...file, content: readFileSync(join(root, file.path), 'utf8') }))
  }));
  return { root, output, metadataPath: join(root, itemDirectory, 'metadata.json') };
}

test('accepts complete metadata and exact installable files', (t) => {
  const sample = fixture();
  t.after(() => rmSync(sample.root, { recursive: true, force: true }));
  assert.equal(validateRegistry(sample.root, sample.output), 1);
});

test('rejects missing metadata and invalid runtime or dependency declarations', (t) => {
  const sample = fixture();
  t.after(() => rmSync(sample.root, { recursive: true, force: true }));
  const original = JSON.parse(readFileSync(sample.metadataPath, 'utf8'));
  for (const change of [
    { runtimes: ['made-up-runtime'] },
    { validatedRuntimes: ['deno'] },
    { dependencies: ['unversioned-package'] },
    { dependencies: ['example@1.0.0'] }
  ]) {
    writeFileSync(sample.metadataPath, JSON.stringify({ ...original, ...change }));
    assert.throws(() => validateRegistry(sample.root, sample.output));
  }
  rmSync(sample.metadataPath);
  assert.throws(() => validateRegistry(sample.root, sample.output));
});

test('rejects installable source that differs from reviewed source', (t) => {
  const sample = fixture();
  t.after(() => rmSync(sample.root, { recursive: true, force: true }));
  const builtPath = join(sample.output, 'classnames.json');
  const built = JSON.parse(readFileSync(builtPath, 'utf8'));
  built.files[0].content = 'export const classNames = () => "";';
  writeFileSync(builtPath, JSON.stringify(built));
  assert.throws(() => validateRegistry(sample.root, sample.output), /installable/);
});
