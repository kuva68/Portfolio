import React, { useMemo } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scaledSize, scaledY } from "../utils/scaleSize";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ExtendedTheme } from "@/types/types";
import { MyCardDeck } from "@/components/HomeScreen/MyCardDeck";
import { PhoneTemplate } from "@/components/PhoneTemplate";
import Title from "@/components/Title";
import GradientLayout from "@/components/GradientLayout";

const MainScreen = () => {
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.kbContainer}>
      <GradientLayout>
        {Platform.OS === "web" &&
        theme.sizes.SCREEN_HEIGHT < theme.sizes.SCREEN_WIDTH ? (
          <PhoneTemplate>
            <View style={styles.image}>
              <Title color={theme.colors.primary} title="Developed Apps" />
              <MyCardDeck />
            </View>
          </PhoneTemplate>
        ) : (
          <View style={styles.carouselContainer}>
            <Title color={theme.colors.primary} title="Developed Apps" />
            <MyCardDeck />
          </View>
        )}
      </GradientLayout>
    </SafeAreaView>
  );
};

export default MainScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    kbContainer: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    image: {
      width: "100%",
      overflow: "hidden",
      gap: scaledY(20),
      height: "100%",
    },
    carouselContainer: {
      overflow: "hidden",
      marginTop: scaledY(54),
      gap: scaledY(20),
      height: "100%",
      width:
        Platform.OS !== "web"
          ? scaledSize(375)
          : theme.sizes.SCREEN_HEIGHT > theme.sizes.SCREEN_WIDTH
          ? theme.sizes.SCREEN_HEIGHT
          : 375,
    },
    text: {
      color: theme.colors.primary,
      alignSelf: Platform.OS === "web" ? "center" : "flex-start",
    },
    top: {
      height: scaledSize(80),
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      paddingHorizontal: scaledY(20),
      width: "100%",
    },
  });
