import { Images } from "@/constants/images";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useMemo } from "react";
import {
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import ProfileImage from "./ProfileImage";
import UserName from "./UserName";
import { ExtendedTheme } from "@/types/types";
import { scaledSize, scaledY } from "@/utils/scaleSize";
export const SPACING = 10;

const ProfileCard = () => {
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable style={styles.flex}>
      <ImageBackground
        source={Images.ProfileBg}
        style={styles.containerMargin}
        resizeMode="stretch"
      >
        <View>
          <ProfileImage />
        </View>
        <UserName style={styles.mTop} />
      </ImageBackground>
    </Pressable>
  );
};

export default ProfileCard;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    containerMargin: {
      paddingTop: scaledY(10),
      width:
        Platform.OS === "web" ? theme.sizes.cardWidth * 1.03 : scaledSize(375),
      flex: 1,
      paddingHorizontal: scaledSize(20),
      alignItems: "center",
      alignSelf: "center",
      height: "100%",
      top:
        Platform.OS === "web" &&
        theme.sizes.SCREEN_HEIGHT > theme.sizes.SCREEN_WIDTH
          ? 40
          : 0,
    },
    mTop: { marginTop: scaledY(41), marginBottom: scaledY(24) },
    start: { alignSelf: "flex-start" },
    flex: {
      flex: 1,
      marginTop: 31,
      width: Platform.OS === "web" ? theme.sizes.cardWidth : "100%",
      height: "100%",
    },
    absolute: {
      position: "absolute",
      top: scaledSize(83),
      right: scaledSize(-3),
      zIndex: 10,
      padding: scaledSize(3),
      backgroundColor: "white",
      borderRadius: 30,
    },

    container: {
      alignItems: "center",
      borderRadius: 20,
      marginBottom: 20,
      position: "relative",
      zIndex: -1,
    },
    name: { color: "white", fontSize: 24, marginBottom: 10 },
    imageStyle: {
      width: "100%",
      height: "100%",
      position: "relative",
      zIndex: 10,
    },
  });
