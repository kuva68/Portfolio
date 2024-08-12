import React from "react";

import { scaledSize } from "../utils/scaleSize";
import { Images } from "@/constants/images";
import { EnScreens } from "@/types/enums";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props {
  route: string;
  isFocused: boolean;
}

const BottomTabIcon = ({ route, isFocused }: Props) => {
  const theme = useThemeColor();
  const renderIcon = (route: string) => {
    switch (route) {
      case EnScreens.MAIN:
        return (
          <Images.Home
            width={scaledSize(24)}
            height={scaledSize(24)}
            fill={
              isFocused
                ? theme.colors.tabIconSelected
                : theme.colors.tabIconDefault
            }
          />
        );
      case EnScreens.ABOUT:
        return (
          <Images.Profile
            width={scaledSize(24)}
            height={scaledSize(24)}
            fill={
              isFocused
                ? theme.colors.tabIconSelected
                : theme.colors.tabIconDefault
            }
          />
        );

      default:
        return (
          <Images.Creation
            width={scaledSize(24)}
            height={scaledSize(24)}
            fill={
              isFocused
                ? theme.colors.tabIconSelected
                : theme.colors.tabIconDefault
            }
          />
        );
    }
  };

  return renderIcon(route);
};

export default BottomTabIcon;
