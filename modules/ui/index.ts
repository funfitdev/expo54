// Reexport the native module. On web, it will be resolved to UiModule.web.ts
// and on native platforms to UiModule.ts
export { default } from './src/UiModule';
export { default as UiView } from './src/UiView';
export * from  './src/Ui.types';
