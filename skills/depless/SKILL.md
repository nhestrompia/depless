---
name: depless
description: Audit JavaScript and TypeScript project dependencies and configured targets without changing the project. Use when a developer asks which direct packages a project declares or whether dependencies may be unnecessary.
---

# DepLess

Use the coding agent's existing file-reading tools. An ordinary audit is read-only. Do not install packages, run package scripts, change source, change manifests, or write a report into the project. Return the report in the conversation.

## Basic audit

1. Find the `package.json` for the project the developer asked about. If the current directory has none, ask which project to audit. This first version audits one package manifest at a time.
2. Read the manifest as data. Do not execute its scripts. Read the four declaration maps: `dependencies`, `devDependencies`, `peerDependencies`, and `optionalDependencies`.
3. Read project configuration near that manifest. Check the `packageManager` field and an adjacent npm, pnpm, Yarn, or Bun lockfile to identify the package manager. If these disagree, report the conflict. If neither establishes a manager, say `unknown`. Treat Yarn as best effort because its formats and workflows vary.
4. Report configured language and runtime targets only when project evidence supports them. A `tsconfig.json` or `jsconfig.json` establishes a TypeScript or JavaScript configuration. Read Node.js or Bun constraints from declared `engines` fields or equivalent project configuration. Read browser targets from `browserslist` configuration when present. A lockfile or the agent's own runtime version does not establish the project's runtime compatibility. Mark missing targets `unknown`.
5. Report every declared direct package with its exact declared version or range and its role. A package declared in more than one map has more than one role. Count declarations by role and count distinct package names separately.
6. Name the manifest and configuration used. If a declaration map is absent, count it as zero. If the manifest cannot be read or parsed, explain the problem and stop; do not guess.
7. Do not infer installed versions, actual usage, transitive impact, or removal safety from the manifest alone. State that those questions need further analysis.

Use this report shape:

```text
DepLess audit
Manifest: <project package.json>
Package manager: <manager or unknown; name evidence or conflict>
Lockfile: <path or none>
Language configuration: <TypeScript, JavaScript, or unknown; name evidence>
Node.js target: <configured constraint or unknown>
Bun target: <configured constraint or unknown>
Browser targets: <configured targets or unknown>

Direct dependency declarations
Package | Declared version | Role
...

Counts: runtime <n>, development <n>, peer <n>, optional <n>
Distinct direct packages: <n>

This inventory does not establish whether any package is unused or safe to remove.
```

If the developer asks about one package, include its declaration and role in the same read-only report. If it is absent, say so.
