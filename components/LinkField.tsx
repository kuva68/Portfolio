import React, { useMemo } from "react";
import { StyleSheet, TextStyle, TouchableOpacity, View } from "react-native";
import { Text } from "./Text";
import { Images } from "../constants/images";
import { shortAddress } from "../utils";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ExtendedTheme } from "@/types/types";

const LinkField = ({
  link,
  handleCopyClick,
  title,
  chars = 20,
  titleStyle = {},
  textStyle = {},
  stroke,
}: {
  link: string;
  handleCopyClick: (link: string) => void;
  title: string;
  chars?: number;
  textStyle?: TextStyle;
  titleStyle?: TextStyle;
  stroke?: string;
}) => {
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.main}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>

      <TouchableOpacity
        style={styles.row}
        onPress={() => handleCopyClick(link)}
      >
        <Text style={[styles.copiedText, textStyle]}>
          {shortAddress(link, chars)}
        </Text>
        <Images.CopyAddress
          width={16}
          height={16}
          stroke={stroke ? stroke : theme.colors.background}
        />
      </TouchableOpacity>
    </View>
  );
};
export default LinkField;
const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    copiedText: {
      color: theme.colors.half,
    },
    main: {
      width: "100%",
      // gap: scaledY(20),
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.colors.background,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
    },
  });
