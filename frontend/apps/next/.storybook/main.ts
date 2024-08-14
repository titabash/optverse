// @ts-ignore
import { StorybookConfig } from "@storybook/nextjs";
import path, { resolve } from "path";

const projectRoot = path.resolve(__dirname, "../../.."); // この行を追加

const config: StorybookConfig = {
  stories: [path.resolve(projectRoot, "packages/ui/src/**/*.stories.@(js|jsx|ts|tsx|mdx)")],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // "storybook-react-i18next",
    {
      name: '@storybook/addon-react-native-web',
      options: {
        modulesToTranspile: [
          'solito',
          // 'react-native-web',
          'expo-linking',
          'expo-constants',
          'expo-modules-core',
          // 'react-i18next',
          'expo-document-picker',
          'expo-av',
          'expo-asset',
        ],

        babelPlugins: [
          // "react-native-reanimated/plugin", // this breaks...
        ],
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      // nextConfigPath: path.resolve(projectRoot, "apps/next/next.config.js"),
    },
  },
  webpackFinal: async (config, { configType }) => {
    return config;
  },
  env: (config) => ({
    ...config,
    TAMAGUI_TARGET: "wab",
  }),
  docs: {
    autodocs: true,
    defaultName: "Documentation",
  },
};
export default config;
