import CalculatorModule from "@/modules/calculator";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ paddingTop: 48 }}>
      <Text>Home Screen</Text>
      <Button
        title="Open Calculator"
        onPress={() => {
          const res = CalculatorModule.hello();
          console.log(res);
          console.log(CalculatorModule.PI);
        }}
      />
    </View>
  );
}
