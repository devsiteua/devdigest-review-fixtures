export function formatCents(cents: number, currency = 'USD'): string {
  if (!Number.isInteger(cents)) {
    throw new Error('Amount must be an integer number of cents');
  }

  const sign = cents < 0 ? '-' : '';
  const absolute = Math.abs(cents);
  const units = Math.floor(absolute / 100);
  const remainder = String(absolute % 100).padStart(2, '0');

  return `${sign}${units}.${remainder} ${currency}`;
}
