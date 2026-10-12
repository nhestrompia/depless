import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const allowedRuntimes = new Set(['browser', 'node', 'bun', 'deno', 'workers']);
const semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function requireString(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} must be a nonempty string`);
}

function requireStringList(value, label, allowEmpty = false) {
  if (!Array.isArray(value) || (!allowEmpty && value.length === 0) || value.some((entry) => typeof entry !== 'string' || !entry.trim()) || new Set(value).size !== value.length) {
    throw new Error(`${label} must be a list of unique nonempty strings`);
  }
}

export function validateRegistry(root, buildDirectory, catalogName = 'registry.json') {
  const catalog = readJson(join(root, catalogName));
  if (!Array.isArray(catalog.items) || catalog.items.length === 0) throw new Error('catalog must contain items');
  const names = new Set();

  for (const item of catalog.items) {
    requireString(item.name, 'item name');
    if (names.has(item.name)) throw new Error(`duplicate item ${item.name}`);
    names.add(item.name);
    if (item.type !== 'registry:lib') throw new Error(`${item.name}: expected registry:lib`);
    requireString(item.title, `${item.name}: title`);
    requireString(item.description, `${item.name}: description`);
    if (!Array.isArray(item.files) || item.files.length !== 2) throw new Error(`${item.name}: expected source and license files`);

    const source = item.files.find((file) => file.path.endsWith('/index.ts'));
    const license = item.files.find((file) => file.path === 'LICENSE');
    if (!source || !license || source.type !== 'registry:file' || license.type !== 'registry:file') {
      throw new Error(`${item.name}: source and license must be raw registry files`);
    }
    if (source.target !== `@lib/${item.name}.ts` || license.target !== `~/licenses/depless-${item.name}-LICENSE`) {
      throw new Error(`${item.name}: unexpected consumer targets`);
    }

    const itemDirectory = dirname(source.path);
    const metadata = readJson(join(root, itemDirectory, 'metadata.json'));
    requireString(metadata.id, `${item.name}: metadata id`);
    if (metadata.id !== itemDirectory.replace(/^registry\//, '')) throw new Error(`${item.name}: metadata id differs from source path`);
    if (!semver.test(metadata.version)) throw new Error(`${item.name}: version must be major.minor.patch`);
    requireString(metadata.description, `${item.name}: metadata description`);
    if (metadata.language !== 'typescript') throw new Error(`${item.name}: unsupported language`);
    requireStringList(metadata.dependencies, `${item.name}: dependencies`, true);
    if (metadata.dependencies.some((dependency) => !/^(?:@[^/\s]+\/)?[^@\s/]+@[0-9]+(?:\.[0-9]+){0,2}$/.test(dependency))) {
      throw new Error(`${item.name}: dependencies must use exact versions`);
    }
    const declaredDependencies = item.dependencies ?? [];
    if (JSON.stringify(declaredDependencies) !== JSON.stringify(metadata.dependencies)) throw new Error(`${item.name}: catalog dependencies differ from metadata`);
    requireStringList(metadata.runtimes, `${item.name}: runtimes`);
    requireStringList(metadata.validatedRuntimes, `${item.name}: validatedRuntimes`);
    if (metadata.runtimes.some((runtime) => !allowedRuntimes.has(runtime)) || metadata.validatedRuntimes.some((runtime) => !metadata.runtimes.includes(runtime))) {
      throw new Error(`${item.name}: invalid runtime declaration`);
    }
    requireStringList(metadata.capabilities, `${item.name}: capabilities`);
    if (metadata.license !== 'MIT') throw new Error(`${item.name}: license must match repository MIT license`);
    requireString(metadata.provenance, `${item.name}: provenance`);
    for (const file of ['README.md', 'index.test.mjs']) {
      if (!existsSync(join(root, itemDirectory, file))) throw new Error(`${item.name}: missing ${file}`);
    }

    const built = readJson(join(buildDirectory, `${item.name}.json`));
    if (built.name !== item.name || built.type !== item.type || !Array.isArray(built.files) || built.files.length !== item.files.length) {
      throw new Error(`${item.name}: built item does not match catalog`);
    }
    for (const catalogFile of item.files) {
      const builtFile = built.files.find((file) => file.path === catalogFile.path && file.target === catalogFile.target && file.type === catalogFile.type);
      if (!builtFile || builtFile.content !== readFileSync(join(root, catalogFile.path), 'utf8')) {
        throw new Error(`${item.name}: installable ${catalogFile.path} differs from reviewed source`);
      }
    }
  }
  return names.size;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const count = validateRegistry(process.cwd(), resolve(process.argv[2] ?? '.registry-dist'));
  console.log(`Validated ${count} installable registry items`);
}
