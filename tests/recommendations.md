# Recommendation acceptance check

Run a read-only DepLess audit on `tests/fixtures/recommendations-project`.

The report should make `unused-example` a `Remove` candidate only after checking the relevant project references. It should keep `zod`, because this fixture uses a runtime schema and a bounded replacement has not been shown to preserve its behavior. It should mark `maybe-adapter` `Review`, because the dynamic import can name a different package at runtime.

Each result should include evidence, confidence, required behavior where applicable, compatibility concerns, and the expected maintenance cost of a change. A focused request about `zod` should explain the same keep decision. The project remains unchanged.
