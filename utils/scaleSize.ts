import { Platform, Dimensions } from "react-native";
export const isAndroid = Platform.OS === "android";

export const isIOS = Platform.OS === "ios";

const { width, height } = Dimensions.get("screen");
const shortDimension = width < height ? width : height;
const longDimensions = width > height ? width : height;
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scaledSize = (size: number) =>
  Platform.OS === "web" ? size : (shortDimension / guidelineBaseWidth) * size;
export const scaledY = (size: number) =>
  Platform.OS === "web" ? size : (longDimensions / guidelineBaseHeight) * size;
