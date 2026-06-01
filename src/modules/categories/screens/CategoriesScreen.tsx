import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useMemo, useState } from "react";

import SearchBar from "@/components/inputs/SearchBar";

import CategoryGridCard from "@/components/cards/CategoryCard";

import { useCategories } from "../hooks/useCategories";

const CategoriesScreen = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading, refetch, isRefetching } = useCategories();

  const filteredCategories = useMemo(() => {
    if (!data) return [];

    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>

        <Text style={styles.subtitle}>Temukan kebutuhan warungmu</Text>

        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Cari kategori..."
        />
      </View>

      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Categories not found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <CategoryGridCard id={item.id} name={item.name} icon={item.icon} />
        )}
      />
    </SafeAreaView>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F9FAFB",
  },

  header: {
    paddingHorizontal: 20,

    paddingTop: 10,

    paddingBottom: 20,
  },

  title: {
    fontSize: 28,

    fontWeight: "700",

    color: "#111827",
  },

  subtitle: {
    marginTop: 6,

    fontSize: 14,

    color: "#6B7280",
  },

  contentContainer: {
    paddingHorizontal: 12,

    paddingBottom: 120,
  },

  row: {
    justifyContent: "space-between",
  },

  loadingContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#F9FAFB",
  },

  emptyContainer: {
    marginTop: 100,

    alignItems: "center",
  },

  emptyText: {
    fontSize: 14,

    color: "#9CA3AF",
  },
});
