import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";

interface Props {
  id: string;
  image: string;
  title: string;
  price: number;
  brand: string;
}

const ProductCard = ({ id, image, title, price, brand }: Props) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/product/[id]",
          params: {
            id,
          },
        })
      }
    >
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.name}>
          {title}
        </Text>

        <Text style={styles.brand}>{brand}</Text>

        <Text style={styles.price}>Rp {price.toLocaleString("id-ID")}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  image: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },

  content: {
    padding: 12,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 20,
  },

  brand: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  price: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#22C55E",
  },
});
