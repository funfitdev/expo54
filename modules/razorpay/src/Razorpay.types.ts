export interface RazorpayOptions {
  key: string;
  amount: number; // Amount in paise (smallest currency unit)
  currency?: string;
  orderId?: string;
  name: string;
  description?: string;
  image?: string;
  prefill?: PrefillOptions;
  notes?: Record<string, any>;
  theme?: ThemeOptions;
  modal?: ModalOptions;
  readonly?: ReadonlyOptions;
}

export interface PrefillOptions {
  name?: string;
  email?: string;
  contact?: string;
}

export interface ThemeOptions {
  color?: string;
  backdropColor?: string;
}

export interface ModalOptions {
  backdropClose?: boolean;
  escape?: boolean;
  handleback?: boolean;
  confirm_close?: boolean;
}

export interface ReadonlyOptions {
  email?: boolean;
  contact?: boolean;
  name?: boolean;
}

export enum PaymentStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  CANCELLED = 'cancelled',
}

export interface PaymentResult {
  status: PaymentStatus;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  error?: PaymentError;
}

export interface PaymentError {
  code: string;
  description: string;
  source?: string;
  step?: string;
  reason?: string;
}
