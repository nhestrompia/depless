# Basic audit acceptance check

Use a coding agent with the `depless` skill installed. Ask it to audit `tests/fixtures/basic-project`. This checks the public skill behavior, not an internal parser.

The response should name that project's `package.json` and list these declarations:

| Package | Declared version | Role |
|---|---|---|
| axios | ^1.8.0 | runtime |
| react | ^19.0.0 | runtime |
| typescript | ~5.9.0 | development |
| react | >=18 | peer |
| fsevents | ^2.3.3 | optional |

Expected counts are runtime 2, development 1, peer 1, optional 1, and 4 distinct package names. The response must not claim that any package is unused or safe to remove.

Compare the fixture's file content before and after the audit. It must be identical. The agent should not run package scripts or install packages.
