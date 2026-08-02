# Review Fixture Service

A deliberately small TypeScript codebase used for pull-request review demonstrations.

The project models a few common commerce workflows:

- authorization for users and orders;
- payment capture;
- safe export-file path resolution;
- user display names;
- report summaries;
- notifications.

The `main` branch is expected to remain small, readable, type-safe, and testable. Demo pull requests should be created from `main` and kept open independently.

## Local setup

```bash
npm install
npm run check
```

## Local verification

`npm run check` is the single command to run before opening a pull request. It runs the
type checker first and the test suite second, so a type error stops the run before any
test executes.

```bash
npm run check
```

The two steps can also be run separately while iterating:

| Command | What it does |
|---|---|
| `npm run typecheck` | Runs `tsc --noEmit` over `src/` and `tests/` without emitting output. |
| `npm test` | Runs the Vitest suite once with `vitest run`. |

Node.js 24 is expected; the version is pinned in `.nvmrc`.

## Important

This repository is intended only for controlled code-review demonstrations. Demo branches may intentionally contain unsafe or incorrect implementations. Do not deploy or reuse code from those branches in a real system.
