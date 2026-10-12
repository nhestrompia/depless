# Contribution proposal acceptance check

Inspect `examples/proposals/parse-boolean`. It should include standalone source, public-export tests, metadata, documented behavior and limits, MIT provenance, and no runtime dependency. It must not appear in the root registry catalog.

Build its separate proposal catalog and inspect the generated item. After review, preview and install it in a disposable consumer, then call `parseBooleanText(' FALSE ')` from the copied source and expect `false`. The copied source and MIT license should match the proposal. An agent in contribute mode should report the prepared material and ask for review before any public publication.
