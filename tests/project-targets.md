# Project target acceptance check

Run a read-only DepLess audit against each sample project.

For `known-target-project`, expect the report to identify pnpm from `packageManager` and the lockfile, TypeScript from `tsconfig.json`, Node.js `>=20` from `engines`, and the declared Chrome browser target. It may report that these are configured targets, not a guarantee about every deployment.

For `unknown-target-project`, expect unknown package manager, language configuration, Node.js target, and browser target. The agent's own Node.js version must not appear as this project's target. Neither audit changes any fixture file.
