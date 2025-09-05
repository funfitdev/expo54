import type { StyleProp, ViewStyle } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type CalculatorModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type CalculatorViewProps = {
  url: string;
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};

export type NativeButtonViewProps = {
  style?: StyleProp<ViewStyle>;
};

export type NativeStyledTextViewProps = {
  style?: StyleProp<ViewStyle>;
};

export type OnDismissEventPayload = {
  dismissed: boolean;
};

export type NativeBottomSheetViewProps = {
  testProp?: string;
  isVisible?: boolean;
  title?: string;
  content?: string;
  onDismiss?: (event: { nativeEvent: OnDismissEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};
