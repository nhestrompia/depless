# DepLess

DepLess is an agent skill for reviewing JavaScript and TypeScript dependencies. Its read-only audit inventories direct packages in a project or basic workspace, reports configured targets, shows usage evidence, and recommends which packages to remove, replace, keep, or review. Prevent mode assesses a proposed new package before installation.

## Install

From the published repository, install the `depless` skill with an Agent Skills-compatible coding agent:

```sh
npx skills add nhestrompia/depless --skill depless
```

You can also copy `skills/depless` into your agent's skill directory. The folder contains the Agent Skills `SKILL.md` file.

## Use

Ask your agent, "Use DepLess to audit this project's dependencies." It will read the selected `package.json` and return the dependency inventory in the conversation. A basic audit does not edit the project or run package scripts.

For prevent mode, ask, "Use DepLess to evaluate whether this project should add `<package>` for `<capability>`." The agent will compare alternatives and return advice without installing anything.
