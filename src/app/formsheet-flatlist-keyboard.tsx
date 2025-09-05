import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: screenHeight } = Dimensions.get("window");
const sheetHeight = screenHeight * 0.9;

export default function ModalScreen() {
  const insets = useSafeAreaInsets();
  const keyboard = useAnimatedKeyboard();
  const textInputStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }],
      paddingBottom: insets.bottom,
    };
  });
  const [searchText, setSearchText] = useState("");
  const [toggle, setToggle] = useState(false);

  // Sample data to filter
  const data = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}`,
  }));

  // Filter data based on search text
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase())
  );

  if (toggle) {
    return (
      <View style={{ height: sheetHeight, backgroundColor: "green" }}>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Type your message..."
        />
        <TouchableOpacity onPress={() => setToggle(false)}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <FlatList
        style={{ height: sheetHeight, backgroundColor: "green" }}
        contentContainerStyle={{
          gap: 20,
          paddingVertical: 20,
          paddingBottom: insets.bottom + 20,
        }}
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 20,
              backgroundColor: "white",
              marginHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, color: "#666" }}>
              {item.description}
            </Text>
          </View>
        )}
        nestedScrollEnabled
      />
      <TouchableOpacity
        style={{
          height: 48,
          width: 48,
          backgroundColor: "yellow",
          position: "absolute",
          bottom: 0,
          right: 20,
        }}
        onPress={() => setToggle(!toggle)}
      >
        <Text>Add</Text>
      </TouchableOpacity>
    </>
  );
}
