import CalculatorModule, {
  CalculatorView,
  NativeButtonView,
  NativeStyledTextView,
} from "@/modules/calculator";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      <Text style={styles.sectionTitle}>
        Native Views from Calculator Module:
      </Text>

      {/* Native Button View (displays as "Native Button") */}
      <NativeButtonView style={styles.nativeButton} />

      {/* Native Styled Text View (displays "Hello from Native") */}
      <NativeStyledTextView style={styles.nativeText} />

      <Text style={styles.sectionTitle}>Module Functions:</Text>
      <Button
        title="Test Calculator Module"
        onPress={() => {
          const res = CalculatorModule.hello();
          console.log("Hello result:", res);
          console.log("PI value:", CalculatorModule.PI);
        }}
      />
      <CalculatorView
        url="https://google.com"
        onLoad={(evt) => {
          console.log("CalculatorView loaded:", evt.nativeEvent);
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  nativeButton: {
    height: 50,
    borderRadius: 8,
  },
  nativeText: {
    height: 60,
    borderRadius: 8,
  },
});
