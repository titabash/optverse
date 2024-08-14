import type { Preview } from "@storybook/react";
import React from "react";
import { config, TamaguiProvider } from "@my/ui";
import { NextThemeProvider, useRootTheme } from "@tamagui/next-theme";

export const decorators = [
  (Story, context) => (
    <ThemeProvider theme={context.globals.theme}>
      <Story />
    </ThemeProvider>
  ),
];

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      title: "Theme",
      description: "Theme for your components",
      defaultValue: "light",
      toolbar: {
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "light", left: "☀️", title: "Light Mode" },
          { value: "dark", left: "🌙", title: "Dark Mode" },
        ],
      },
    },
  },
  globals: {
    locale: "en",
    locales: {
      en: "English",
      de: "German",
    },
  },
  parameters: {},
  decorators: decorators,
};

function ThemeProvider({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: string;
}) {
  return (
    <>
      <TamaguiProvider config={config} defaultTheme={theme}>
        {children}
      </TamaguiProvider>
    </>
  );
}

export default preview;
