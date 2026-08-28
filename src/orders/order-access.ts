import { canViewOrder } from '../auth/authorization';
import type { Order, User } from '../domain/models';

export function assertOrderVisible(user: User, order: Order): void {
  if (!canViewOrder(user, order)) {
    throw new Error(`User ${user.id} may not view order ${order.id}`);
  }
}

export function filterVisibleOrders(user: User, orders: readonly Order[]): Order[] {
  return orders.filter((order) => canViewOrder(user, order));
}
