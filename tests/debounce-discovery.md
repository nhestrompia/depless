# Debounce discovery acceptance check

Audit `tests/fixtures/debounce-discovery-project`. The report should cite the Lodash debounce call site, state that trailing invocation and `cancel()` fit the tested overlap, and propose `timing/debounce` as a partial registry candidate. It should name the source and license the item would add, mention the import change, and leave the project untouched.

Audit `tests/fixtures/unsupported-debounce-project`. Because it uses `leading` and `maxWait`, the report should say `Review` or `Keep` rather than present the registry item as a drop-in replacement. If a project uses other Lodash APIs, the agent should not promise that replacing debounce alone removes Lodash from the manifest.
