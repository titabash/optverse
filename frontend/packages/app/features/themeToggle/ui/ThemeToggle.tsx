import React, { useState } from "react";
import { Moon, Sun } from "@tamagui/lucide-icons";
import { Stack, Switch, YStack } from "tamagui";
import { useColorScheme } from "react-native";
import { useAtom } from "jotai";
import { themeAtom } from "app/features/themeToggle/model/themeAtom";

export const ThemeToggle = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Switch
      size="$4"
      checked={theme === "dark"}
      onCheckedChange={toggleTheme}
      animation="quick"
      backgroundColor={theme === "dark" ? "$gray10" : "$gray10"}
    >
      <Switch.Thumb
        justifyContent="center"
        alignItems="center"
        backgroundColor={theme === "dark" ? "white" : "white"}
        animation={[
          "quick",
          {
            transform: {
              overshootClamping: true,
            },
          },
        ]}
      >
        {theme === "dark" ? (
          <Moon size={16} color="black" />
        ) : (
          <Sun size={16} color="black" />
        )}
      </Switch.Thumb>
    </Switch>
  );
};
