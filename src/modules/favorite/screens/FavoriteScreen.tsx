import React, { useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFavorite } from "../hooks/use-favorite";
// eslint-disable-next-line import/no-named-as-default
import FavoriteProductCard from "../components/FavoriteProductCard";
import { useTheme } from "@/theme";
import { useToastStore } from "@/store/toast.store";

export default function FavoriteScreen() {
  const { favorites, clearFavorites } = useFavorite();
  const { colors, spacing, radius, typography, shadows } = useTheme();
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);

  const handleExplore = useCallback(() => {
    router.replace("/");
  }, [router]);

  const handleClearAll = useCallback(() => {
    Alert.alert(
      "Hapus Semua Favorit?",
      "Apakah Anda yakin ingin menghapus semua produk dari daftar favorit Anda?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus Semua",
          style: "destructive",
          onPress: () => {
            clearFavorites();
            showToast("Semua produk favorit berhasil dihapus", "success");
          },
        },
      ]
    );
  }, [clearFavorites, showToast]);

  const renderFavoriteItem = useCallback(({ item }: { item: any }) => (
    <FavoriteProductCard
      id={item.id}
      title={item.title}
      image={item.image}
      price={item.price}
    />
  ), []);

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconContainer, { backgroundColor: colors.card, ...shadows.sm }]}>
        <Ionicons name="heart-dislike-outline" size={64} color={colors.textSecondary} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.textPrimary, fontSize: typography.h3, marginBottom: spacing.xs }]}>
        Daftar Favorit Kosong
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary, marginBottom: spacing.xl }]}>
        Belum ada barang favoritmu. Yuk, cari produk menarik di WarungKu!
      </Text>
      <Pressable style={[styles.exploreButton, { backgroundColor: colors.primary, borderRadius: radius.md }]} onPress={handleExplore}>
        <Text style={[styles.exploreButtonText, { color: colors.white }]}>Mulai Belanja</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={[styles.header, { paddingHorizontal: spacing.md, paddingTop: spacing.xs, paddingBottom: spacing.md }]}>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.title, { color: colors.textPrimary, fontSize: typography.h1 }]}>Favorit</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Barang-barang kesukaanmu</Text>
        </View>
        {favorites.length > 0 && (
          <Pressable style={[styles.clearButton, { borderColor: colors.danger, borderRadius: radius.sm }]} onPress={handleClearAll}>
            <Text style={[styles.clearButtonText, { color: colors.danger }]}>Hapus Semua</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[styles.listContainer, { paddingHorizontal: spacing.md, paddingBottom: 100 }]}
        ListEmptyComponent={renderEmptyState}
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        renderItem={renderFavoriteItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitleContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
  },
  clearButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },
  listContainer: {},
  row: {
    justifyContent: "space-between",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontWeight: "700",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  exploreButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 2,
  },
  exploreButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
