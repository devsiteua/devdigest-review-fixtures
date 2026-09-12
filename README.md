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

## Demo branches

Branches under `demo/*` are opened from `main` and stay open as pull requests. Each one isolates a single review scenario, so `main` keeps its clean baseline while the demo branches accumulate the cases under review.

## Important

This repository is intended only for controlled code-review demonstrations. Demo branches may intentionally contain unsafe or incorrect implementations. Do not deploy or reuse code from those branches in a real system.
