import React, { useMemo } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scaledSize, scaledY } from "../../utils/scaleSize";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ExtendedTheme } from "@/types/types";
import { Text } from "@/components/Text";
import { MyCardDeck } from "@/components/HomeScreen/MyCardDeck";

const MainScreen = () => {
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.kbContainer}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.top}>
        <Text style={styles.text} preset="title">
          Developed Apps
        </Text>
      </View>

      <MyCardDeck />
    </SafeAreaView>
  );
};

export default MainScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    kbContainer: {
      flex: 1,
      alignItems: "center",
    },

    text: {
      color: theme.colors.primary,
      alignSelf: Platform.OS === "web" ? "center" : "flex-start",
    },
    top: {
      height: scaledSize(80),
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      paddingHorizontal: scaledY(20),
      width: "100%",
    },
  });
