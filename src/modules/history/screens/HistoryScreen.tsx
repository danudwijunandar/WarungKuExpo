//
// ======================
// Imports & Dependencies
// ======================
//
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { useHistoryStore } from "@/store/history.store";
import { useTheme } from "@/theme";
import HistoryEmptyState from "../components/HistoryEmptyState";
import HistoryItemCard from "../components/HistoryItemCard";

//
// ======================
// History Screen (Main)
// ======================
//
export default function HistoryScreen() {
  //
  // ======================
  // Setup & Hooks
  // ======================
  //
  const { colors, spacing, typography } = useTheme();
  const transactions = useHistoryStore((s) => s.transactions);
  
  //
  // ======================
  // State
  // ======================
  //
  const [refreshing, setRefreshing] = useState(false);

  //
  // ======================
  // Handlers
  // ======================
  //
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refetching from store
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handlePressItem = useCallback((id: string) => {
    router.push({ pathname: "/history/[id]", params: { id } });
  }, []);

  //
  // ======================
  // Render
  // ======================
  //
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingHorizontal: spacing.md,
            paddingTop: spacing.xs,
            paddingBottom: spacing.md,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: colors.textPrimary, fontSize: typography.h1 },
          ]}
        >
          Riwayat Belanja
        </Text>
      </View>

      {/* Transactions List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          { paddingHorizontal: spacing.md, paddingBottom: spacing.lg },
          transactions.length === 0 && styles.listEmpty,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={<HistoryEmptyState />}
        renderItem={({ item }) => (
          <HistoryItemCard
            transaction={item}
            onPress={() => handlePressItem(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

//
// ======================
// Styles
// ======================
//
const styles = StyleSheet.create({
  // -- Layout --
  container: {
    flex: 1,
  },
  
  // -- Header --
  header: {
    justifyContent: "center",
  },
  title: {
    fontWeight: "700",
  },
  
  // -- List --
  listContent: {
    flexGrow: 1,
  },
  listEmpty: {
    justifyContent: "center",
  },
});
