import type { Order } from '../domain/models';

const orderTable: readonly Order[] = [
  { id: 'order-1', userId: 'user-1', totalCents: 2500, status: 'paid' },
  { id: 'order-2', userId: 'user-2', totalCents: 1800, status: 'pending' },
];

export function findOrders(): readonly Order[] {
  return orderTable;
}

export function findOrderById(orderId: string): Order | undefined {
  return orderTable.find((order) => order.id === orderId);
}
