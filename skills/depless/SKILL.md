---
name: depless
description: Audit JavaScript and TypeScript project dependencies without changing the project. Use when a developer asks which direct packages a project declares or whether dependencies may be unnecessary.
---

# DepLess

Use the coding agent's existing file-reading tools. An ordinary audit is read-only. Do not install packages, run package scripts, change source, change manifests, or write a report into the project. Return the report in the conversation.

## Basic audit

1. Find the `package.json` for the project the developer asked about. If the current directory has none, ask which project to audit. This first version audits one package manifest at a time.
2. Read the manifest as data. Do not execute its scripts. Read the four declaration maps: `dependencies`, `devDependencies`, `peerDependencies`, and `optionalDependencies`.
3. Report every declared direct package with its exact declared version or range and its role. A package declared in more than one map has more than one role. Count declarations by role and count distinct package names separately.
4. Name the manifest used. If a declaration map is absent, count it as zero. If the manifest cannot be read or parsed, explain the problem and stop; do not guess.
5. Do not infer installed versions, actual usage, transitive impact, or removal safety from the manifest alone. State that those questions need further analysis.

Use this report shape:

```text
DepLess audit
Manifest: <project package.json>

Direct dependency declarations
Package | Declared version | Role
...

Counts: runtime <n>, development <n>, peer <n>, optional <n>
Distinct direct packages: <n>

This inventory does not establish whether any package is unused or safe to remove.
```

If the developer asks about one package, include its declaration and role in the same read-only report. If it is absent, say so.
