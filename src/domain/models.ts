export type UserRole = 'customer' | 'support' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  active: boolean;
}

export type OrderStatus = 'pending' | 'paid' | 'failed';

export interface Order {
  id: string;
  userId: string;
  totalCents: number;
  status: OrderStatus;
  paymentId?: string;
}

export interface PaymentResult {
  id: string;
  capturedCents: number;
}

export interface ReportRow {
  label: string;
  value: number;
}
