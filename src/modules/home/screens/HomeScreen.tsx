import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useMemo, useState } from "react";

import ProductCard from "@/components/cards/ProductCard";

import SearchBar from "@/components/inputs/SearchBar";

import { useProducts } from "../hooks/use-products";

import { COLORS, SPACING, TYPOGRAPHY } from "@/theme";

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  const { data: products, isLoading, isError } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.loading}>
        <Text>Terjadi Kesalahan</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello Ical</Text>

        <Text style={styles.title}>WarungKu</Text>
      </View>

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Cari barang..."
      />

      <View style={styles.productSection}>
        <Text style={styles.sectionTitle}>Popular Products</Text>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            paddingTop: SPACING.md,
            paddingBottom: 120,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          renderItem={({ item }) => (
            <ProductCard
              id={item.id}
              title={item.name}
              image={item.image}
              price={item.price}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.background,

    paddingHorizontal: SPACING.md,
  },

  loading: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: COLORS.background,
  },

  header: {
    marginTop: SPACING.md,
  },

  greeting: {
    fontSize: TYPOGRAPHY.body,

    color: COLORS.textSecondary,
  },

  title: {
    fontSize: TYPOGRAPHY.h1,

    fontWeight: "700",

    color: COLORS.text,

    marginTop: SPACING.xs,
  },

  categorySection: {
    marginTop: SPACING.xl,
  },

  productSection: {
    flex: 1,

    marginTop: SPACING.xl,
  },

  sectionTitle: {
    fontSize: TYPOGRAPHY.h3,

    fontWeight: "700",

    color: COLORS.text,
  },
});
