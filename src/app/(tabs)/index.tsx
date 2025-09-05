import { PaymentStatus, Razorpay, RazorpayOptions } from "@/modules/razorpay";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRazorpayPayment = async () => {
    try {
      setIsProcessing(true);

      const options: RazorpayOptions = {
        key: "rzp_test_1234567890", // Replace with your test key
        amount: 50000, // 500 INR in paise
        currency: "INR",
        name: "Expo Native Demo",
        description: "Test Transaction from Expo App",
        prefill: {
          email: "test@example.com",
          contact: "9876543210",
          name: "John Doe",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          backdropClose: false,
          escape: true,
          handleback: true,
          confirm_close: true,
        },
      };

      const result = await Razorpay.initializePayment(options);

      if (result.status === PaymentStatus.SUCCESS) {
        Alert.alert("Payment Successful!", `Payment ID: ${result.paymentId}`, [
          { text: "OK" },
        ]);
      } else if (result.status === PaymentStatus.ERROR) {
        Alert.alert(
          "Payment Failed",
          result.error?.description || "Unknown error occurred",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert("Payment Cancelled", "Payment was cancelled by user", [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An error occurred",
        [{ text: "OK" }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Native Module Demo</Text>
      <Text>• TypeScript Support</Text>
      <Link href={"/formsheet"}>Form Sheet</Link>
      <Link href={"/formsheet-scroll"}>Form Sheet Scroll</Link>
      <Link href={"/formsheet-flatlist"}>Form Sheet FlatList</Link>
      <Link href={"/formsheet-flatlist-keyboard"}>
        Form Sheet FlatList Keyboard
      </Link>
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
  paymentButton: {
    backgroundColor: "#3399cc",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  paymentButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    gap: 10,
  },
});
