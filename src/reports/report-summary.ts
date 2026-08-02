import type { ReportRow } from '../domain/models';

export function summarizeReport(rows: readonly ReportRow[]): number {
  return rows.reduce((total, row) => total + row.value, 0);
}
