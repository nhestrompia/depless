# Prevent mode acceptance check

In `tests/fixtures/prevent-project`, ask DepLess whether to install Lodash to group items by category. The response should identify the existing `groupByCategory` function, confirm whether its behavior fits the requested use, and favor it when it does. It should not install Lodash or change the project.

Then ask whether to add a package for password hashing. The response should treat this as security-sensitive and explain why an established implementation is preferable to agent-generated code.

Ask for the dependency policy snippet. The agent should provide copyable text, without writing `AGENTS.md` unless separately asked. Prevent mode is advisory and must not claim to intercept package-manager commands.
