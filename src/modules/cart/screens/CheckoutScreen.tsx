import React from "react";
import { ScrollView, StyleSheet, Text, View, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "@/theme";
import { checkoutSchema, CheckoutFormValues } from "@/schemas/checkout.schema";
import FormField from "@/components/inputs/FormField";
import { useCartStore } from "@/store/cart.store";
import { useCheckout } from "@/modules/checkout/hooks/useCheckout";

export default function CheckoutScreen() {
  const { colors, spacing, radius, typography } = useTheme();
  const items = useCartStore((s) => s.items);
  const selectedIds = useCartStore((s) => s.selectedIds);
  
  const selectedItems = items.filter((i) => selectedIds.includes(i.id));
  const subtotal = selectedItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const checkout = useCheckout();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      paymentMethod: undefined,
    },
  });

  const selectedPaymentMethod = useWatch({ control, name: "paymentMethod" });

  const onSubmit = async () => {
    try {
      if (!selectedPaymentMethod) return;
      await checkout.mutateAsync({
        items: selectedItems,
        paymentMethod: selectedPaymentMethod,
      });
      router.replace("/");
    } catch {
      // Error handling is done inside useCheckout (Alert + toast)
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={[styles.backButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary, fontSize: typography.h2 }]}>
          Checkout
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.md }} showsVerticalScrollIndicator={false}>
        {/* Order Summary Card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontSize: typography.h3, marginBottom: spacing.sm }]}>
            Ringkasan Order
          </Text>
          {selectedItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={{ color: colors.textPrimary, flex: 1 }} numberOfLines={1}>
                {item.title} x {item.quantity}
              </Text>
              <Text style={{ color: colors.textPrimary, fontWeight: "600" }}>
                Rp {(item.price * item.quantity).toLocaleString("id-ID")}
              </Text>
            </View>
          ))}
          <View style={[styles.divider, { backgroundColor: colors.border, marginVertical: spacing.sm }]} />
          <View style={styles.totalRow}>
            <Text style={{ color: colors.textPrimary, fontWeight: "700" }}>Total Bayar</Text>
            <Text style={{ color: colors.primary, fontWeight: "700", fontSize: typography.body }}>
              Rp {subtotal.toLocaleString("id-ID")}
            </Text>
          </View>
        </View>

        {/* Shipping Form */}
        <View style={[styles.card, { backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontSize: typography.h3, marginBottom: spacing.sm }]}>
            Informasi Pengiriman
          </Text>

          <FormField
            control={control}
            name="name"
            label="Nama Lengkap Penerima"
            placeholder="Masukkan nama penerima"
          />

          <FormField
            control={control}
            name="phone"
            label="Nomor Telepon"
            placeholder="Contoh: 08123456789"
            keyboardType="phone-pad"
          />

          <FormField
            control={control}
            name="address"
            label="Alamat Lengkap"
            placeholder="Nama jalan, RT/RW, nomor rumah, kelurahan, kecamatan"
            multiline
            numberOfLines={3}
            style={{ minHeight: 80 }}
          />

          {/* Payment Method Selector */}
          <Text style={[{ color: colors.textSecondary, marginBottom: spacing.xs, fontSize: typography.bodySmall - 1, fontWeight: "600" }]}>
            Metode Pembayaran
          </Text>
          <View style={styles.paymentContainer}>
            {[
              { id: "CASH", label: "COD (Cash)", icon: "cash-outline" },
              { id: "TRANSFER", label: "Transfer Bank", icon: "card-outline" },
              { id: "E_WALLET", label: "E-Wallet / Qris", icon: "qr-code-outline" },
            ].map((method) => {
              const isActive = selectedPaymentMethod === method.id;
              return (
                <Pressable
                  key={method.id}
                  style={[
                    styles.paymentOption,
                    {
                      borderColor: isActive ? colors.primary : colors.border,
                      backgroundColor: isActive ? colors.primary + "10" : colors.card,
                      borderRadius: radius.md,
                      padding: spacing.sm,
                    },
                  ]}
                  onPress={() => setValue("paymentMethod", method.id as any, { shouldValidate: true })}
                >
                  <Ionicons name={method.icon as any} size={20} color={isActive ? colors.primary : colors.textSecondary} />
                  <Text style={{ color: isActive ? colors.primary : colors.textPrimary, fontSize: 12, fontWeight: "600", marginTop: 4 }}>
                    {method.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {errors.paymentMethod && (
            <Text style={{ color: colors.danger, marginTop: spacing.xs, fontSize: typography.caption, fontWeight: "500" }}>
              {errors.paymentMethod.message}
            </Text>
          )}

          <View style={{ marginTop: spacing.lg }}>
            <Pressable
              style={[
                styles.submitButton,
                { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: spacing.md },
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={checkout.isPending}
            >
              {checkout.isPending ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Text style={[styles.submitText, { color: colors.white, fontSize: typography.body }]}>
                  Konfirmasi Pembayaran
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginRight: 12,
  },
  headerTitle: {
    fontWeight: "700",
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontWeight: "700",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  divider: {
    height: 1,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  paymentOption: {
    flex: 1,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 65,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontWeight: "700",
  },
});
