import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CartIconButton from "@/components/buttons/CartIconButton";
// eslint-disable-next-line import/no-named-as-default
import ProductCard from "@/components/cards/ProductCard";
import SearchBar from "@/components/inputs/SearchBar";
import { useProducts } from "@/modules/product/hooks/useProducts";
import { useTheme } from "@/theme";

export default function HomeScreen() {
  const { colors, spacing, typography, shadows, isEditMode } = useTheme();
  const [search, setSearch] = useState("");

  const {
    data: products,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  const renderProductItem = useCallback(
    ({ item }: { item: any }) => (
      <ProductCard
        id={item.id}
        title={item.name}
        image={item.image}
        price={item.price}
        stock={item.stock}
      />
    ),
    [],
  );

  const handleAddProduct = useCallback(() => {
    router.push("/products/add");
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.loading, { backgroundColor: colors.background }]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView
        style={[styles.loading, { backgroundColor: colors.background }]}
      >
        <Text style={{ color: colors.textPrimary, marginBottom: spacing.md }}>
          Terjadi Kesalahan
        </Text>
        <Pressable
          style={{
            backgroundColor: colors.primary,
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.lg,
            borderRadius: 8,
          }}
          onPress={() => refetch()}
        >
          <Text style={{ color: colors.white, fontWeight: "600" }}>
            Coba Lagi
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { marginTop: spacing.md }]}>
        <View style={styles.headerLeft}>
          <Text
            style={[
              styles.greeting,
              { color: colors.textSecondary, fontSize: typography.body },
            ]}
          >
            Hello Ical
          </Text>
          <Text
            style={[
              styles.title,
              {
                color: colors.textPrimary,
                fontSize: typography.h1,
                marginTop: spacing.xs,
              },
            ]}
          >
            WarungKu
          </Text>
        </View>
        <CartIconButton size={26} />
      </View>

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Cari barang..."
      />

      <View style={[styles.productSection, { marginTop: spacing.xl }]}>
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textPrimary, fontSize: typography.h3 },
          ]}
        >
          Popular Products
        </Text>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            paddingTop: spacing.md,
            paddingBottom: 140,
          }}
          columnWrapperStyle={{
            justifyContent: "flex-start",
          }}
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          renderItem={renderProductItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Produk tidak ditemukan
              </Text>
            </View>
          }
        />
      </View>

      {/* Floating Action Button (FAB) for adding product in edit mode */}
      {isEditMode && (
        <Pressable
          style={[
            styles.fab,
            {
              backgroundColor: colors.primary,
              bottom: 90,
              right: spacing.md,
              ...shadows.lg,
            },
          ]}
          onPress={handleAddProduct}
        >
          <Ionicons name="add" size={28} color={colors.white} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {},
  title: {
    fontWeight: "700",
  },
  productSection: {
    flex: 1,
  },
  sectionTitle: {
    fontWeight: "700",
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});
