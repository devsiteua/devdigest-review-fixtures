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

## Documentation

- [Metrics naming conventions](docs/metrics-naming.md)

## Important

This repository is intended only for controlled code-review demonstrations. Demo branches may intentionally contain unsafe or incorrect implementations. Do not deploy or reuse code from those branches in a real system.
