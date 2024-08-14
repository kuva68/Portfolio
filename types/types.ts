import { defaultColors } from "@/constants/Colors";
export interface ISizes {
  SCREEN_WIDTH: number;
  SCREEN_HEIGHT: number;
  cardWidth: number;
  cardHeight: number;
  CARD_LENGTH: number;
}
export interface ExtendedTheme {
  dark: boolean;
  colors: Record<keyof typeof defaultColors, any>;
  sizes: ISizes;
}
