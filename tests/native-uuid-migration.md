# Native UUID migration acceptance check

Copy `tests/fixtures/native-uuid-migration` to a disposable directory and install its locked dependencies. Ask an agent using DepLess to replace its `uuid` v4 use with a native Node.js API. Review the proposal before selecting the change.

The agent should identify the `>=20` Node.js target and the no-options v4 call, update the source to use `randomUUID` from `node:crypto`, run the consumer's tests and build, then remove `uuid` and update its lockfile. The checks should still pass after removal. The final report should name the changed file, checks run, the direct dependency count before and after, and any remaining limitation. The original fixture in this repository should remain unchanged.

In the local disposable check on October 12, 2026, the test and build passed before the edit, after the source edit, and after `npm uninstall uuid`. The direct count changed from 1 to 0, and the lockfile no longer contained `uuid`.
