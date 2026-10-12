# Indirect usage acceptance check

Run a read-only DepLess audit on `tests/fixtures/indirect-usage-project`.

The report should find `chalk` through CommonJS `require`, `eslint` through the package script, and `eslint-plugin-react` through the ESLint plugin convention. It should show that `optional-adapter` may be loaded by the dynamic import but that an environment variable can change the package name, so the use needs review.

For `unreferenced-example`, the report may say no reference was found after the relevant checks. It must not infer that an unresolved dynamic import cannot name it. No package is removed during an audit. The fixture remains unchanged.
