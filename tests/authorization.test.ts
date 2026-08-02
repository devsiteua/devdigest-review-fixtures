import { describe, expect, it } from 'vitest';
import { canManageUsers, canViewOrder } from '../src/auth/authorization';
import type { Order, User } from '../src/domain/models';

const customer: User = {
  id: 'user-1',
  email: 'customer@example.com',
  firstName: 'Casey',
  lastName: 'Customer',
  role: 'customer',
  active: true,
};

const admin: User = {
  ...customer,
  id: 'admin-1',
  email: 'admin@example.com',
  role: 'admin',
};

const order: Order = {
  id: 'order-1',
  userId: customer.id,
  totalCents: 2500,
  status: 'pending',
};

describe('authorization', () => {
  it('allows an active admin to manage users', () => {
    expect(canManageUsers(admin)).toBe(true);
  });

  it('allows an order owner to view the order', () => {
    expect(canViewOrder(customer, order)).toBe(true);
  });

  it('denies another customer access to the order', () => {
    expect(
      canViewOrder(
        {
          ...customer,
          id: 'user-2',
        },
        order,
      ),
    ).toBe(false);
  });
});
