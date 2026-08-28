import { describe, expect, it } from 'vitest';
import { formatCents } from '../src/utils/format-currency';

describe('formatCents', () => {
  it('formats an amount with the default currency', () => {
    expect(formatCents(2500)).toBe('25.00 USD');
  });

  it('pads the fractional part', () => {
    expect(formatCents(1805, 'EUR')).toBe('18.05 EUR');
  });

  it('keeps the sign of a negative amount', () => {
    expect(formatCents(-99)).toBe('-0.99 USD');
  });

  it('rejects a fractional number of cents', () => {
    expect(() => formatCents(12.5)).toThrow('integer number of cents');
  });
});
