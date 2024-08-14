import { useThemeColor } from "@/hooks/useThemeColor";
import { ExtendedTheme } from "@/types/types";
import { scaledSize } from "@/utils/scaleSize";
import { Image } from "expo-image";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";

const ProfileImage = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  if (imageLoading) {
    <View style={styles.innerContainer}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>;
  }

  return (
    <View style={styles.emptyImage}>
      <Image
        source={{
          uri: "https://lh3.googleusercontent.com/a/ACg8ocI3JDLup_stgQk_TXv5LgeWjoJ6wEbp0Z3a9G3eZNBBDwXHoD_x=s96-c",
        }}
        onLoadEnd={() => setImageLoading(false)}
        style={styles.imageStyle}
      />
    </View>
  );
};

export default ProfileImage;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    innerContainer: {
      backgroundColor: theme.colors.background,
      width: "100%",
      height: "100%",
    },
    imageStyle: {
      width:
        Platform.OS === "web" &&
        theme.sizes.SCREEN_HEIGHT > theme.sizes.SCREEN_WIDTH
          ? theme.sizes.SCREEN_WIDTH * 0.32
          : Platform.OS === "web"
          ? 105
          : scaledSize(122),
      height:
        Platform.OS === "web" &&
        theme.sizes.SCREEN_HEIGHT > theme.sizes.SCREEN_WIDTH
          ? theme.sizes.SCREEN_WIDTH * 0.33
          : Platform.OS === "web"
          ? 105
          : scaledSize(122),
      zIndex: 8,
      borderRadius: 200,
    },
    emptyImage: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 170,
      overflow: "hidden",
    },
  });
