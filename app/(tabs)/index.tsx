import CalculatorModule, {
  CalculatorView,
  NativeButtonView,
  NativeStyledTextView,
  NativeBottomSheetView,
} from "@/modules/calculator";
import { Button, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

export default function HomeScreen() {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [sheetTitle, setSheetTitle] = useState("Native Bottom Sheet");
  const [sheetContent, setSheetContent] = useState("This bottom sheet is implemented using SwiftUI sheet on iOS and custom Dialog on Android!");

  const showBasicSheet = () => {
    console.log("Showing basic sheet");
    setSheetTitle("Basic Bottom Sheet");
    setSheetContent("This is a basic bottom sheet with simple content.");
    setIsBottomSheetVisible(true);
    console.log("Bottom sheet visibility set to true");
  };

  const showDetailedSheet = () => {
    setSheetTitle("Detailed Information");
    setSheetContent("This bottom sheet contains more detailed information about the native implementation. iOS uses SwiftUI's sheet with navigation controls, while Android uses a custom Dialog positioned at the bottom with proper styling and animations.");
    setIsBottomSheetVisible(true);
  };

  const showCalculatorSheet = () => {
    setSheetTitle("Calculator Functions");
    setSheetContent(`Available calculator functions:
    
• add(a, b) - Addition
• subtract(a, b) - Subtraction  
• multiply(a, b) - Multiplication
• divide(a, b) - Division
• PI constant available
• hello() returns greeting`);
    setIsBottomSheetVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Native Module Demo</Text>

      <Text style={styles.sectionTitle}>
        Native Views from Calculator Module:
      </Text>

      {/* Native Button View (displays as "Native Button") */}
      <NativeButtonView style={styles.nativeButton} />

      {/* Native Styled Text View (displays "Hello from Native") */}
      <NativeStyledTextView style={styles.nativeText} />

      <Text style={styles.sectionTitle}>Bottom Sheet Tests:</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Basic Sheet"
          onPress={showBasicSheet}
        />
        <Button
          title="Detailed Sheet"
          onPress={showDetailedSheet}
        />
        <Button
          title="Calculator Info"
          onPress={showCalculatorSheet}
        />
      </View>

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

      {/* Native Bottom Sheet - positioned absolutely to test if view exists */}
      <NativeBottomSheetView
        testProp="HELLO_TEST"
        isVisible={isBottomSheetVisible}
        title={sheetTitle}
        content={sheetContent}
        onDismiss={(evt) => {
          console.log("Bottom sheet dismissed:", evt.nativeEvent);
          setIsBottomSheetVisible(false);
        }}
        style={{
          position: 'absolute',
          top: 100,
          left: 20,
          width: 200,
          height: 50,
          backgroundColor: 'red', // Make it visible to test if the view exists
        }}
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
  bottomSheet: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap: 10,
  },
});
