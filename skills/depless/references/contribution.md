# Prepare a registry contribution

Use this mode only when the developer asks to prepare a reusable DepLess item. Do not automatically publish project code.

1. Ask the developer to confirm ownership or redistribution rights for the source. Inspect the code for third-party copies, private data, secrets, internal paths, and application-specific assumptions. If rights or provenance are unclear, stop public preparation and report what needs review.
2. Check the existing registry for an equivalent capability. If one exists, consider improving that item instead of proposing a duplicate.
3. Define the smallest stable public behavior. Keep the source independently usable, with no unnecessary runtime dependencies. Document supported runtimes, untested targets, edge cases, and known limits.
4. Prepare source, public-export tests, DepLess metadata, a README, license and provenance notes, and package mappings only for APIs actually compared. Use the `examples/proposals/parse-boolean` entry as a shape example, not as a blanket recommendation to add that capability.
5. Run typechecking and focused tests. Build an installable registry item in a separate proposal catalog, inspect the generated source, and try it in a disposable consumer. Do not add it to the root registry catalog or open a public pull request without developer authorization and maintainer review.

Return the prepared files, test results, unresolved compatibility questions, provenance, and review steps to the developer.
