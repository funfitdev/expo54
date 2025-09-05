import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './Ui.types';

type UiModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class UiModule extends NativeModule<UiModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(UiModule, 'UiModule');
