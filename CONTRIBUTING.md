# Contributing to DepLess

DepLess accepts small TypeScript capabilities with a clear behavior contract and a reason to own source instead of adding a package. Discuss compatibility limits before expanding an item into a package clone.

Before preparing a public proposal, confirm that you own the source or have permission to redistribute it under MIT. Remove application secrets, private paths, domain rules, and project-specific assumptions. Record where the code came from, whether third-party code was adapted, and any notices that must travel with it. Do not submit proprietary code or copy an upstream implementation without a license and provenance review.

A proposal includes standalone source, public-export tests, a README that states behavior and limits, metadata with runtime support and dependencies, and a package mapping only when a specific upstream API is claimed. Keep external runtime dependencies empty unless a maintainer accepts a documented exception. Run typechecking and the item's focused tests. Compare behavior with an original package when claiming replacement compatibility.

The [parse-boolean example](examples/proposals/parse-boolean/README.md) shows a reviewable proposal outside the root registry catalog. A maintainer checks its source, tests, license, provenance, compatibility claims, and installable output before adding an approved item to the catalog. Publishing or opening a public pull request requires human review and authorization; preparing a proposal does not publish it.
