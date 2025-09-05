import { ScrollView, StyleSheet, Text } from "react-native";

export default function ModalScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ gap: 20 }}
      nestedScrollEnabled
    >
      {Array.from({ length: 20 }).map((_, i) => {
        return (
          <Text key={i} style={{ color: "white" }}>
            I see the issue now. The RazorpayOptions data class needs to
            implement the Record interface from Expo modules to be properly
            converted between JavaScript and Kotlin. Let me fix this by updating
            the data classes in the Razorpay module.
          </Text>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "green",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
