import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Native Module Demo</Text>

      <Text style={styles.sectionTitle}>Native Button Test</Text>

      <Text style={styles.sectionTitle}>Features</Text>
      <Text>• SwiftUI Button on iOS</Text>
      <Text>• Material3 Button on Android</Text>
      <Text>• Cross-platform TypeScript interface</Text>
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
  bottomSheet: {
    position: "absolute",
    width: 0,
    height: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    gap: 10,
  },
});
