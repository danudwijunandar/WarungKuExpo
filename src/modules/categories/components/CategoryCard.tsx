import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";

interface Props {
  id: string;
  name: string;
  icon: string;
}

const CategoryCard = ({ id, name, icon }: Props) => {
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
            name,
          },
        })
      }
    >
      <View style={styles.iconContainer}>
        <Image source={{ uri: icon }} style={styles.icon} />
      </View>

      <Text numberOfLines={2} style={styles.name}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 12,
    marginBottom: 16,
    alignItems: "center",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 3,
  },

  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    lineHeight: 20,
  },
});
