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

After reviewing an audit proposal, you can ask the agent to apply a specific replacement. The first supported edit is a Node.js-only `uuid` v4 call that can use `randomUUID` from `node:crypto`. The agent should run the project's relevant checks before and after package removal and report the measured change.

## Registry source

The registry currently has [classNames](registry/strings/classnames/README.md), [debounce](registry/timing/debounce/README.md), [throttle](registry/timing/throttle/README.md), [groupBy](registry/collections/group-by/README.md), and [uniqueBy](registry/collections/unique/README.md). Review each item's behavior and tests before copying source into a project. Registry source has no runtime package dependencies.

The root `registry.json` lets the shadcn CLI install that source directly from this GitHub repository. After the registry commit is published, inspect and preview a pinned item before adding it:

```sh
npx shadcn@latest view nhestrompia/depless/classnames#<full-commit-sha>
npx shadcn@latest add nhestrompia/depless/classnames#<full-commit-sha> --dry-run --diff
npx shadcn@latest add nhestrompia/depless/classnames#<full-commit-sha>
```

The item targets the consumer's configured `lib` alias and adds a copy of the MIT license. The source is also available directly in this repository at a reviewed revision.
