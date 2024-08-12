import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { CardItem } from "./CardIatem";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { useAppStore } from "@/store/appStore";
import BottomBtnBlock from "./BottomBtnBlock";
import { scaledSize, scaledY } from "@/utils/scaleSize";
import { cardWidth } from "@/constants";
import { useAnimation } from "@/hooks/useAnimation";

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
  const styles = useMemo(() => createStyles(), []);
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

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: scaledY(20),
      zIndex: 1000,
    },

    left: {
      width: scaledSize(25),
      height: scaledSize(5),
      borderRadius: 3,
      transform: [
        { rotate: "45deg" },
        { translateY: scaledSize(2.6) },
        { translateX: 2.6 },
      ],
    },
    right: {
      width: scaledSize(25),
      height: scaledSize(5),
      borderRadius: 3,
      transform: [
        { rotate: "-45deg" },
        { translateY: scaledSize(-1) },
        { translateX: 1 },
      ],
    },
    buy50: {
      position: "absolute",
      height: scaledY(850),
      width: scaledSize(375),
      zIndex: 100000,
      bottom: scaledY(-130),
    },
    card: {
      bottom: 0,
      alignSelf: "center",
      position: "absolute",
      width: cardWidth,
      height: scaledSize(461),
      backgroundColor: "#ffffff",
      borderRadius: 20,
      overflow: "hidden",
      zIndex: 15,
    },
    skip: {
      width: scaledSize(336),
      height: scaledSize(461),
      position: "absolute",
      right: 0,
      top: 0,
    },
    like: {
      width: scaledSize(544),
      height: scaledSize(544),
      position: "absolute",
      right: 0,
      top: 0,
    },
    circle: {
      justifyContent: "center",
      alignItems: "center",
      width: scaledSize(60),
      height: scaledSize(60),
      borderRadius: scaledSize(50),
    },
    circleStar: {
      width: scaledSize(48),
      height: scaledSize(48),
    },
    circlePosition: {
      position: "absolute",
      borderRadius: 50,
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

    text: {
      fontSize: scaledSize(30),
      lineHeight: scaledSize(50),
    },

    dot: {
      width: 40,
      height: 4,
      borderRadius: 5,
      marginHorizontal: 0,
      backgroundColor: "rgba(255, 255, 255, 0.92)",
    },
  });
