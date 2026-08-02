import { describe, expect, it, vi } from 'vitest';
import type { Order } from '../src/domain/models';
import { capturePayment, type PaymentGateway } from '../src/payments/payment-service';

const pendingOrder: Order = {
  id: 'order-1',
  userId: 'user-1',
  totalCents: 4200,
  status: 'pending',
};

describe('capturePayment', () => {
  it('marks an order as paid after the gateway confirms the full amount', async () => {
    const gateway: PaymentGateway = {
      charge: vi.fn().mockResolvedValue({
        id: 'payment-1',
        capturedCents: 4200,
      }),
    };

    await expect(capturePayment(pendingOrder, gateway)).resolves.toEqual({
      ...pendingOrder,
      status: 'paid',
      paymentId: 'payment-1',
    });
  });
});
