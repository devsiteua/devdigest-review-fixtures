import { describe, expect, it } from 'vitest';
import type { Order, User } from '../src/domain/models';
import { assertOrderVisible, filterVisibleOrders } from '../src/orders/order-access';

const customer: User = {
  id: 'user-1',
  email: 'customer@example.com',
  firstName: 'Casey',
  lastName: 'Customer',
  role: 'customer',
  active: true,
};

const ownOrder: Order = {
  id: 'order-1',
  userId: customer.id,
  totalCents: 2500,
  status: 'paid',
};

const otherOrder: Order = {
  id: 'order-2',
  userId: 'user-2',
  totalCents: 1800,
  status: 'pending',
};

describe('order access', () => {
  it('accepts an order the user owns', () => {
    expect(() => assertOrderVisible(customer, ownOrder)).not.toThrow();
  });

  it('rejects an order that belongs to somebody else', () => {
    expect(() => assertOrderVisible(customer, otherOrder)).toThrow(
      'may not view order order-2',
    );
  });

  it('keeps only the visible orders', () => {
    expect(filterVisibleOrders(customer, [ownOrder, otherOrder])).toEqual([ownOrder]);
  });
});
