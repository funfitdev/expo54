import * as React from 'react';

import { RazorpayViewProps } from './Razorpay.types';

export default function RazorpayView(props: RazorpayViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
