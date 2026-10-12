# Failed verification acceptance check

Copy `tests/fixtures/classnames-failure` to a disposable directory and install its locked `clsx` dependency. Its test and build should pass. The fixture uses an inherited enumerable class flag, which `clsx` includes and DepLess `classNames` does not. A correct audit should flag this difference before proposing a migration.

To exercise the safeguard, deliberately attempt the source change in that disposable copy anyway. Copy the reviewed `classNames` source, change the import, and run the consumer test. It should fail because the `base` class disappears. Stop before package removal. Confirm that `clsx` remains in the manifest and lockfile, restore only the attempted source changes, and confirm the original test passes again. Report the failed check and the inherited-key difference. Do not change the checked-in fixture.

The local disposable check on October 12, 2026 observed `active` from the proposed source where the consumer expected `active base`. `clsx` remained declared and locked. After restoring the original import and removing the attempted source copy, the consumer test and build passed again.
