import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomTabIcon from "@/components/BottomTabIcon";
import { EnScreens } from "@/types/enums";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <ThemeProvider
      value={{
        colors,
        dark: colorScheme === "dark",
      }}
    >
      <SafeAreaProvider>
        <Tabs
          //initialRouteName="profile"
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Apps",
              tabBarIcon: ({ color, focused }) => (
                <BottomTabIcon isFocused={focused} route={EnScreens.MAIN} />
              ),
            }}
          />
          <Tabs.Screen
            name="skills"
            options={{
              title: "Skills",
              tabBarIcon: ({ color, focused }) => (
                <BottomTabIcon isFocused={focused} route={EnScreens.SKILLS} />
              ),
            }}
          />
          <Tabs.Screen
            name="index"
            options={{
              title: "About",
              tabBarIcon: ({ color, focused }) => (
                <BottomTabIcon isFocused={focused} route={EnScreens.ABOUT} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
