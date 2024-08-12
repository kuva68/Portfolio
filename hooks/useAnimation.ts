import { Gesture } from "react-native-gesture-handler";
import {
  interpolate,
  runOnJS,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Dimensions } from "react-native";
import { useCallback } from "react";
import { cardWidth } from "@/constants";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export const useAnimation = ({ maxIndex }: { maxIndex: number }) => {
  const buyOpacity = useSharedValue(0);
  const buy50Opacity = useSharedValue(0);
  const skipOpacity = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const animatedIndex = useSharedValue<number | null>(null);
  const isFreezing = useSharedValue(false);
  const activeIndex = useSharedValue(0);
  const initialY = useSharedValue(0);
  const isBtnPressed = useSharedValue(false);
  const isSuperVisible = useSharedValue(false);
  const isBuySmall = useSharedValue(false);
  const isBuy50Small = useSharedValue(false);
  const isSkipSmall = useSharedValue(false);
  const startTime = useSharedValue(0);
  const nextIndex = useSharedValue<null | number>(null);
  const setActiveIndex = (value: number) => (activeIndex.value = value);

  const swapEnd = useCallback(() => {
    setTimeout(() => {
      setActiveIndex(activeIndex.value > 0 ? activeIndex.value - 1 : maxIndex);
      nextIndex.value = null;
    }, 0);

    setTimeout(() => {
      animatedIndex.value = null;
      skipOpacity.value = 0;
      buyOpacity.value = 0;
      buy50Opacity.value = 0;
      setTimeout(() => {
        translateX.value = 0;
        translateY.value = 0;
        isBtnPressed.value = false;
        isBuySmall.value = false;
        isBuy50Small.value = false;
        isSkipSmall.value = false;
        setTimeout(() => {
          isFreezing.value = false;
        });
      });
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex.value, maxIndex]);

  const onBuyToken = useCallback(() => {
    // if (animatedIndex.value !== null) {
    //    buy(animatedIndex.value, false);
    // }

    setTimeout(() => {
      setActiveIndex(activeIndex.value > 0 ? activeIndex.value - 1 : maxIndex);
    }, 0);
    setTimeout(() => {
      animatedIndex.value = null;
      skipOpacity.value = 0;
      buyOpacity.value = 0;
      buy50Opacity.value = 0;
      setTimeout(() => {
        translateX.value = 0;
        translateY.value = 0;
        isBtnPressed.value = false;
        isBuySmall.value = false;
        isBuy50Small.value = false;
        isSkipSmall.value = false;
        setTimeout(() => {
          isFreezing.value = false;
        });
      });
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex.value, animatedIndex.value, maxIndex]);
  const onBuy50Token = useCallback(() => {
    // if (animatedIndex.value) {
    //   buy(animatedIndex.value, true);
    // }
    setTimeout(() => {
      setActiveIndex(activeIndex.value > 0 ? activeIndex.value - 1 : maxIndex);
    }, 0);
    setTimeout(() => {
      isSuperVisible.value = true;
      setTimeout(() => {
        isSuperVisible.value = false;
      }, 1000);
    }, 200);
    setTimeout(() => {
      animatedIndex.value = null;
      translateX.value = 0;
      translateY.value = 0;
      skipOpacity.value = 0;
      buyOpacity.value = 0;
      buy50Opacity.value = 0;
      isBtnPressed.value = false;
      isBuySmall.value = false;
      isBuy50Small.value = false;
      isSkipSmall.value = false;
      isFreezing.value = false;
    }, 800);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex.value, animatedIndex.value, maxIndex]);
  const gesture = Gesture.Pan()
    .onStart((event) => {
      if (!isFreezing.value && maxIndex > 0) {
        animatedIndex.value = activeIndex.value;
        startTime.value = Date.now();
        initialY.value = event.y;
        translateX.value = event.translationX;
        translateY.value = event.translationY;
        nextIndex.value =
          activeIndex.value > 0 ? activeIndex.value - 1 : maxIndex;
      }
    })
    .onUpdate((event) => {
      if (!isFreezing.value && maxIndex > 0 && animatedIndex.value !== null) {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
        skipOpacity.value = interpolate(
          event.translationX,
          [-100, -50, -20],
          [1, 0.2, 0],
          "clamp"
        );
        buyOpacity.value = interpolate(
          event.translationX,
          [20, 50, 100],
          [0, 0.2, 1],
          "clamp"
        );
        if (Math.abs(event.translationX) > 50) {
          buy50Opacity.value = withTiming(0, { duration: 200 });
        }

        rotate.value = (event.translationX / windowWidth) * 25;

        buy50Opacity.value =
          Math.abs(event.translationX) > 50
            ? 0
            : interpolate(event.translationY, [-25, -120], [0, 1], "clamp");
      }
    })
    .onEnd((event) => {
      const goBack = () => {
        translateX.value = withTiming(0, {
          duration: 300,
        });
        translateY.value = withTiming(0, {
          duration: 300,
        });

        buy50Opacity.value = withTiming(0, { duration: 100 });
        skipOpacity.value = withTiming(0, { duration: 100 });
        buyOpacity.value = withTiming(0, { duration: 100 });
        animatedIndex.value = null;
        isFreezing.value = false;
        nextIndex.value = null;
      };

      if (!isFreezing.value && maxIndex > 0 && animatedIndex.value !== null) {
        const duration = Date.now() - startTime.value;
        rotate.value = withSpring(0);
        const direction = Math.sign(translateX.value);

        if (
          Math.abs(translateX.value) > cardWidth * 0.4 ||
          (Math.abs(translateX.value) > cardWidth * 0.1 &&
            duration < 350 &&
            duration > 0)
        ) {
          translateX.value = withTiming(direction * windowWidth * 3, {
            duration: 100,
          });
          translateY.value = withSpring(event.translationY, {
            damping: 50,
            stiffness: 100,
          });
          if (direction > 0) {
            isFreezing.value = true;
            runOnJS(onBuyToken)();
          } else {
            isFreezing.value = true;
            runOnJS(swapEnd)();
          }
        } else if (translateY.value < -140 && Math.abs(translateX.value) < 50) {
          isFreezing.value = true;
          translateX.value = 0;
          translateY.value = withSpring(windowHeight * -2, {
            damping: 50,
            stiffness: 100,
          });

          runOnJS(onBuy50Token)();
        } else {
          goBack();
        }
      } else {
        goBack();
      }
    });

  const onBuyPress = () => {
    if (isFreezing.value || !maxIndex) {
      return;
    }

    isFreezing.value = true;

    setTimeout(() => {
      isSkipSmall.value = true;
      isBuy50Small.value = true;
      isBtnPressed.value = true;
      animatedIndex.value = activeIndex.value;
      buyOpacity.value = withTiming(1, { duration: 300 });
      translateX.value = withDelay(400, withTiming(850, { duration: 300 }));
    });
    setTimeout(() => {
      onBuyToken();
    }, 700);
  };
  const onBuy50Press = () => {
    if (isFreezing.value || !maxIndex) {
      return;
    }

    isFreezing.value = true;
    setTimeout(() => {
      isSuperVisible.value = true;
    }, 600);
    setTimeout(() => {
      isSkipSmall.value = true;
      isBuySmall.value = true;
      animatedIndex.value = activeIndex.value;
      isBtnPressed.value = true;
      buy50Opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withDelay(
        400,

        withTiming(-1150, {
          duration: 400,
        })
      );
      setTimeout(() => {
        onBuy50Token();
      }, 700);
    });
  };
  const skip = () => {
    if (isFreezing.value || !maxIndex) {
      return;
    }
    isFreezing.value = true;

    setTimeout(() => {
      isBuySmall.value = true;
      isBuy50Small.value = true;
      animatedIndex.value = activeIndex.value;
      isBtnPressed.value = true;
      skipOpacity.value = withTiming(1, { duration: 300 });
      translateX.value = withDelay(400, withTiming(-950, { duration: 300 }));
    });
    setTimeout(() => {
      swapEnd();
    }, 700);
  };

  return {
    gesture,
    buyOpacity,
    buy50Opacity,
    skipOpacity,
    translateX,
    translateY,
    animatedIndex,
    onBuy50Press,
    skip,
    onBuyPress,
    activeIndex,
    setActiveIndex,
    rotate,
    initialY,
    isBtnPressed,
    isSuperVisible,
    isBuy50Small,
    isBuySmall,
    isSkipSmall,
    nextIndex,
  };
};
