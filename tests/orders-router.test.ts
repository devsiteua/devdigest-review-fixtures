import { describe, expect, it } from 'vitest';
import { ordersRouter } from '../src/api/orders-router';
import type { User } from '../src/domain/models';

const customer: User = {
  id: 'user-1',
  email: 'customer@example.com',
  firstName: 'Casey',
  lastName: 'Customer',
  role: 'customer',
  active: true,
};

function invoke(path: string, user: User, params: Record<string, string>): unknown {
  const route = ordersRouter.routes.find((candidate) => candidate.path === path);

  if (!route) {
    throw new Error(`Route ${path} is not registered`);
  }

  return route.handler({ user, params });
}

describe('ordersRouter', () => {
  it('exposes the order endpoints', () => {
    expect(ordersRouter.routes.map((route) => `${route.method} ${route.path}`)).toEqual([
      'GET /orders',
      'GET /orders/:id',
    ]);
  });

  it('lists only the orders the caller owns', () => {
    expect(invoke('/orders', customer, {})).toEqual([
      { id: 'order-1', userId: 'user-1', totalCents: 2500, status: 'paid' },
    ]);
  });

  it('refuses an order owned by another customer', () => {
    expect(() => invoke('/orders/:id', customer, { id: 'order-2' })).toThrow(
      'may not view order order-2',
    );
  });
});
