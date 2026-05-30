import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import CategoryCard from "@/components/cards/CategoryCard";
import ProductCard from "@/components/cards/ProductCard";
import SearchBar from "@/components/inputs/SearchBar";

import { useCategories } from "../hooks/use-categories";
import { useProducts } from "../hooks/use-products";

import { COLORS, SPACING, TYPOGRAPHY } from "@/theme";

export default function HomeScreen() {
  const { data: products, isLoading, isError } = useProducts();

  const { data: categories } = useCategories();

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

      <SearchBar />

      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>Categories</Text>

        <FlatList
          horizontal
          data={categories || []}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryCard name={item.name} icon={item.icon} />
          )}
          contentContainerStyle={{
            paddingTop: SPACING.md,
          }}
        />
      </View>

      <View style={styles.productSection}>
        <Text style={styles.sectionTitle}>Popular Products</Text>

        <FlatList
          data={products || []}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: SPACING.md,
            paddingBottom: 120,
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
