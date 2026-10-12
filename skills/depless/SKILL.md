---
name: depless
description: Audit JavaScript and TypeScript project dependencies and configured targets without changing the project. Use when a developer asks which direct packages a project declares or whether dependencies may be unnecessary.
---

# DepLess

Use the coding agent's existing file-reading tools. An ordinary audit is read-only. Do not install packages, run package scripts, change source, change manifests, or write a report into the project. Return the report in the conversation.

## Basic audit

1. Find the `package.json` for the project the developer asked about. If the current directory has none, ask which project to audit. For a workspace root, read the root manifest and the package manifests selected by its `workspaces` patterns or `pnpm-workspace.yaml`. Limit this basic workspace scan to declared patterns; skip `node_modules` and unrelated directories. If the developer names one workspace, keep the report scoped to it and its root configuration.
2. Read each selected manifest as data. Do not execute its scripts. Read the four declaration maps: `dependencies`, `devDependencies`, `peerDependencies`, and `optionalDependencies`.
3. Read project configuration near that manifest. Check the `packageManager` field and an adjacent npm, pnpm, Yarn, or Bun lockfile to identify the package manager. If these disagree, report the conflict. If neither establishes a manager, say `unknown`. Treat Yarn as best effort because its formats and workflows vary.
4. Report configured language and runtime targets only when project evidence supports them. A `tsconfig.json` or `jsconfig.json` establishes a TypeScript or JavaScript configuration. Read Node.js or Bun constraints from declared `engines` fields or equivalent project configuration. Read browser targets from `browserslist` configuration when present. A lockfile or the agent's own runtime version does not establish the project's runtime compatibility. Mark missing targets `unknown`.
5. Report every declared direct package with its exact declared version or range, role, and declaring workspace. A package declared in more than one map has more than one role. Distinguish references to named packages in the workspace from external package dependencies; a `workspace:` range is strong evidence of an internal reference. Flag ambiguous resolution rather than treating it as external or internal with certainty. Count declarations by role for each workspace and count distinct external package names separately.
6. Name each manifest and configuration used. If a declaration map is absent, count it as zero. If a manifest cannot be read or parsed, explain the problem and stop; do not guess.
7. For each external direct dependency, inspect project source and tests for static imports and re-exports from the package root or a package subpath. Record the file and the imported binding or API. Follow renamed bindings and inspect member access on default or namespace imports when possible; a namespace import does not mean the whole package is used. Ignore mere mentions in comments and documentation as proof of code usage.
8. If no static import is found, report `No static import found; further checks needed`. Do not call the package unused or safe to remove yet. Do not infer installed versions, transitive impact, or removal safety from this first usage pass.

Use this report shape:

```text
DepLess audit
Manifest(s): <project package.json paths>
Package manager: <manager or unknown; name evidence or conflict>
Lockfile: <path or none>
Language configuration: <TypeScript, JavaScript, or unknown; name evidence>
Node.js target: <configured constraint or unknown>
Bun target: <configured constraint or unknown>
Browser targets: <configured targets or unknown>

Direct dependency declarations
Workspace | Package | Declared version | Role | External or internal
...

Counts by workspace: runtime <n>, development <n>, peer <n>, optional <n>
Distinct external direct packages: <n>

Static usage evidence
Package | Imported API or binding | Source location
...

No static import found is not proof that a package is unused. This audit does not establish whether any package is safe to remove.
```

If the developer asks about one package, include its declaration and role in the same read-only report. If it is absent, say so.
