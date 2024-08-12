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
      <Text preset="accentLight" style={styles.title}>
        {skill}
      </Text>
    </LinearGradient>
  );
};
export default SkillView;
const createStyles = () =>
  StyleSheet.create({
    card: {
      paddingVertical: scaledY(6),
      paddingHorizontal: scaledSize(8),
      borderRadius: scaledSize(18),
    },

    title: { color: defaultColors.white },
  });
