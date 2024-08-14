import { Text } from "@/components/Text";
import { defaultColors } from "@/constants/Colors";
import { scaledSize, scaledY } from "@/utils/scaleSize";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

const SkillView = ({ skill }: { skill: string }) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <LinearGradient colors={["#818181", "#81818180"]} style={[styles.card]}>
      <Text numberOfLines={2} preset="accentLight" style={styles.title}>
        {skill}
      </Text>
    </LinearGradient>
  );
};
export default SkillView;
const createStyles = () =>
  StyleSheet.create({
    card: {
      paddingTop: scaledY(1),
      paddingHorizontal: scaledSize(8),
      borderRadius: scaledSize(18),
      paddingBottom: scaledY(2),
      overflow: "hidden",
    },

    title: {
      color: defaultColors.white,
      maxWidth: 270,
      fontSize: scaledSize(10),
      textAlign: "center",
    },
  });
