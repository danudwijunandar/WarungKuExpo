//
// ======================
// Imports & Dependencies
// ======================
//
import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm, useWatch } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FormField } from "@/components/inputs/FormField";
import { useCategories } from "@/modules/categories/hooks/useCategories";
import { productSchema } from "@/schemas/product.schema";
import { useTheme } from "@/theme";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useImageUpload } from "../hooks/useImageUpload";
import { ImagePickerComponent } from "../components/ImagePickerComponent";
import { useToastStore } from "@/store/toast.store";

//
// ======================
// Add Product Screen (Main)
// ======================
//
export default function AddProductScreen() {
  //
  // ======================
  // Setup & Hooks
  // ======================
  //
  const { colors, spacing, radius, typography } = useTheme();
  const { mutate: createProduct, isPending } = useCreateProduct();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const showToast = useToastStore((state) => state.showToast);
  const {
    imageUri,
    imageName,
    isLoading: isUploadingImage,
    error: imageError,
    pickImage,
    uploadImage,
    clearImage,
    clearError,
  } = useImageUpload();

  //
  // ======================
  // Form State
  // ======================
  //
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      brand: "",
      categoryId: "",
      price: undefined,
      stock: undefined,
      expiredDate: "",
      image: "",
      description: "",
    },
  });

  const selectedCategoryId = useWatch({ control, name: "categoryId" });

  //
  // ======================
  // Handlers
  // ======================
  //
  const handlePickImage = async () => {
    clearError();
    const pickedImage = await pickImage();

    if (!pickedImage) return;

    // Upload image to ImgBB
    const uploadedUrl = await uploadImage(pickedImage);

    if (uploadedUrl) {
      setValue("image", uploadedUrl, { shouldValidate: true });
      showToast("Gambar berhasil diupload", "success");
    } else {
      showToast("Gagal upload gambar", "error");
    }
  };

  const onSubmit = (data: any) => {
    if (!data.image) {
      showToast("Silakan upload gambar produk terlebih dahulu", "error");
      return;
    }

    createProduct(data, {
      onSuccess: () => {
        clearImage();
        router.back();
      },
    });
  };

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
      <View style={styles.header}>
        <Pressable
          style={[
            styles.backButton,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text
          style={[
            styles.headerTitle,
            { color: colors.textPrimary, fontSize: typography.h2 },
          ]}
        >
          Tambah Produk Baru
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderRadius: radius.md,
              padding: spacing.md,
            },
          ]}
        >
          {/* Form Fields */}
          <FormField
            control={control}
            name="name"
            label="Nama Produk"
            placeholder="Masukkan nama produk"
          />
          <FormField
            control={control}
            name="brand"
            label="Merek / Brand"
            placeholder="Masukkan nama brand"
          />

          {/* Category Selector */}
          <Text
            style={[
              {
                color: colors.textSecondary,
                marginBottom: spacing.xs,
                fontSize: typography.bodySmall - 1,
                fontWeight: "600",
              },
            ]}
          >
            Kategori
          </Text>
          {isLoadingCategories ? (
            <ActivityIndicator
              size="small"
              color={colors.primary}
              style={{ alignSelf: "flex-start", marginVertical: spacing.xs }}
            />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryContainer}
            >
              {categories?.map((cat) => {
                const isSelected = selectedCategoryId === cat.id;
                return (
                  <Pressable
                    key={cat.id}
                    style={[
                      styles.categoryOption,
                      {
                        borderColor: isSelected
                          ? colors.primary
                          : colors.border,
                        backgroundColor: isSelected
                          ? colors.primary + "15"
                          : colors.background,
                        borderRadius: radius.sm,
                        paddingVertical: spacing.xs,
                        paddingHorizontal: spacing.sm,
                      },
                    ]}
                    onPress={() =>
                      setValue("categoryId", cat.id, { shouldValidate: true })
                    }
                  >
                    <Text
                      style={{
                        color: isSelected ? colors.primary : colors.textPrimary,
                        fontSize: 13,
                        fontWeight: "600",
                      }}
                    >
                      {cat.name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          )}
          {errors.categoryId && (
            <Text
              style={{
                color: colors.danger,
                marginTop: spacing.xs,
                fontSize: typography.caption,
                fontWeight: "500",
                marginBottom: 12,
              }}
            >
              {errors.categoryId.message as string}
            </Text>
          )}

          {/* Detail Fields */}
          <FormField
            control={control}
            name="price"
            label="Harga (Rp)"
            placeholder="Contoh: 15000"
            keyboardType="numeric"
          />
          <FormField
            control={control}
            name="stock"
            label="Jumlah Stok"
            placeholder="Contoh: 50"
            keyboardType="numeric"
          />
          <FormField
            control={control}
            name="expiredDate"
            label="Tanggal Kedaluwarsa (YYYY-MM-DD)"
            placeholder="Contoh: 2027-12-31"
          />

          {/* Image Picker */}
          <ImagePickerComponent
            imageUri={imageUri}
            imageName={imageName}
            isLoading={isUploadingImage}
            error={imageError}
            onPickImage={handlePickImage}
            onClearImage={clearImage}
          />
          {errors.image && (
            <Text
              style={{
                color: colors.danger,
                marginBottom: spacing.sm,
                fontSize: typography.caption,
                fontWeight: "500",
              }}
            >
              {errors.image.message as string}
            </Text>
          )}

          {/* Detail Fields */}
          <FormField
            control={control}
            name="description"
            label="Deskripsi Produk"
            placeholder="Deskripsikan detail produk ini..."
            multiline
            numberOfLines={4}
            style={{ minHeight: 90 }}
          />

          {/* Submit Button */}
          <View style={{ marginTop: spacing.lg }}>
            <Pressable
              style={[
                styles.submitButton,
                {
                  backgroundColor: isPending || isUploadingImage ? colors.border : colors.primary,
                  borderRadius: radius.md,
                  paddingVertical: spacing.md,
                },
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={isPending || isUploadingImage}
            >
              {isPending || isUploadingImage ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Text
                  style={[
                    styles.submitText,
                    { color: colors.white, fontSize: typography.body },
                  ]}
                >
                  Simpan Produk
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
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
  
  // -- Card --
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  
  // -- Category Option --
  categoryContainer: {
    gap: 8,
    paddingBottom: 12,
  },
  categoryOption: {
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  
  // -- Submit --
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontWeight: "700",
  },
});
