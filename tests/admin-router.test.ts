import { describe, expect, it } from 'vitest';
import { adminRouter } from '../src/api/admin-router';
import type { User } from '../src/domain/models';

const admin: User = {
  id: 'admin-1',
  email: 'admin@example.com',
  firstName: 'Avery',
  lastName: 'Admin',
  role: 'admin',
  active: true,
};

const customer: User = {
  ...admin,
  id: 'user-1',
  email: 'customer@example.com',
  role: 'customer',
};

function invoke(path: string, user: User, params: Record<string, string>): unknown {
  const route = adminRouter.routes.find((candidate) => candidate.path === path);

  if (!route) {
    throw new Error(`Route ${path} is not registered`);
  }

  return route.handler({ user, params });
}

describe('adminRouter', () => {
  it('exposes the admin endpoints', () => {
    expect(adminRouter.routes.map((route) => `${route.method} ${route.path}`)).toEqual([
      'GET /admin/users',
      'GET /admin/orders/:id',
    ]);
  });

  it('denies the user directory to a customer', () => {
    expect(() => invoke('/admin/users', customer, {})).toThrow('may not manage users');
  });

  it('returns an audited order to an admin', () => {
    expect(invoke('/admin/orders/:id', admin, { id: 'order-2' })).toEqual({
      id: 'order-2',
      userId: 'user-2',
      totalCents: 1800,
      status: 'pending',
    });
  });
});
