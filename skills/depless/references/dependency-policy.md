## Dependency policy

Before adding a JavaScript or TypeScript dependency:

1. Check whether the project already has the required behavior.
2. Check whether a compatible native API exists for every configured target.
3. Check the DepLess registry for an actual, reviewed capability.
4. Compare the maintenance cost of a small local implementation with an established package.
5. Keep established packages for complex, changing, or security-sensitive behavior when replacement is not clearly safer.
6. Explain why the chosen package or alternative fits the required behavior.

Do not replace a dependency solely to reduce package count. Do not install or remove a package during a report-only review.
