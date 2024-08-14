import { Platform, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { Text } from "../Text";
import { EnSkillsIkon } from "../../constants";
import { Images } from "../../constants/images";
import { scaledY } from "../../utils/scaleSize";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ExtendedTheme } from "@/types/types";

type Props = {
  item: { title: string; text: string[]; icon: EnSkillsIkon };
  index: number;
  scrollX: SharedValue<number>;
};

export const CarouselItem = (props: Props) => {
  const { item, index, scrollX } = props;
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { cardWidth, SCREEN_HEIGHT, SCREEN_WIDTH } = theme.sizes;
  const inputRange = [
    (index - 1) * cardWidth,
    index * cardWidth,
    (index + 1) * cardWidth,
  ];

  const opacityInputRange = [
    (index - 1) * cardWidth,
    index * cardWidth,
    (index + 1) * cardWidth,
  ];

  const translateXOutputRange =
    Platform.OS === "web" && SCREEN_HEIGHT < SCREEN_WIDTH
      ? [-cardWidth * 0.1, 0, cardWidth * 0.1]
      : [-cardWidth * 0.15, 0, cardWidth * 0.15];

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scaleY: interpolate(
            scrollX.value,
            inputRange,
            [0.8, 1, 0.8],
            "clamp"
          ),
        },
        {
          translateX: interpolate(
            scrollX.value,
            inputRange,
            translateXOutputRange
          ),
        },
      ],
      opacity: interpolate(
        scrollX.value,
        opacityInputRange,
        [0.5, 1, 0.5],
        "clamp"
      ),
    };
  });
  const skillIcon = useMemo(() => {
    switch (item.icon) {
      case EnSkillsIkon.Code:
        return (
          <Images.Code width={48} height={48} fill={theme.colors.primary} />
        );
      case EnSkillsIkon.Firebase:
        return (
          <Images.Firebase width={48} height={48} fill={theme.colors.primary} />
        );
      case EnSkillsIkon.WEB3:
        return (
          <Images.WEB3 width={48} height={48} fill={theme.colors.primary} />
        );
      default:
        return (
          <Images.Delivery width={48} height={48} fill={theme.colors.primary} />
        );
    }
  }, [item.icon, theme.colors.primary]);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-48, 0, 48],
            [-48 / 2, 0, 48 * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-48, 0, 48], [0.7, 1, 0.7]),
        },
      ],
      opacity: interpolate(scrollOffset.value, [-48, 0, 48], [0.5, 1, 0.5]),
    };
  });

  return (
    <Animated.View style={[styles.container, cardStyle]}>
      <View style={styles.card}>
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardInnerContainer}
        >
          <Animated.View style={[headerAnimatedStyle, styles.imageView]}>
            {skillIcon}
          </Animated.View>
          <View style={styles.titleContainer}>
            <Text preset="title" style={styles.title}>
              {item.title}
            </Text>
            <View style={styles.view}>
              {item.text.map((text, index) => (
                <Text key={index}>{text}</Text>
              ))}
            </View>
          </View>
        </Animated.ScrollView>
      </View>
    </Animated.View>
  );
};

const createStyles = (theme: ExtendedTheme) => {
  const { cardWidth, SCREEN_HEIGHT, CARD_LENGTH } = theme.sizes;
  return StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      width: cardWidth,
    },
    card: {
      borderRadius: 32,
      backgroundColor: theme.colors.background,
      width: CARD_LENGTH,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      height: Platform.OS !== "web" ? scaledY(600) : SCREEN_HEIGHT * 0.7,
      paddingBottom: scaledY(24),
      paddingTop: 10,
    },
    view: { width: "100%", gap: scaledY(20) },
    cardInnerContainer: {
      width: "100%",
      paddingVertical: 24,
      paddingHorizontal: 16,
    },
    imageView: { width: "100%", alignItems: "center" },
    titleContainer: { alignItems: "center", gap: scaledY(20) },
    icon: {
      height: 32,
      width: 32,
      borderRadius: 16,
    },
    title: {
      color: theme.colors.text,
      textAlign: "center",
    },
    type: {
      marginTop: 16,
      paddingHorizontal: 14,
      paddingVertical: 4,
      borderRadius: 9,
      textTransform: "lowercase",
    },
    description: {
      marginTop: 24,
      textAlign: "left",
      color: "#868E9A",
      fontSize: 14,
      lineHeight: 18,
      letterSpacing: -0.4,
    },
    pointsContainer: {
      marginTop: 24,
      borderRadius: 24,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 32,
    },
    pointsImageContainer: {
      height: 48,
      width: 48,
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: palette.white,
      borderRadius: 24,
    },
    pointsImage: {
      height: 48,
      width: 48,
    },
    pointsText: {
      marginTop: 12,
      fontSize: 28,
      lineHeight: 32,
      letterSpacing: -0.4,
    },
    button: {
      marginTop: 32,
      width: "80%",
    },
  });
};
