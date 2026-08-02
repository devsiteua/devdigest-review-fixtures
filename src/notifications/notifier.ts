export interface Notifier {
  send(recipient: string, message: string): Promise<void>;
}

export async function sendOrderConfirmation(
  notifier: Notifier,
  recipient: string,
  orderId: string,
): Promise<void> {
  await notifier.send(recipient, `Order ${orderId} was processed successfully.`);
}
