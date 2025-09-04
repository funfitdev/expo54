import { requireNativeView } from 'expo';
import * as React from 'react';

import { NativeStyledTextViewProps } from './Calculator.types';

const NativeView: React.ComponentType<NativeStyledTextViewProps> =
  requireNativeView('Calculator_NativeStyledTextView');

export default function NativeStyledTextView(props: NativeStyledTextViewProps) {
  return <NativeView {...props} />;
}