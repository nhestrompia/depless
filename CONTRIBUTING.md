# Contributing to DepLess

DepLess accepts small TypeScript capabilities with a clear behavior contract and a reason to own source instead of adding a package. Discuss compatibility limits before expanding an item into a package clone.

Before preparing a public proposal, confirm that you own the source or have permission to redistribute it under MIT. Remove application secrets, private paths, domain rules, and project-specific assumptions. Record where the code came from, whether third-party code was adapted, and any notices that must travel with it. Do not submit proprietary code or copy an upstream implementation without a license and provenance review.

A proposal includes standalone source, public-export tests, a README that states behavior and limits, metadata with runtime support and dependencies, and a package mapping only when a specific upstream API is claimed. Keep external runtime dependencies empty unless a maintainer accepts a documented exception. Run typechecking and the item's focused tests. Compare behavior with an original package when claiming replacement compatibility.

The [parse-boolean example](examples/proposals/parse-boolean/README.md) shows a reviewable proposal outside the root registry catalog. A maintainer checks its source, tests, license, provenance, compatibility claims, and installable output before adding an approved item to the catalog. Publishing or opening a public pull request requires human review and authorization; preparing a proposal does not publish it.

## Review and publish an approved item

After reviewing rights, source, tests, metadata, runtime claims, license, and limits, a maintainer adds the item to `registry.json` and builds `public/r` with `npx --yes shadcn@4.20.0 build --output public/r registry.json`. CI runs typechecking and tests, validates metadata, compares the installable source and license with reviewed files, and requires the tracked distribution to match a fresh build. A failed check blocks publication.

An item's metadata `version` describes its behavior contract; it is not an immutable source address. After an approved commit is pushed, consumers should use its full 40-character Git SHA. For example, replace `<full-commit-sha>` with the reviewed commit in `https://raw.githubusercontent.com/nhestrompia/depless/<full-commit-sha>/public/r/debounce.json`. Inspect the pinned JSON and its raw `registry/timing/debounce/index.ts` source at the same SHA, then run `npx shadcn@4.20.0 add <pinned-item-url> --dry-run --diff` before installing. The GitHub raw URL becomes available only after that commit is published. A later metadata version or branch update does not change bytes at the pinned SHA.
