import React, { useMemo } from "react";
import { ColorValue, StyleSheet } from "react-native";
import { Text } from "./Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ExtendedTheme } from "@/types/types";

const Title = ({ title, color }: { title: string; color?: ColorValue }) => {
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <Text style={[styles.title, !!color && { color }]} preset="title">
      {title}
    </Text>
  );
};
export default Title;
const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    title: { color: "white", alignSelf: "center" },
  });
