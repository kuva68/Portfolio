import React, { useMemo, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { CarouselItem } from "./CarouselItem";
import { skills } from "../../constants";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ExtendedTheme } from "@/types/types";

export const SkillsCarousell = () => {
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const scrollX = useSharedValue(0);
  const ref = useRef<FlatList>(null);

  const onScrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <Animated.FlatList
      style={styles.flat}
      ref={ref}
      horizontal
      onScroll={onScrollHandler}
      scrollEventThrottle={16}
      decelerationRate={0.8}
      disableIntervalMomentum={true}
      disableScrollViewPanResponder={true}
      data={skills}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item?.title}
      pagingEnabled={true}
      snapToAlignment="center"
      renderItem={({ item, index }) => {
        return <CarouselItem {...{ index, item, scrollX }} />;
      }}
    />
  );
};
export default SkillsCarousell;
const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    flat: {},
  });
