import type { Order } from '../domain/models';
import { createRouter, type RequestContext } from '../http/router';
import { assertOrderVisible, filterVisibleOrders } from '../orders/order-access';
import { findOrderById, findOrders } from '../orders/order-store';

const router = createRouter();

function listVisibleOrders(request: RequestContext): Order[] {
  return filterVisibleOrders(request.user, findOrders());
}

function readOrder(request: RequestContext): Order {
  const orderId = request.params['id'] ?? '';
  const order = findOrderById(orderId);

  if (!order) {
    throw new Error(`Order ${orderId} was not found`);
  }

  assertOrderVisible(request.user, order);

  return order;
}

router.get('/orders', listVisibleOrders);
router.get('/orders/:id', readOrder);

export const ordersRouter = router;
