import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useMemo } from "react";
import { Text } from "../Text";
import { scaledSize } from "../../utils/scaleSize";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import { ExtendedTheme } from "@/types/types";
type AppButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  style?: any;
  children: any;
  textStyle?: any;
  gradient?: boolean;
  loaderColor?: string;
  [x: string]: any;
};
export const AppButton = ({
  loading,
  disabled,
  style,
  children,
  textStyle,
  gradient = false,
  loaderColor,
  ...props
}: AppButtonProps) => {
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={[styles.main, style, disabled && styles.disabledButton]}
    >
      {gradient && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={
            disabled
              ? ["#777777", "#999999", "#999999"]
              : Platform.OS === "ios"
              ? ["#97195D", "#FF3767", "#FFAD8A"]
              : ["#97195DEE", "#FF3767EE", "#FFAD8AEE"]
          }
          style={StyleSheet.absoluteFill}
        />
      )}

      {loading ? (
        <ActivityIndicator
          color={!loaderColor ? theme.colors.white : loaderColor}
          style={styles.indicator}
        />
      ) : (
        <Text style={[styles.text, textStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    main: {
      borderRadius: 30,
      height: scaledSize(56),
      width: scaledSize(264),
      backgroundColor: theme.colors.white,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
    },
    disabledButton: {
      backgroundColor: "#E6E6EE",
    },
    text: {
      fontSize: 18,
      color: theme.colors.text,
      zIndex: 1000,
    },
    indicator: {
      zIndex: 1000,
    },
  });
