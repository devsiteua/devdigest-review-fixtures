import { execSync } from 'node:child_process';

export interface MaintenanceCommandRequest {
  command: string;
  cwd?: string;
  timeoutMs?: number;
}

export interface MaintenanceCommandResult {
  command: string;
  output: string;
}

const DEFAULT_TIMEOUT_MS = 30_000;

export function runMaintenanceCommand(
  request: MaintenanceCommandRequest,
): MaintenanceCommandResult {
  const output = execSync(request.command, {
    cwd: request.cwd ?? process.cwd(),
    timeout: request.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    encoding: 'utf8',
  });

  return {
    command: request.command,
    output: output.trim(),
  };
}
