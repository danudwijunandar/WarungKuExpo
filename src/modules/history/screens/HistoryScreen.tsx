import { useHistoryStore } from "@/store/history.store";
import { useTheme } from "@/theme";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HistoryEmptyState from "../components/HistoryEmptyState";
import HistoryItemCard from "../components/HistoryItemCard";

export default function HistoryScreen() {
  const { colors, spacing, typography } = useTheme();
  const transactions = useHistoryStore((s) => s.transactions);
  const [refreshing, setRefreshing] = useState(false);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "center",
  },
  title: {
    fontWeight: "700",
  },
  listContent: {
    flexGrow: 1,
  },
  listEmpty: {
    justifyContent: "center",
  },
});
