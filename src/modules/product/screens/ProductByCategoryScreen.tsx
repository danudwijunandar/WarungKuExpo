import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams } from "expo-router";

import ProductCard from "@/components/cards/ProductCard";

import { useProductsByCategory } from "../hooks/use-product-by-category";

const ProductsByCategoryScreen = () => {
  const { id, name } = useLocalSearchParams();

  const { data, isLoading, refetch, isRefetching } = useProductsByCategory(
    id as string,
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>

        <Text style={styles.subtitle}>Produk tersedia</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            title={item.name}
            image={item.image}
            price={item.price}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Product not found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ProductsByCategoryScreen;

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
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },

  contentContainer: {
    paddingHorizontal: 12,
    paddingBottom: 120,
  },

  row: {
    justifyContent: "space-between",
    gap: 2,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
