import { NativeModule, requireNativeModule } from 'expo';

import { RazorpayOptions, PaymentResult } from './Razorpay.types';

declare class RazorpayModule extends NativeModule {
  SDK_VERSION: string;
  initializePayment(options: RazorpayOptions): Promise<PaymentResult>;
  getVersion(): string;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<RazorpayModule>('Razorpay');
