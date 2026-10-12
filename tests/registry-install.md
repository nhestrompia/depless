# Classnames registry install acceptance check

Use the shadcn CLI to inspect `nhestrompia/depless/classnames` at a published commit SHA. Check that the resolved item has one TypeScript source file, one MIT license file, and no runtime package dependencies.

In a disposable consumer with a configured `lib` alias, preview the pinned install with `shadcn add ... --dry-run` and inspect its diff. The preview should name the destination source and license files and leave the consumer unchanged. Install the pinned item, compare the copied source with the registry source, import `classNames` from it, and confirm that `classNames('button', { active: true })` returns `button active`.

If the destination source file already exists, preview must disclose the overwrite before an install. Do not accept a registry item that silently adds runtime dependencies or files not named in its definition.
