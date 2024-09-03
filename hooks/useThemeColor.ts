/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from "react-native";

import { Colors } from "@/constants/Colors";
import {
  CARD_LENGTH,
  cardHeight,
  cardWidth,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "@/constants";

export function useThemeColor() {
  const theme = useColorScheme() ?? "light";

  return {
    colors: theme === "dark" ? Colors.dark : Colors.light,
    dark: theme === "dark",
    sizes: {
      SCREEN_WIDTH,
      SCREEN_HEIGHT,
      cardWidth,
      cardHeight,
      CARD_LENGTH,
    },
  };
}