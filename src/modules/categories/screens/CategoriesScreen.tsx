import { useCallback, useMemo, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CategoryGridCard from "@/components/cards/CategoryCard";
import SearchBar from "@/components/inputs/SearchBar";
import { SafeFlatListContainer } from "@/components/wrappers";
import { useTheme } from "@/theme";
import { useCategories } from "../hooks/useCategories";

const CategoriesScreen = () => {
  const { colors, spacing, typography } = useTheme();
  const [search, setSearch] = useState("");

  const { data, isLoading, refetch, isRefetching } = useCategories();

  const filteredCategories = useMemo(() => {
    if (!data) return [];

    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const renderCategoryItem = useCallback(
    ({ item }: { item: any }) => (
      <CategoryGridCard id={item.id} name={item.name} icon={item.icon} />
    ),
    [],
  );

  if (isLoading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <View
        style={[
          styles.header,
          { paddingHorizontal: spacing.md, marginBottom: spacing.md },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: colors.textPrimary, fontSize: typography.h1 },
          ]}
        >
          Categories
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: colors.textSecondary, marginBottom: spacing.md },
          ]}
        >
          Temukan kebutuhan warungmu
        </Text>

        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Cari kategori..."
        />
      </View>

      <SafeFlatListContainer
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingHorizontal: spacing.sm },
        ]}
        initialNumToRender={8}
        maxToRenderPerBatch={12}
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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: colors.textSecondary }}>
              Categories not found
            </Text>
          </View>
        }
        renderItem={renderCategoryItem}
      />
    </SafeAreaView>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
  },
  title: {
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
  },
  contentContainer: {},
  row: {
    justifyContent: "flex-start",
    gap: 8,
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
});
