module.exports = function (api) {
  const env = process.env.BUILD_ENV ?? "local";
  console.log(`Using env: ${env}`);
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxRuntime: "automatic" }]],
    plugins: [
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["../.."],
          alias: {
            // define aliases to shorten the import paths
            app: "../../packages/app",
            "@my/ui": "../../packages/ui",
          },
          extensions: [".js", ".jsx", ".tsx", ".ios.js", ".android.js"],
        },
      ],
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: `../../../env/${env}.env`,
          safe: false,
          allowUndefined: true,
        },
        `dotenv-${env}`,
      ],
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV_SECRETS",
          moduleName: "@envSecrets",
          path: "../../../env/secrets.env",
          safe: false,
          allowUndefined: true,
        },
        "dotenv-secrets",
      ],
      // if you want reanimated support
      // 'react-native-reanimated/plugin',
      ...(process.env.EAS_BUILD_PLATFORM === "android"
        ? []
        : [
            [
              "@tamagui/babel-plugin",
              {
                components: ["@my/ui", "tamagui"],
                config: "../../packages/config/src/tamagui.config.ts",
              },
            ],
          ]),
    ],
  };
};
