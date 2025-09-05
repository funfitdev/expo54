import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function ModalScreen() {
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

  const renderStickyHeader = () => (
    <View style={styles.stickyHeader}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search items..."
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ gap: 20 }}
      data={filteredData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      )}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={renderStickyHeader}
      nestedScrollEnabled
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "green",
  },
  stickyHeader: {
    backgroundColor: "green",
    paddingBottom: 10,
    marginBottom: 10,
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
