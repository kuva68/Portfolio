import React, { useMemo } from "react";
import {
  ImageBackground,
  ImageResolvedAssetSource,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import SkillView from "./Skill";
import { useThemeColor } from "@/hooks/useThemeColor";
import { cardHeight, cardWidth } from "@/constants";
import { scaledSize, scaledY } from "@/utils/scaleSize";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "@/components/Text";
import { ExtendedTheme } from "@/types/types";

const MainCardItemView = ({
  image,
  title,
  activeIndex,
  index,
  skills = [],
  nextIndex,
}: {
  image: ImageResolvedAssetSource;
  title: string;
  activeIndex: SharedValue<number>;
  index: number;
  skills: string[];
  nextIndex: SharedValue<number | null>;
}) => {
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const top = useAnimatedStyle(() => {
    return {
      opacity:
        activeIndex.value === index
          ? withTiming(1, { duration: 300 })
          : withTiming(0.6, { duration: 300 }),
    };
  });
  const card = useAnimatedStyle(() => {
    return {
      backgroundColor:
        activeIndex.value === index || nextIndex?.value === index
          ? withTiming(theme.colors.contrast, { duration: 300 })
          : withTiming(theme.colors.secondaryText, { duration: 300 }),
    };
  });
  return (
    <Animated.View
      exiting={FadeOut.duration(200)}
      entering={FadeIn.duration(200)}
      style={[styles.card, card]}
    >
      <ImageBackground resizeMode="cover" source={image} style={[styles.main]}>
        <Animated.View style={[styles.top, top]}>
          <LinearGradient
            colors={theme.colors.themeGradient}
            locations={[0, 0.5, 1]}
            style={[
              {
                width: cardWidth,
                height: scaledSize(40),
              },
            ]}
          />
        </Animated.View>
        <Animated.View style={top}>
          <LinearGradient
            colors={theme.colors.themeGradientReverse}
            locations={[0, 0.4, 1]}
            style={[styles.bottomGradient]}
          >
            <Text style={styles.title} preset="title">
              {title}
            </Text>
          </LinearGradient>
        </Animated.View>
      </ImageBackground>
      <View style={styles.view}>
        {skills.map((el, i) => (
          <SkillView skill={el} key={el + i} />
        ))}
      </View>
    </Animated.View>
  );
};
export default MainCardItemView;
const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    card: {
      width: cardWidth,
      height: cardHeight,
      alignItems: "center",
    },
    title: { color: theme.colors.primary },
    main: {
      width: cardWidth,
      height: cardHeight * 0.7,
      marginTop: scaledY(20),
      zIndex: 30,
      justifyContent: "space-between",
    },
    view: {
      width: "100%",
      paddingHorizontal: scaledSize(20),
      paddingBottom: scaledY(20),
      flexDirection: "row",
      flexWrap: "wrap",
      gap: scaledSize(10),
      alignItems: "center",
    },
    gradient: { flex: 1, height: "100%" },
    transform: {
      transform: [{ rotate: "180deg" }],
      fontSize: scaledSize(30),
      lineHeight: scaledSize(50),
    },
    text: {
      fontSize: 30,
      color: theme.colors.text,
      zIndex: 1000,
      lineHeight: 40,
    },
    bottomGradient: {
      width: cardWidth,
      height: scaledSize(60),
      zIndex: 2000,
      paddingTop: scaledSize(20),
      paddingHorizontal: scaledSize(20),
    },
    bottom: {
      position: "absolute",
      bottom: 20,
      alignSelf: "center",
      flexDirection: "row",
      width: scaledSize(335),
      left: 0,
      justifyContent: "space-evenly",
    },
    image: {
      width: scaledSize(305),
      height: scaledSize(246),

      borderRadius: 16,
    },
    top: {
      width: "100%",
      height: scaledSize(40),
      zIndex: 2000,
    },
  });
