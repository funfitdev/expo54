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
