import { requireNativeView } from 'expo';
import * as React from 'react';

import { NativeButtonViewProps } from './Calculator.types';

const NativeView: React.ComponentType<NativeButtonViewProps> =
  requireNativeView('Calculator_NativeButtonView');

export default function NativeButtonView(props: NativeButtonViewProps) {
  return <NativeView {...props} />;
}