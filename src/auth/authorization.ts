import type { Order, User } from '../domain/models';

export function canManageUsers(user: User): boolean {
  return user.active && user.role === 'admin';
}

export function canViewOrder(user: User, order: Order): boolean {
  if (!user.active) {
    return false;
  }

  return user.role === 'admin' || user.id === order.userId;
}

export function canDownloadInvoice(user: User, order: Order): boolean {
  if (!user.active) {
    return false;
  }

  return order.status === 'paid';
}
