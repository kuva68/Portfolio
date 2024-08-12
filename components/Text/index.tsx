import React, { useMemo } from "react";
import { Text as ReactNativeText } from "react-native";
import { darkStyle } from "./text.presets";
import { ITextProps } from "./text.props";
import { useThemeColor } from "@/hooks/useThemeColor";

export const Text: React.FC<ITextProps> = ({ style, preset, ...rest }) => {
  const theme = useThemeColor();
  const styles = useMemo(
    () => [darkStyle(theme)[preset || "default"], style],
    [theme, preset, style]
  );

  return <ReactNativeText {...rest} style={styles} allowFontScaling={false} />;
};
export default Text;
