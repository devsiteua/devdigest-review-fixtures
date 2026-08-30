# Metrics naming conventions

These conventions apply to every metric emitted by the service. They exist so that
dashboards and alerts stay readable as new workflows are added.

## Name structure

Use lowercase `snake_case` segments joined by dots:

```text
<domain>.<subject>.<measurement>
```

Examples:

```text
orders.capture.duration_ms
orders.capture.failures_total
reports.export.duration_ms
users.display_name.lookups_total
```

## Rules

1. Start with the domain the metric belongs to: `orders`, `payments`, `reports`,
   `users`, or `notifications`.
2. Keep the subject a noun, not a verb phrase: `capture`, `export`, `lookup`.
3. End with the measurement and its unit.
4. Use `_total` for monotonically increasing counters.
5. Use `_ms` for durations and `_bytes` for sizes; never mix units in one metric.
6. Use `_ratio` for values between `0` and `1`; do not emit percentages.

## Labels

Labels describe dimensions, never identities.

- Allowed: `status`, `role`, `gateway`, `report_kind`.
- Not allowed: user IDs, order IDs, e-mail addresses, or any other high-cardinality
  or personal value.

Keep the label set stable for a given metric. Adding or removing a label changes the
time series and breaks existing dashboards.

## Renaming an existing metric

1. Emit the new name alongside the old one.
2. Migrate dashboards and alerts.
3. Remove the old name in a later change.
