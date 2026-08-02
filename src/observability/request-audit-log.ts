export interface AuditableRequest {
  method: string;
  path: string;
  headers: Record<string, string>;
  body: unknown;
  userId?: string;
}

export interface AuditLogSink {
  write(line: string): void;
}

export function buildAuditEntry(request: AuditableRequest): Record<string, unknown> {
  return {
    method: request.method,
    path: request.path,
    userId: request.userId ?? 'anonymous',
    authorization: request.headers.authorization,
    body: request.body,
  };
}

export function recordRequestAudit(
  sink: AuditLogSink,
  request: AuditableRequest,
): void {
  sink.write(JSON.stringify(buildAuditEntry(request)));
}
