import React, { useMemo } from "react";
import { Platform, StyleSheet } from "react-native";
import { CardItem } from "./CardIatem";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { useAppStore } from "@/store/appStore";
import BottomBtnBlock from "./BottomBtnBlock";
import { scaledSize, scaledY } from "@/utils/scaleSize";
import { useAnimation } from "@/hooks/useAnimation";
import { ExtendedTheme } from "@/types/types";
import { useThemeColor } from "@/hooks/useThemeColor";

export const MyCardDeck = () => {
  const apps = useAppStore((state) => state.appsExamples);
  const {
    gesture,
    buyOpacity,
    buy50Opacity,
    skipOpacity,
    translateX,
    translateY,
    onBuy50Press,
    onBuyPress,
    skip,
    animatedIndex,
    activeIndex,
    rotate,
    initialY,
    isBtnPressed,
    nextIndex,
  } = useAnimation({
    maxIndex: apps.length - 1,
  });
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const containerStyle = useAnimatedStyle(() => {
    return {
      zIndex: animatedIndex.value !== null ? 2000 : 1,
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, containerStyle]}>
        {apps.map((item, index) => (
          <CardItem
            buyOpacity={buyOpacity}
            buy50Opacity={buy50Opacity}
            skipOpacity={skipOpacity}
            translateX={translateX}
            translateY={translateY}
            key={item.title}
            item={item}
            index={index}
            activeIndex={activeIndex}
            maxIndex={apps.length - 1}
            animatedIndex={animatedIndex}
            rotate={rotate}
            initialY={initialY}
            nextIndex={nextIndex}
          />
        ))}
        <BottomBtnBlock
          onBuy50Press={onBuy50Press}
          onBuyPress={onBuyPress}
          skip={skip}
          translateX={translateX}
          translateY={translateY}
          isBtnPressed={isBtnPressed}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom:
        Platform.OS === "web" &&
        theme.sizes.SCREEN_HEIGHT < theme.sizes.SCREEN_WIDTH
          ? scaledY(40)
          : Platform.OS === "web"
          ? scaledY(80)
          : scaledY(20),
      zIndex: 1000,
    },
    animCircle: {
      width: scaledSize(60),
      height: scaledSize(60),
      borderRadius: scaledSize(50),
      justifyContent: "center",
      alignItems: "center",
      elevation: 2,
      shadowColor: "#FFD059",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      position: "relative",
      zIndex: 10000,
    },
    circleStar: {
      width: scaledSize(48),
      height: scaledSize(48),
    },
  });
