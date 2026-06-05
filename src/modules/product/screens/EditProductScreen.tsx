import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "@/theme";
import { productSchema, ProductFormValues } from "@/schemas/product.schema";
import FormField from "@/components/inputs/FormField";
import { useProductById } from "../hooks/useProductById";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { useCategories } from "@/modules/categories/hooks/useCategories";

export default function EditProductScreen() {
  const { id } = useLocalSearchParams();
  const { colors, spacing, radius, typography } = useTheme();
  
  const { data: product, isLoading: isLoadingProduct } = useProductById(id as string);
  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<any>({
    resolver: zodResolver(productSchema),
  });

  // Prepopulate form when product data is loaded
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        brand: product.brand,
        categoryId: product.categoryId,
        price: product.price,
        stock: product.stock,
        expiredDate: product.expiredDate,
        image: product.image,
        description: product.description,
      });
    }
  }, [product, reset]);

  const selectedCategoryId = useWatch({ control, name: "categoryId" });

  const onSubmit = (data: any) => {
    updateProduct({ id: id as string, ...data }, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  if (isLoadingProduct) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={styles.header}>
        <Pressable
          style={[styles.backButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary, fontSize: typography.h2 }]}>
          Edit Produk
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.md }} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md }]}>
          <FormField control={control} name="name" label="Nama Produk" placeholder="Masukkan nama produk" />
          <FormField control={control} name="brand" label="Merek / Brand" placeholder="Masukkan nama brand" />

          {/* Category Selector */}
          <Text style={[{ color: colors.textSecondary, marginBottom: spacing.xs, fontSize: typography.bodySmall - 1, fontWeight: "600" }]}>
            Kategori
          </Text>
          {isLoadingCategories ? (
            <ActivityIndicator size="small" color={colors.primary} style={{ alignSelf: "flex-start", marginVertical: spacing.xs }} />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
              {categories?.map((cat) => {
                const isSelected = selectedCategoryId === cat.id;
                return (
                  <Pressable
                    key={cat.id}
                    style={[
                      styles.categoryOption,
                      {
                        borderColor: isSelected ? colors.primary : colors.border,
                        backgroundColor: isSelected ? colors.primary + "15" : colors.background,
                        borderRadius: radius.sm,
                        paddingVertical: spacing.xs,
                        paddingHorizontal: spacing.sm,
                      },
                    ]}
                    onPress={() => setValue("categoryId", cat.id, { shouldValidate: true })}
                  >
                    <Text style={{ color: isSelected ? colors.primary : colors.textPrimary, fontSize: 13, fontWeight: "600" }}>
                      {cat.name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          )}
          {errors.categoryId && (
            <Text style={{ color: colors.danger, marginTop: spacing.xs, fontSize: typography.caption, fontWeight: "500", marginBottom: 12 }}>
              {errors.categoryId.message as string}
            </Text>
          )}

          <FormField control={control} name="price" label="Harga (Rp)" placeholder="Contoh: 15000" keyboardType="numeric" />
          <FormField control={control} name="stock" label="Jumlah Stok" placeholder="Contoh: 50" keyboardType="numeric" />
          <FormField control={control} name="expiredDate" label="Tanggal Kedaluwarsa (YYYY-MM-DD)" placeholder="Contoh: 2027-12-31" />
          <FormField control={control} name="image" label="URL Gambar Produk" placeholder="Masukkan URL gambar dari Unsplash/Web" autoCapitalize="none" />
          <FormField control={control} name="description" label="Deskripsi Produk" placeholder="Deskripsikan detail produk ini..." multiline numberOfLines={4} style={{ minHeight: 90 }} />

          <View style={{ marginTop: spacing.lg }}>
            <Pressable
              style={[styles.submitButton, { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: spacing.md }]}
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Text style={[styles.submitText, { color: colors.white, fontSize: typography.body }]}>
                  Simpan Perubahan
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
  categoryContainer: {
    gap: 8,
    paddingBottom: 12,
  },
  categoryOption: {
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontWeight: "700",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
