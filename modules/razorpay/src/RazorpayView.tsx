import { requireNativeView } from 'expo';
import * as React from 'react';

import { RazorpayViewProps } from './Razorpay.types';

const NativeView: React.ComponentType<RazorpayViewProps> =
  requireNativeView('Razorpay');

export default function RazorpayView(props: RazorpayViewProps) {
  return <NativeView {...props} />;
}
