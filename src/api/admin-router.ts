import { canManageUsers, canViewOrder } from '../auth/authorization';
import type { Order, User } from '../domain/models';
import { createRouter, type RequestContext } from '../http/router';
import { findOrderById } from '../orders/order-store';

const router = createRouter();

const directory: readonly User[] = [
  {
    id: 'user-1',
    email: 'customer@example.com',
    firstName: 'Casey',
    lastName: 'Customer',
    role: 'customer',
    active: true,
  },
  {
    id: 'admin-1',
    email: 'admin@example.com',
    firstName: 'Avery',
    lastName: 'Admin',
    role: 'admin',
    active: true,
  },
];

function listDirectory(request: RequestContext): readonly User[] {
  if (!canManageUsers(request.user)) {
    throw new Error(`User ${request.user.id} may not manage users`);
  }

  return directory;
}

function auditOrder(request: RequestContext): Order {
  const orderId = request.params['id'] ?? '';
  const order = findOrderById(orderId);

  if (!order || !canViewOrder(request.user, order)) {
    throw new Error(`Order ${orderId} is not available for audit`);
  }

  return order;
}

router.get('/admin/users', listDirectory);
router.get('/admin/orders/:id', auditOrder);

export const adminRouter = router;
