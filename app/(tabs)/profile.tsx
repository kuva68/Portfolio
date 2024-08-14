import React, { useMemo } from "react";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import GradientLayout from "@/components/GradientLayout";
import { ExtendedTheme } from "@/types/types";
import ProfileCard from "@/components/ProfileScreen/ProfileCard";
import { PhoneTemplate } from "@/components/PhoneTemplate";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants";

const ProfileScreen = () => {
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.container}>
      <GradientLayout>
        {Platform.OS === "web" && SCREEN_HEIGHT < SCREEN_WIDTH ? (
          <PhoneTemplate>
            <View style={styles.containerView}>
              <ProfileCard />
            </View>
          </PhoneTemplate>
        ) : (
          <ProfileCard />
        )}
      </GradientLayout>
    </SafeAreaView>
  );
};

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.white },
    containerView: {
      width: "100%",
      height: "100%",
      overflow: "hidden",
      alignItems: "center",
      borderRadius: Platform.OS === "web" ? 30 : 0,
    },
  });

export default ProfileScreen;
