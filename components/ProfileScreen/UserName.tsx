import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useMemo } from "react";
import Animated, { BounceInUp, BounceOutUp } from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useCopy } from "@/hooks/useCopy";
import Text from "../Text";
import { AppButton } from "../AppButton";
import { LinearGradient } from "expo-linear-gradient";
import { Images } from "@/constants/images";
import { ExtendedTheme } from "@/types/types";
import { scaledSize, scaledY } from "@/utils/scaleSize";

const UserName = ({ style }: { style: ViewStyle }) => {
  const theme = useThemeColor();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { copied, copyText } = useCopy();
  const handleCopyClick = (link: string) => {
    copyText(link);
  };
  const onHireMePress = () => {
    try {
      Linking.openURL("https://www.linkedin.com/in/vadim-kudelskiy-05168b217/");
    } catch {
      Alert.alert("Sorry now can't open link");
    }
  };
  return (
    <View style={[styles.main, style]}>
      <Text preset="secondary" style={styles.addressWallet}>
        Hello,
      </Text>
      <Text preset="title">I am Vadim</Text>
      <Text preset="accentTitle">React Native Developer</Text>
      <AppButton
        onPress={onHireMePress}
        gradient
        style={styles.button}
        textStyle={styles.btnTextStyle}
      >
        Hire me
      </AppButton>
      {/* <Text preset="secondary" style={styles.addressWallet}>
        Contacts:
      </Text> */}
      <View style={styles.bottom}>
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
        <Text preset="accentTitle">Have Any Project?</Text>
        <Text preset="secondary" style={styles.addressWallet}>
          Why wait, lets plan to connect.
        </Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              handleCopyClick(
                "https://www.linkedin.com/in/vadim-kudelskiy-05168b217/"
              )
            }
          >
            <Images.Linkedin />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCopyClick("+380503236672")}>
            <Images.Telegram />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCopyClick("kuva68@gmail.com")}>
            <Images.Email width={48} fill={"#00000090"} height={48} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserName;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      borderRadius: 30,
      height: scaledSize(50),
      justifyContent: "center",
      paddingHorizontal: scaledSize(20),
      backgroundColor: "white",
    },
    row: {
      flexDirection: "row",
      gap: scaledSize(20),
      alignItems: "center",
      justifyContent: "center",
      marginTop: scaledY(10),
    },
    copiedText: {
      color: theme.colors.background,
    },
    copiedTextView: {
      position: "absolute",
      top: scaledSize(-20),
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
    button: {
      alignSelf: "center",
      marginVertical: scaledY(20),
      width: Platform.OS === "web" ? 260 : scaledSize(335),
    },
    text: { color: "#00000090" },
    btnTextStyle: {
      color: "white",
    },
    main: { width: "100%", gap: scaledY(8) },
    addressWallet: { color: "#00000090" },

    gradient: {
      height: scaledSize(50),
      width: scaledSize(109),
      borderRadius: 30,
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    touch: { position: "absolute", right: 0, top: 0 },
    bottom: { gap: scaledY(10) },
  });
