// Reexport the native module. On web, it will be resolved to RazorpayModule.web.ts
// and on native platforms to RazorpayModule.ts
export { default } from './src/RazorpayModule';
export { default as RazorpayView } from './src/RazorpayView';
export * from  './src/Razorpay.types';
