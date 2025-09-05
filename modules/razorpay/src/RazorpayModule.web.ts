import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './Razorpay.types';

type RazorpayModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class RazorpayModule extends NativeModule<RazorpayModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(RazorpayModule, 'RazorpayModule');
