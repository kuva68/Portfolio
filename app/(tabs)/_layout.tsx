import { Tabs } from "expo-router";
import React from "react";
import { useTheme } from "@react-navigation/native";
import BottomTabIcon from "@/components/BottomTabIcon";
import { EnScreens } from "@/types/enums";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
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
        name="profile"
        options={{
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <BottomTabIcon isFocused={focused} route={EnScreens.ABOUT} />
          ),
        }}
      />
    </Tabs>
  );
}
