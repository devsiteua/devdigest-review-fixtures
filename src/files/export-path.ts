import path from 'node:path';

export function resolveExportPath(
  exportRoot: string,
  requestedFileName: string,
): string {
  const safeFileName = path.basename(requestedFileName);
  const normalizedRoot = path.resolve(exportRoot);
  const resolvedPath = path.resolve(normalizedRoot, safeFileName);

  if (!resolvedPath.startsWith(`${normalizedRoot}${path.sep}`)) {
    throw new Error('Export path must remain inside the export directory');
  }

  return resolvedPath;
}
