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
    flex: {
      flex: 1,
      marginTop: 31,
      width: Platform.OS === "web" ? theme.sizes.cardWidth : "100%",
      height: "100%",
    },
  });
