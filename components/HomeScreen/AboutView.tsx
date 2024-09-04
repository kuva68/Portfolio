import Text from "@/components/Text/index";
import { cardWidth } from "@/constants";
import { useCopy } from "@/hooks/useCopy";
import { useThemeColor } from "@/hooks/useThemeColor";
import { appExample } from "@/store/appStore";
import { scaledSize, scaledY } from "@/utils/scaleSize";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  BounceInUp,
  BounceOutUp,
  FadeIn,
  FadeOut,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import SkillView from "./Skill";
import { ExtendedTheme } from "@/types/types";
import LinkField from "@/components/LinkField";

const AboutView = ({
  item,
  activeIndex,
  index,
}: {
  item: appExample;
  activeIndex: SharedValue<number>;
  index: number;
}) => {
  const { copied, copyText } = useCopy();
  const handleCopyClick = (link: string) => {
    copyText(link);
  };
  const top = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      display: activeIndex.value === index ? "flex" : "none",
      zIndex: 20,
    };
  });
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <Animated.View
      style={[styles.card]}
      exiting={FadeOut.duration(200)}
      entering={FadeIn.duration(200)}
    >
      {copied && (
        <Animated.View
          entering={BounceInUp}
          exiting={BounceOutUp}
          style={styles.copiedTextView}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#9A0041", "#FF565A", "#FFC296"]}
            style={styles.copyGradient}
          >
            <Text style={styles.copiedText}>Copied</Text>
          </LinearGradient>
        </Animated.View>
      )}
      <Animated.View style={top}>
        <LinearGradient
          colors={["#18244080", "#18244000", "#00000000"]}
          locations={[0, 0.7, 1]}
          style={[
            {
              width: cardWidth,
              height: scaledSize(160),
            },
          ]}
        />
      </Animated.View>
      <Text style={styles.title} preset="title">
        {item.title}
      </Text>
      <View style={styles.flatlistContainer}>
        <Text style={styles.title} preset="title">
          Technologies:
        </Text>

        <View style={styles.view}>
          {item.technologies.map((el, i) => (
            <SkillView skill={el} key={el + i} />
          ))}
        </View>
        {item.androidLink && (
          <LinkField
            link={item.androidLink}
            title="Google Play link"
            handleCopyClick={handleCopyClick}
          />
        )}
        {item.iosLink && (
          <LinkField
            link={item.iosLink}
            title="App Store link"
            handleCopyClick={handleCopyClick}
          />
        )}
      </View>
    </Animated.View>
  );
};
export default AboutView;
const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    card: {
      width: "100%",
      height: "100%",
      paddingTop: scaledY(48),
      paddingHorizontal: scaledSize(20),
      backgroundColor: theme.colors.text,
    },
    copiedTextView: {
      position: "absolute",
      top: scaledSize(40),
      alignSelf: "center",
      backfaceVisibility: "hidden",
      zIndex: 5000,
      elevation: 20,
      shadowColor: "#00000060",
      shadowRadius: 10,
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 10 },
    },
    copyGradient: {
      width: 70,
      height: 30,
      backgroundColor: theme.colors.white,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    view: {
      width: "100%",
      paddingBottom: scaledY(20),
      flexDirection: "row",
      flexWrap: "wrap",
      gap: scaledY(4),
      alignItems: "center",
      overflow: "hidden",
    },
    copiedText: {
      color: theme.colors.background,
    },
    title: { color: theme.colors.primary },
    flatlistContainer: {
      width: "100%",
      gap: scaledY(20),
      paddingTop: scaledY(24),
      overflow: "hidden",
    },
  });
