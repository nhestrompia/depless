# Classnames discovery acceptance check

Audit `tests/fixtures/classnames-discovery-project`. The report should cite the call site, propose `strings/classnames` with its partial compatibility, and state that a migration would add the standalone TypeScript source and MIT license, then change the default import to a named `classNames` import. It should not edit the fixture.

Audit `tests/fixtures/classnames-dedupe-project`. Its `classnames/dedupe` import uses behavior the registry item does not promise. The action should be `Review` or `Keep`, not a drop-in registry replacement. It should also remain unchanged.
