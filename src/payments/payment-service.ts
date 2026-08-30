import type { Order, PaymentResult } from '../domain/models';

export interface PaymentGateway {
  charge(orderId: string, amountCents: number): Promise<PaymentResult>;
}

/**
 * Keeps the checkout response fast by handing the charge to the gateway and
 * letting the caller continue immediately.
 */
export async function capturePaymentWithoutBlocking(
  order: Order,
  gateway: PaymentGateway,
): Promise<Order> {
  if (order.status !== 'pending') {
    throw new Error(`Order ${order.id} is not pending`);
  }

  gateway.charge(order.id, order.totalCents);

  return {
    ...order,
    status: 'paid',
  };
}

export async function capturePayment(
  order: Order,
  gateway: PaymentGateway,
): Promise<Order> {
  if (order.status !== 'pending') {
    throw new Error(`Order ${order.id} is not pending`);
  }

  if (order.totalCents <= 0) {
    throw new Error('Payment amount must be positive');
  }

  const payment = await gateway.charge(order.id, order.totalCents);

  if (payment.capturedCents !== order.totalCents) {
    throw new Error('Captured amount does not match the order total');
  }

  return {
    ...order,
    status: 'paid',
    paymentId: payment.id,
  };
}
