import { requireNativeView } from 'expo';
import * as React from 'react';

import { UiViewProps } from './Ui.types';

const NativeView: React.ComponentType<UiViewProps> =
  requireNativeView('Ui');

export default function UiView(props: UiViewProps) {
  return <NativeView {...props} />;
}
