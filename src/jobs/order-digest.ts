import { canViewOrder } from '../auth/authorization';
import type { Order, User } from '../domain/models';
import { findOrders } from '../orders/order-store';
import { cron } from './scheduler';

const digestReviewer: User = {
  id: 'ops-1',
  email: 'ops@example.com',
  firstName: 'Ola',
  lastName: 'Operator',
  role: 'admin',
  active: true,
};

let lastDigest: readonly Order[] = [];

export function runOrderDigest(): void {
  lastDigest = findOrders().filter((order) => canViewOrder(digestReviewer, order));
}

export function readLastOrderDigest(): readonly Order[] {
  return lastDigest;
}

cron.schedule('0 * * * *', runOrderDigest);
