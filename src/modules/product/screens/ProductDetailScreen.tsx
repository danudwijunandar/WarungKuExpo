import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams } from "expo-router";

import { useProductDetail } from "../hooks/use-product-detail";

import { useCartStore } from "@/store/cart.store";

import AppButton from "@/components/buttons/AppButton";

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useProductDetail(id as string);

  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  if (!data) {
    return null;
  }

  const handleAddToCart = () => {
    addToCart({
      id: data.id,
      title: data.name,
      image: data.image,
      price: data.price,
    });

    Alert.alert("Success", "Product added to cart");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: data.image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.name}>{data.name}</Text>

          <Text style={styles.brand}>{data.brand}</Text>

          <Text style={styles.price}>
            Rp {data.price.toLocaleString("id-ID")}
          </Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Stock</Text>

            <Text style={styles.infoValue}>{data.stock}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Expired</Text>

            <Text style={styles.infoValue}>{data.expiredDate}</Text>
          </View>

          <Text style={styles.descriptionTitle}>Description</Text>

          <Text style={styles.description}>{data.description}</Text>

          <View style={styles.buttonContainer}>
            <AppButton title="Add To Cart" onPress={handleAddToCart} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 320,
    resizeMode: "cover",
  },

  content: {
    padding: 20,
  },

  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  brand: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
  },

  price: {
    marginTop: 14,
    fontSize: 28,
    fontWeight: "700",
    color: "#22C55E",
  },

  infoContainer: {
    flexDirection: "row",
    marginTop: 18,
  },

  infoLabel: {
    width: 80,
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  infoValue: {
    fontSize: 14,
    color: "#6B7280",
  },

  descriptionTitle: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  description: {
    fontSize: 14,
    lineHeight: 24,
    color: "#4B5563",
  },

  buttonContainer: {
    marginTop: 30,
  },
});
