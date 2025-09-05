import * as React from 'react';

import { UiViewProps } from './Ui.types';

export default function UiView(props: UiViewProps) {
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
