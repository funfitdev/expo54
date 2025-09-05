import { requireNativeView } from 'expo';
import * as React from 'react';

import { NativeBottomSheetViewProps } from './Calculator.types';

const NativeView: React.ComponentType<NativeBottomSheetViewProps> =
  requireNativeView('Calculator_NativeBottomSheetView');

export default function NativeBottomSheetView(props: NativeBottomSheetViewProps) {
  console.log('NativeBottomSheetView render with props:', props);
  return <NativeView {...props} />;
}