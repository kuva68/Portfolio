import React, { useLayoutEffect, useMemo, useState } from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AboutView from "./AboutView";
import MainCardItemView from "./MainCardIatemView";
import { appExample } from "@/store/appStore";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Images } from "@/constants/images";
import { ExtendedTheme } from "@/types/types";
import { scaledSize, scaledY } from "@/utils/scaleSize";
import { cardHeight, cardWidth } from "@/constants";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export const CardItem = ({
  item,
  index,
  buyOpacity,
  buy50Opacity,
  skipOpacity,
  translateX,
  translateY,
  activeIndex,
  maxIndex,
  animatedIndex,
  rotate,
  initialY,
  nextIndex,
}: {
  item: appExample;
  index: number;
  activeIndex: SharedValue<number>;
  buyOpacity: SharedValue<number>;
  buy50Opacity: SharedValue<number>;
  skipOpacity: SharedValue<number>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  rotate: SharedValue<number>;
  maxIndex: number;
  animatedIndex: SharedValue<number | null>;
  initialY: SharedValue<number>;
  nextIndex: SharedValue<number | null>;
}) => {
  const yValue = useSharedValue(0);
  const sValue = useSharedValue(1);
  const oValue = useSharedValue(0);
  const [cardIndex, setCardIndex] = useState(0);
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  useLayoutEffect(() => {
    setCardIndex(0);
  }, [activeIndex.value]);

  const cardStyle = useAnimatedStyle(() => {
    let diff = activeIndex.value - index;

    if (activeIndex.value === 0 && index !== 0) {
      diff = maxIndex + 1 - index;
    }
    if (activeIndex.value === 1 && index > 0) {
      diff === maxIndex + 2 - index;
    }

    const z = index === activeIndex.value ? 3 : diff === 1 ? 0 : -1;
    if (diff < 3 && diff >= 0) {
      sValue.value = withTiming(1 - diff * 0.07, { duration: 200 });
      yValue.value = withTiming(diff * -35, { duration: 200 });
      oValue.value = withTiming(1, { duration: 500 });
    } else {
      oValue.value = 0;
      sValue.value = 1;
      yValue.value = 0;
    }
    const isUpperHalf = initialY.value < windowHeight / 3;
    const rotation = isUpperHalf ? `${rotate.value}deg` : `${-rotate.value}deg`;
    return {
      display:
        activeIndex.value === index || (diff < 3 && diff > 0) ? "flex" : "none",
      zIndex: z,
      opacity:
        animatedIndex.value === index
          ? 1
          : nextIndex.value === index
          ? 1
          : oValue.value,
      transform: [
        {
          scale: animatedIndex.value === index ? 1 : sValue.value,
        },
        {
          translateX: animatedIndex.value === index ? translateX.value : 0,
        },
        {
          translateY:
            animatedIndex.value === index ? translateY.value : yValue.value,
        },
        {
          rotate: animatedIndex.value === index ? rotation : "0deg",
        },
      ],
    };
  });
  const leftPress = () => {
    if (cardIndex > 0) {
      setCardIndex((prev) => prev - 1);
    }
  };
  const rightPress = () => {
    if (cardIndex < 1) {
      setCardIndex((prev) => prev + 1);
    }
  };

  const skipStyle = useAnimatedStyle(() => {
    return {
      opacity: index === animatedIndex.value ? skipOpacity.value : 0,
      zIndex: index === animatedIndex.value ? 10 : -1,
    };
  });
  const buyStyle = useAnimatedStyle(() => {
    return {
      opacity: index === animatedIndex.value ? buyOpacity.value : 0,
      zIndex: index === animatedIndex.value ? 10 : -1,
    };
  });
  const buy50Style = useAnimatedStyle(() => {
    return {
      opacity: index === animatedIndex.value ? buy50Opacity.value : 0,
      zIndex: index === animatedIndex.value ? 10 : -1,
    };
  });
  const top = useAnimatedStyle(() => {
    return {
      opacity:
        index === animatedIndex.value
          ? withTiming(0, { duration: 100 })
          : withTiming(1, { duration: 100 }),
    };
  });
  const dot = useAnimatedStyle(() => {
    return {
      opacity:
        cardIndex === 0
          ? withTiming(1, { duration: 100 })
          : withTiming(0.4, { duration: 100 }),
      transform: [
        {
          scaleX:
            cardIndex === 0
              ? withTiming(1.1, { duration: 200 })
              : withTiming(1, { duration: 200 }),
        },
      ],
    };
  });
  const dotRight = useAnimatedStyle(() => {
    return {
      opacity:
        cardIndex === 1
          ? withTiming(1, { duration: 200 })
          : withTiming(0.4, { duration: 200 }),
      transform: [
        {
          scaleX:
            cardIndex === 1
              ? withTiming(1.1, { duration: 200 })
              : withTiming(1, { duration: 200 }),
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.card, cardStyle]}>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={(e) => {
          if (e.nativeEvent.pageX < windowWidth / 2) {
            leftPress();
          } else {
            rightPress();
          }
        }}
      >
        <Animated.Image
          style={[styles.buy, buyStyle]}
          source={Images.Like}
          resizeMode="contain"
        />
        <Animated.Image
          style={[styles.skip, skipStyle]}
          source={Images.Skip}
          resizeMode="contain"
        />

        <Animated.Image
          style={[styles.buy50Image, buy50Style]}
          source={Images.SuperLike}
          resizeMode="stretch"
        />

        <Animated.View style={[styles.top, top]}>
          <Animated.View style={[styles.dot, dot]} />
          <Animated.View style={[styles.dot, dotRight]} />
        </Animated.View>

        {cardIndex === 0 && (
          <MainCardItemView
            skills={item.technologies}
            activeIndex={activeIndex}
            index={index}
            image={item.img}
            title={item.title}
            nextIndex={nextIndex}
          />
        )}
        {cardIndex === 1 && (
          <AboutView activeIndex={activeIndex} index={index} item={item} />
        )}
      </Pressable>
    </Animated.View>
  );
};

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    buy50Text: {
      fontSize: 42,
      color: "white",
      textAlign: "center",
      alignSelf: "center",
      fontWeight: "800",
      zIndex: 1000,
      width: "80%",
      textShadowColor: "#0099FF",
      textShadowOffset: { width: 1, height: 4 },
      textShadowRadius: 5,
      transform: [{ rotate: "-10deg" }],
    },
    skip: {
      width: scaledSize(120),
      height: scaledSize(104),
      position: "absolute",
      right: 30,
      top: 30,
      zIndex: 10,
      transform: [{ rotate: "25deg" }],
    },
    buy: {
      width: scaledSize(154),
      height: scaledSize(154),
      position: "absolute",
      zIndex: 10,
      transform: [{ rotate: "-25deg" }],
      left: scaledSize(30),
      top: scaledSize(10),
    },
    buy50: {
      position: "absolute",
      right: 0,
      bottom: 15,
      width: cardWidth,

      zIndex: 10,
      alignItems: "center",
      justifyContent: "center",
      gap: -20,
    },
    buy50Image: {
      width: scaledSize(220),
      height: scaledSize(90),
      position: "absolute",
      alignSelf: "center",
      bottom: 35,
    },
    row: {
      flexDirection: "row",
      height: "100%",
      width: windowWidth,
    },
    overlay: {
      justifyContent: "center",
      alignItems: "center",
    },
    right: { flex: 1 },
    tokenLogo: {
      height: scaledSize(50),
      width: scaledSize(50),
      borderRadius: 25,
    },
    card: {
      position: "absolute",
      width: cardWidth,
      height: cardHeight,
      backgroundColor: theme.colors.white,
      borderRadius: 14,
      overflow: "hidden",
      shadowColor: "black",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.7,
      shadowRadius: 5,
      elevation: 5,
    },

    top: {
      position: "absolute",
      top: scaledY(15),
      alignSelf: "center",
      zIndex: 2000,
      width: scaledSize(375),
      height: 5,
      alignItems: "center",
      gap: 20,
      flexDirection: "row",
      justifyContent: "center",
    },
    image: {
      width: scaledSize(335),
      height: scaledSize(474),
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "black",
      zIndex: -1,
    },

    dot: {
      width: scaledSize(100),
      height: 5,
      borderRadius: 5,
      backgroundColor: theme.colors.background,
      marginVertical: 0,
    },
  });
