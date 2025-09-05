import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PaymentStatus, Razorpay, RazorpayOptions } from "../modules/razorpay";

export default function RazorpayTestScreen() {
  const handlePayment = async () => {
    try {
      const options: RazorpayOptions = {
        key: "rzp_test_1DP5mmOlF5G5ag", // Replace with your test key
        amount: 50000, // 500 INR in paise
        currency: "INR",
        name: "Test Company",
        description: "Test Transaction",
        image: "https://your-company-logo.png",
        orderId: "order_test_123", // Replace with actual order ID from your backend
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9876543210",
        },
        notes: {
          address: "Test Address",
          merchant_order_id: "TEST_ORDER_123",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          backdropClose: false,
          escape: true,
          handleback: true,
          confirmClose: true,
        },
      };

      console.log("Starting Razorpay payment with options:", options);
      const result = await Razorpay.initializePayment(options);

      console.log("Payment result:", result);

      switch (result.status) {
        case PaymentStatus.SUCCESS:
          Alert.alert(
            "Payment Successful!",
            `Payment ID: ${result.paymentId}`,
            [{ text: "OK" }]
          );
          break;

        case PaymentStatus.ERROR:
          Alert.alert(
            "Payment Failed",
            result.error?.description || "Unknown error occurred",
            [{ text: "OK" }]
          );
          break;

        case PaymentStatus.CANCELLED:
          Alert.alert("Payment Cancelled", "Payment was cancelled by user", [
            { text: "OK" },
          ]);
          break;
      }
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert(
        "Error",
        "Failed to initialize payment: " + (error as Error).message,
        [{ text: "OK" }]
      );
    }
  };

  const getSDKVersion = () => {
    try {
      const version = Razorpay.getVersion();
      Alert.alert("SDK Version", version, [{ text: "OK" }]);
    } catch (error) {
      console.error("Error getting SDK version:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Razorpay Integration Test</Text>

      <Text style={styles.subtitle}>SDK Version: {Razorpay.SDK_VERSION}</Text>

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Start Payment (₹500)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={getSDKVersion}>
        <Text style={styles.secondaryButtonText}>Get SDK Version</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Test Instructions:</Text>
        <Text style={styles.infoText}>
          1. Replace the test key with your Razorpay test key{"\n"}
          2. Create an order on your backend and use the order_id{"\n"}
          3. Test with different amounts and configurations{"\n"}
          4. Handle the payment result in your app logic
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  button: {
    backgroundColor: "#3399cc",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#3399cc",
    marginBottom: 30,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#3399cc",
    fontSize: 16,
    fontWeight: "600",
  },
  infoBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#3399cc",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },
});
