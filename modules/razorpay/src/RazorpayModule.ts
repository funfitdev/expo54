import { NativeModule, requireNativeModule } from 'expo';

import { RazorpayModuleEvents } from './Razorpay.types';

declare class RazorpayModule extends NativeModule<RazorpayModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<RazorpayModule>('Razorpay');
