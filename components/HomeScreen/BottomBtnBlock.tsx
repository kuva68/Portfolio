import { Images } from "@/constants/images";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ExtendedTheme } from "@/types/types";
import { scaledSize, scaledY } from "@/utils/scaleSize";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const BottomBtnBlock = ({
  translateX,
  translateY,
  isBtnPressed,
  onBuy50Press,
  onBuyPress,
  skip,
}: {
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  isBtnPressed: SharedValue<boolean>;
  onBuy50Press: () => void;
  onBuyPress: () => void;
  skip: () => void;
}) => {
  const isSkipPressed = useSharedValue(false);
  const isBuyPressed = useSharedValue(false);
  const isSuperBuyPressed = useSharedValue(false);
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const skipStyle = useAnimatedStyle(() => {
    return {
      opacity:
        (translateX.value > 50 ||
          (translateY.value < -35 && Math.abs(translateX.value) < 50)) &&
        !isBtnPressed.value
          ? withTiming(0, { duration: 50 })
          : withTiming(1, { duration: 50 }),
      transform: [
        {
          scale:
            (translateX.value > 10 ||
              (translateY.value < -25 && translateX.value > -50)) &&
            !isBtnPressed.value
              ? withTiming(0.5, { duration: 50 })
              : withTiming(1, { duration: 50 }),
        },
      ],
    };
  });
  const buyStyle = useAnimatedStyle(() => {
    return {
      opacity:
        (translateX.value < -50 ||
          (translateY.value < -35 && Math.abs(translateX.value) < 50)) &&
        !isBtnPressed.value
          ? withTiming(0, { duration: 50 })
          : withTiming(1, { duration: 50 }),
      transform: [
        {
          scale:
            (translateX.value < -10 ||
              (translateY.value < -15 && translateX.value < 30)) &&
            !isBtnPressed.value
              ? withTiming(0.5, { duration: 50 })
              : withTiming(1, { duration: 50 }),
        },
      ],
    };
  });

  const buy50Style = useAnimatedStyle(() => {
    return {
      opacity:
        Math.abs(translateX.value) > 50 && !isBtnPressed.value
          ? withTiming(0, { duration: 50 })
          : withTiming(1, { duration: 50 }),
      transform: [
        {
          scale:
            Math.abs(translateX.value) > 10 &&
            translateY.value > -25 &&
            !isBtnPressed.value
              ? withTiming(0.5, { duration: 50 })
              : Math.abs(translateX.value) < 50 &&
                translateY.value < -25 &&
                !isBtnPressed.value
              ? withTiming(1.25, { duration: 50 })
              : withTiming(1, { duration: 50 }),
        },
      ],
    };
  });

  const buyChangeStyle = useAnimatedStyle(() => {
    return {
      opacity: isBuyPressed.value
        ? withTiming(1, { duration: 0 })
        : translateX.value > 50 && !isBtnPressed.value
        ? withTiming(1, { duration: 50 })
        : withTiming(0, { duration: 50 }),
      transform: [
        {
          scale: isBuyPressed.value
            ? withTiming(1, { duration: 0 })
            : translateX.value > 50 && !isBtnPressed.value
            ? withTiming(1, { duration: 50 })
            : withTiming(0, { duration: 50 }),
        },
      ],
    };
  });
  const superBuyChangeStyle = useAnimatedStyle(() => {
    return {
      opacity: isSuperBuyPressed.value
        ? withTiming(1, { duration: 0 })
        : translateY.value < -30 && !isBtnPressed.value
        ? withTiming(1, { duration: 50 })
        : withTiming(0, { duration: 50 }),
      transform: [
        {
          scale: isSuperBuyPressed.value
            ? withTiming(1, { duration: 100 })
            : translateY.value < -30 &&
              !isBtnPressed.value &&
              Math.abs(translateX.value) < 45
            ? withTiming(1, { duration: 50 })
            : withTiming(0, { duration: 50 }),
        },
      ],
    };
  });

  const skipChangeStyle = useAnimatedStyle(() => {
    return {
      opacity: isSkipPressed.value
        ? withTiming(1, { duration: 0 })
        : translateX.value < -50 && !isBtnPressed.value
        ? withTiming(1, { duration: 50 })
        : withTiming(0, { duration: 50 }),
      transform: [
        {
          scale: isSkipPressed.value
            ? withTiming(1, { duration: 0 })
            : translateX.value < -50 && !isBtnPressed.value
            ? withTiming(1, { duration: 50 })
            : withTiming(0, { duration: 50 }),
        },
      ],
    };
  });

  const AnimatedOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <View style={styles.bottom}>
      <AnimatedOpacity
        activeOpacity={1}
        style={[styles.animCircle, skipStyle]}
        onPressIn={() => (isSkipPressed.value = true)}
        onPressOut={() => (isSkipPressed.value = false)}
        onPress={skip}
      >
        <Animated.View style={[styles.circlePosition]}>
          <View style={[styles.circleGradient, { backgroundColor: "#FFFFFF" }]}>
            <Images.RoseX width={scaledSize(29)} height={scaledSize(29)} />
          </View>
        </Animated.View>
        <Animated.View style={[styles.circlePosition, skipChangeStyle]}>
          <LinearGradient
            style={[styles.circleGradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#FB1DB8", "#F92F46"]}
          >
            <Images.WhiteX width={scaledSize(29)} height={scaledSize(29)} />
          </LinearGradient>
        </Animated.View>
      </AnimatedOpacity>
      <AnimatedOpacity
        style={[styles.animCircle, styles.circleStar, buy50Style]}
        activeOpacity={1}
        onPress={onBuy50Press}
        onPressIn={() => (isSuperBuyPressed.value = true)}
        onPressOut={() => (isSuperBuyPressed.value = false)}
      >
        <Animated.View style={[styles.circlePosition]}>
          <View
            style={[
              styles.circleGradient,
              //styles.circleStar,
              { backgroundColor: "#FFFFFF" },
            ]}
          >
            <Images.BlueStar width={scaledSize(28)} height={scaledSize(28)} />
          </View>
        </Animated.View>
        <Animated.View style={[styles.circlePosition, superBuyChangeStyle]}>
          <LinearGradient
            style={[styles.circleGradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#35C5FF", "#0059E0"]}
          >
            <Images.WhiteStar width={scaledSize(28)} height={scaledSize(28)} />
          </LinearGradient>
        </Animated.View>
      </AnimatedOpacity>
      <AnimatedOpacity
        activeOpacity={1}
        onPress={onBuyPress}
        onPressIn={() => (isBuyPressed.value = true)}
        onPressOut={() => (isBuyPressed.value = false)}
        style={[styles.animCircle, buyStyle]}
      >
        <Animated.View style={[styles.circlePosition]}>
          <View style={[styles.circleGradient, { backgroundColor: "#FFFFFF" }]}>
            <Images.GreenHeart
              fill={theme.colors.success}
              width={scaledSize(29)}
              height={scaledSize(31)}
            />
          </View>
        </Animated.View>
        <Animated.View style={[styles.circlePosition, buyChangeStyle]}>
          <LinearGradient
            style={[styles.circleGradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#C9F61F", "#26AC2D"]}
          >
            <Images.WhiteHeart width={scaledSize(29)} height={scaledSize(31)} />
          </LinearGradient>
        </Animated.View>
      </AnimatedOpacity>
    </View>
  );
};
export default BottomBtnBlock;
const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    bottom: {
      position: "absolute",
      bottom:
        Platform.OS === "web" &&
        theme.sizes.SCREEN_HEIGHT < theme.sizes.SCREEN_WIDTH
          ? 10
          : Platform.OS === "web"
          ? 60
          : scaledSize(-28),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: scaledSize(13),
      zIndex: 10000,
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
    circlePosition: {
      position: "absolute",
      borderRadius: 50,
      width: scaledSize(60),
      height: scaledSize(60),
    },
    circleGradient: {
      width: scaledSize(60),
      height: scaledSize(60),
      borderRadius: scaledSize(50),
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    circleStar: {
      width: scaledSize(48),
      height: scaledSize(48),
    },
  });
