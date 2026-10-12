# Debounce consumer check

Build the local shadcn registry and preview the `debounce` item in a disposable consumer with a configured `lib` alias. The preview should name only the source and MIT license destinations. Install it, then compare the copied TypeScript source with the registry source. They should be identical.

Import `debounce` from the copied file. Call it twice before the wait elapses, then wait longer than the delay. The callback should run once with the second argument. Installing this item must not install another registry utility or a runtime npm package.
