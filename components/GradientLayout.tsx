import React, { PropsWithChildren, useMemo } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const GradientLayout = ({ children }: PropsWithChildren) => {
  const styles = useMemo(() => createStyles(), []);

  return (
    <LinearGradient
      colors={["#9A0041", "#FF565A", "#FF9F5A"]}
      style={styles.main}
    >
      {children}
    </LinearGradient>
  );
};
export default GradientLayout;
const createStyles = () =>
  StyleSheet.create({
    main: { flex: 1, alignItems: "center", width: "100%" },
  });
