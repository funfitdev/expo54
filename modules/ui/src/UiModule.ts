import { NativeModule, requireNativeModule } from 'expo';

import { UiModuleEvents } from './Ui.types';

declare class UiModule extends NativeModule<UiModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<UiModule>('Ui');
