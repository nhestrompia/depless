# DepLess

DepLess is an agent skill for reviewing JavaScript and TypeScript dependencies. The current audit gives a read-only inventory of direct packages in a project or basic workspace and reports configured project targets. It does not yet analyze usage or suggest removals.

## Install

From the published repository, install the `depless` skill with an Agent Skills-compatible coding agent:

```sh
npx skills add nhestrompia/depless --skill depless
```

You can also copy `skills/depless` into your agent's skill directory. The folder contains the Agent Skills `SKILL.md` file.

## Use

Ask your agent, "Use DepLess to audit this project's dependencies." It will read the selected `package.json` and return the dependency inventory in the conversation. A basic audit does not edit the project or run package scripts.
