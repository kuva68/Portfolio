import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useTheme } from "@react-navigation/native";
import BottomTabIcon from "@/components/BottomTabIcon";
import { EnScreens } from "@/types/enums";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
      }}
    >
      {/* <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
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
    </Tabs>
  );
}
