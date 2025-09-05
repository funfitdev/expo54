import RazorpayModule from './src/RazorpayModule';

export { default as RazorpayModule } from './src/RazorpayModule';
export * from './src/Razorpay.types';

/**
 * Razorpay payment integration for React Native/Expo
 * 
 * @example
 * ```typescript
 * import { Razorpay, RazorpayOptions, PaymentStatus } from './modules/razorpay';
 * 
 * const options: RazorpayOptions = {
 *   key: 'rzp_test_your_key_here',
 *   amount: 50000, // 500 INR in paise
 *   name: 'Acme Corp',
 *   description: 'Test Transaction',
 *   prefill: {
 *     email: 'test@example.com',
 *     contact: '9876543210',
 *     name: 'John Doe'
 *   },
 *   theme: {
 *     color: '#3399cc'
 *   }
 * };
 * 
 * const result = await Razorpay.initializePayment(options);
 * 
 * if (result.status === PaymentStatus.SUCCESS) {
 *   console.log('Payment successful:', result.paymentId);
 * } else {
 *   console.log('Payment failed:', result.error?.description);
 * }
 * ```
 */
export const Razorpay = {
  /**
   * Initialize and start a Razorpay payment
   * @param options Payment configuration options
   * @returns Promise resolving to payment result
   */
  initializePayment: RazorpayModule.initializePayment,
  
  /**
   * Get the Razorpay SDK version
   * @returns SDK version string
   */
  getVersion: RazorpayModule.getVersion,
  
  /**
   * SDK version constant
   */
  SDK_VERSION: RazorpayModule.SDK_VERSION,
} as const;
