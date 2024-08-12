import { defaultColors } from "@/constants/Colors";

export interface ExtendedTheme {
  dark: boolean;
  colors: Record<keyof typeof defaultColors, any>;
}
