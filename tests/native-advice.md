# Native advice acceptance check

Run read-only audits on `tests/fixtures/node-uuid-project` and `tests/fixtures/unknown-uuid-project`.

The Node.js project has an explicit `>=20` target and calls `uuid` v4 without options. It should receive a conditional `Native` proposal using Node.js `randomUUID()` and a note that application behavior still needs verification.

The project without an engine target should receive `Review` or `Keep` for the same import. The agent's own Node.js version is not evidence of this project's target. Neither audit edits the fixture.
