import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert, Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";

import { COLORS } from "@/theme";
import { useFavorite } from "@/modules/favorite/hooks/use-favorite";
import { useToastStore } from "@/store/toast.store";

interface FavoriteButtonProps {
  id: string;
  title: string;
  image: string;
  price: number;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export default function FavoriteButton({
  id,
  title,
  image,
  price,
  size = 22,
  color,
  style,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorite(id);
  const showToast = useToastStore((state) => state.showToast);

  const handlePress = (e: any) => {
    e.stopPropagation();

    if (isFavorite) {
      Alert.alert(
        "Hapus dari Favorit?",
        `Apakah Anda yakin ingin menghapus "${title}" dari daftar favorit?`,
        [
          { text: "Batal", style: "cancel" },
          {
            text: "Hapus",
            style: "destructive",
            onPress: () => {
              toggleFavorite({ id, title, image, price });
              showToast("Produk dihapus dari favorit", "success");
            },
          },
        ]
      );
    } else {
      toggleFavorite({ id, title, image, price });
      showToast("Produk ditambahkan ke favorit", "success");
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.pressed,
      ]}
      onPress={handlePress}
    >
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={size}
        color={color || (isFavorite ? COLORS.danger : COLORS.textSecondary)}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});
