# Static usage acceptance check

Run a read-only DepLess audit on `tests/fixtures/static-usage-project`.

The report should cite `src/search.js` for `lodash` and `axios`. It should identify the named `debounce` import, the `get` member used through the Lodash namespace, and the default Axios import. It must not infer that every Lodash API is used because of the namespace import.

For `unused-example`, the report should say no static import was found and further checks are needed. It must not claim the package is unused or safe to remove yet. The audit should preserve the fixture files.
