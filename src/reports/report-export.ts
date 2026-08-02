import { writeFileSync } from 'node:fs';
import path from 'node:path';
import type { ReportRow } from '../domain/models';
import { summarizeReport } from './report-summary';

export interface ExportRequest {
  exportRoot: string;
  fileName: string;
  rows: readonly ReportRow[];
}

export interface ExportResult {
  ok: boolean;
  path: string;
}

export function buildExportFileName(prefix: string, generatedAt: Date): string {
  const year = generatedAt.getFullYear();
  const month = String(generatedAt.getMonth() + 1).padStart(2, '0');
  const day = String(generatedAt.getDate()).padStart(2, '0');

  return `${prefix}-${year}-${month}-${day}.csv`;
}

export function buildArchiveFileName(prefix: string, generatedAt: Date): string {
  const year = generatedAt.getFullYear();
  const month = String(generatedAt.getMonth() + 1).padStart(2, '0');
  const day = String(generatedAt.getDate()).padStart(2, '0');

  return `${prefix}-${year}-${month}-${day}.archive.csv`;
}

function renderReportCsv(rows: readonly ReportRow[]): string {
  const lines = rows.map((row) => `${row.label},${row.value}`);
  lines.push(`total,${summarizeReport(rows)}`);

  return lines.join('\n');
}

export function exportReport(request: ExportRequest): ExportResult {
  const targetPath = path.join(request.exportRoot, request.fileName);
  const content = renderReportCsv(request.rows);

  try {
    writeFileSync(targetPath, content, 'utf8');
  } catch (error) {
    console.error(`Export of ${request.fileName} did not complete`, error);
  }

  return {
    ok: true,
    path: targetPath,
  };
}
