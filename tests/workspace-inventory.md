# Workspace inventory acceptance check

Run a read-only DepLess audit on `tests/fixtures/basic-workspace`.

The report should identify the root, app, and lib manifests. It should attribute `typescript` to the root's development dependencies, `lodash` to the app's runtime dependencies, and `nanoid` to the lib's runtime dependencies. It should identify `@depless-fixture/lib` as an internal workspace dependency declared by the app, not as an external npm package.

The audit should preserve all fixture files. The report must not silently combine dependencies from different workspace manifests into one package's declarations.
