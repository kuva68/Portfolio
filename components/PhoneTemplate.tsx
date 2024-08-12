import { PropsWithChildren, useState } from "react";
import { ImageBackground, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Images } from "@/constants/images";
import { SCREEN_HEIGHT } from "@/constants";

export function PhoneTemplate({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  return (
    <ImageBackground
      resizeMode="stretch"
      style={styles.webContainer}
      source={Images.Phone}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    overflow: "hidden",
    marginTop: 10,
    paddingHorizontal: 27,
    width: 395,
    paddingVertical: 20,
    paddingTop: 55,
    height: SCREEN_HEIGHT * 0.9,
    alignItems: "center",
    paddingLeft: 25,
  },
});
