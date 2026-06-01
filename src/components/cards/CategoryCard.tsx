import { Link } from "expo-router";

import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  id: string;
  name: string;
  icon: string;
}

export default function CategoryGridCard({ id, name, icon }: Props) {
  return (
    <Link
      href={{
        pathname: "/products/category/[id]",
        params: {
          id,
          name,
        },
      }}
      asChild
    >
      <Pressable style={styles.container}>
        <View style={styles.iconContainer}>
          <Image source={{ uri: icon }} style={styles.icon} />
        </View>

        <Text style={styles.name}>{name}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FFFFFF",

    marginHorizontal: 6,

    marginBottom: 14,

    borderRadius: 24,

    paddingVertical: 24,

    alignItems: "center",

    elevation: 3,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 4,
  },

  iconContainer: {
    width: 80,

    height: 80,

    borderRadius: 40,

    backgroundColor: "#F3F4F6",

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 14,
  },

  icon: {
    width: 42,

    height: 42,

    resizeMode: "contain",
  },

  name: {
    fontSize: 15,

    fontWeight: "600",

    color: "#111827",

    textAlign: "center",
  },
});
