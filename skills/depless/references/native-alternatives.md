# Narrow native alternatives

Use these entries only after checking the exact imported API, options, call sites, and configured execution targets. They are examples of compatible cases, not package-wide replacement rules.

## `uuid` v4 generation

For a Node.js-only call site that invokes `uuid`'s v4 function without options or buffer arguments, `randomUUID()` from `node:crypto` may provide the required random v4 identifier. Node.js added it in v14.17.0 and v15.6.0. A configured Node.js range must exclude older unsupported releases. Check that the application does not depend on `uuid` options, byte output, deterministic test hooks, or other UUID versions. Keep or review when any of those behaviors matter.

In browser code, `crypto.randomUUID()` requires a secure context and compatible browser targets. A configured browser list alone does not establish secure deployment. Check both before proposing it. Do not infer support from the coding agent's runtime or from Node.js configuration for browser call sites.

Sources: [Node.js crypto documentation](https://nodejs.org/api/crypto.html#cryptorandomuuidoptions), [Web Crypto randomUUID documentation](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID).

## Simple URL query parameters

`URLSearchParams` may replace narrow query parsing or serialization when callers need string key-value pairs, ordinary duplicate-key handling, and its exact encoding behavior. Check arrays, null values, nested values, sorting, fragment handling, and percent encoding before proposing a migration from `query-string` or a similar package. `URLSearchParams` stringifies array values differently from duplicate entries when constructed from an object, and mutating a URL's `searchParams` can change its serialized encoding. Keep or review if those differences matter.

Verify availability in every execution target. Do not infer browser compatibility from a Node.js engine constraint.

Source: [Node.js URL documentation](https://nodejs.org/api/url.html#class-urlsearchparams).
