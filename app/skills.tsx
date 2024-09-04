import React, { useMemo } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { isIOS } from "../utils";
import { scaledY } from "../utils/scaleSize";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ExtendedTheme } from "@/types/types";
import { PhoneTemplate } from "@/components/PhoneTemplate";
import SkillsCarousell from "@/components/SkillsScreens/SkillsCarousell";
import GradientLayout from "@/components/GradientLayout";
import Title from "@/components/Title";

export const SkillsScreen = () => {
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <GradientLayout>
      {Platform.OS === "web" &&
      theme.sizes.SCREEN_HEIGHT < theme.sizes.SCREEN_WIDTH ? (
        <PhoneTemplate>
          <View style={styles.image}>
            <Title title="Skills" />

            <SkillsCarousell />
          </View>
        </PhoneTemplate>
      ) : (
        <View style={styles.carouselContainer}>
          <Title title="Skills" />

          <SkillsCarousell />
        </View>
      )}
    </GradientLayout>
  );
};
export default SkillsScreen;
const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    main: { flex: 1, alignItems: "center" },
    title: { color: "white", alignSelf: "center" },
    carouselContainer: {
      overflow: "hidden",
      marginTop: scaledY(54),
      gap: scaledY(20),

      width: theme.sizes.cardWidth,
    },

    padding: { paddingHorizontal: 20, marginTop: isIOS ? 50 : 20 },

    image: {
      width: "100%",
      overflow: "hidden",
      gap: scaledY(20),
    },
  });