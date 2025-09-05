import { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: screenHeight } = Dimensions.get("window");

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

  const renderStickyBottom = () => (
    <Animated.View style={[styles.stickyBottom, textInputStyle]}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search items..."
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
      />
    </Animated.View>
  );

  return (
    <FlatList
      style={styles.flatListStyle}
      contentContainerStyle={{
        gap: 20,
        paddingBottom: insets.bottom + 200,
      }}
      data={filteredData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      )}
      nestedScrollEnabled
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  flatListStyle: {
    // flex: 1,
    backgroundColor: "red",
  },
  stickyBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "green",
    padding: 20,
    paddingBottom: 40, // Extra padding for safe area
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  itemTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemDescription: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
