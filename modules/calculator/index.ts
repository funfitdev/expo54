// Reexport the native module. On web, it will be resolved to CalculatorModule.web.ts
// and on native platforms to CalculatorModule.ts
export { default } from './src/CalculatorModule';
export { default as CalculatorView } from './src/CalculatorView';
export { default as NativeButtonView } from './src/NativeButtonView';
export { default as NativeStyledTextView } from './src/NativeStyledTextView';
export * from  './src/Calculator.types';
