/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
export const defaultColors = {
  primary: "#FF3767",
  background: "#FFFFFF",
  card: "#FFFFFF",
  text: "#11181C",
  border: "#e7e7e7",
  notification: "#e6e6e6",
  tint: tintColorLight,
  icon: "#687076",
  tabIconDefault: "#687076",
  tabIconSelected: "#FF3767",
  red: "#FF5757",
  white: "#FFFFFF",
  black: "#000000",
  half: "#ffffff60",
  success: "#57FF72",
  themeGradient: ["#000000", "#00000080", "#00000000"],
  themeGradientReverse: ["#00000000", "#00000080", "#000000"],
  secondaryText: "#818181",
  contrast: "#000000",
  blue: "#3674EC",
};
export const Colors = {
  light: {
    ...defaultColors,
  },
  dark: {
    ...defaultColors,
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    half: "#00000060",
    contrast: "#FFFFFF",
  },
};
