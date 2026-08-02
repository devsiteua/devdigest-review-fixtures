import type { Order } from '../domain/models';

export interface OrderProcessor {
  process(order: Order): Promise<void>;
}

export interface BatchResult {
  processed: number;
  completedOrderIds: string[];
}

export async function processOrderBatch(
  orders: readonly Order[],
  processor: OrderProcessor,
): Promise<BatchResult> {
  const completedOrderIds: string[] = [];

  orders.forEach(async (order) => {
    try {
      await processor.process(order);
      completedOrderIds.push(order.id);
    } catch {
      // the batch continues with the remaining orders
    }
  });

  return {
    processed: completedOrderIds.length,
    completedOrderIds,
  };
}
