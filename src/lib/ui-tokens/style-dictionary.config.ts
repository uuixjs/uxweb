import { resolve } from "path";

export const styleDictionaryConfig = {
  source: [resolve(__dirname, "properties/**/*.json")],
  platforms: {
    css: {
      transformGroup: "css-custom",
      buildPath: "css/",
      files: [
        {
          destination: "themes.css",
          format: "css/themes",
          filter: {
            attributes: {
              category: "themes",
            },
          },
        },
        {
          destination: "theme-root-light.css",
          format: "css/themes",
          filter: {
            attributes: {
              category: "themes",
              type: "light",
            },
          },
        },
        {
          destination: "theme-root-dark.css",
          format: "css/themes",
          filter: {
            attributes: {
              category: "themes",
              type: "dark",
            },
          },
        },
        {
          destination: "variables.css",
          format: "css/variables",
          filter: "excludeThemes",
          options: {
            showFileHeader: false,
          },
        },
      ],
    },
    scss: {
      transformGroup: "scss-custom",
      buildPath: "scss/",
      files: [
        {
          destination: "themes.scss",
          format: "scss/themes",
          filter: {
            attributes: {
              category: "themes",
            },
          },
        },
        {
          destination: "variables.scss",
          format: "scss/variables",
          filter: "excludeThemes",
          options: {
            showFileHeader: false,
          },
        },
      ],
    },
    json: {
      transformGroup: "css-custom",
      buildPath: "json/",
      files: [
        {
          destination: "all.json",
          format: "json/all",
        },
        {
          destination: "light.json",
          format: "json/theme",
          filter: {
            attributes: {
              category: "themes",
              type: "light",
            },
          },
        },
        {
          destination: "dark.json",
          format: "json/theme",
          filter: {
            attributes: {
              category: "themes",
              type: "dark",
            },
          },
        },
        {
          destination: "variables.json",
          format: "json/variables",
          filter: "excludeThemes",
        },
      ],
    },
    ts: {
      transformGroup: "css-custom",
      buildPath: "build/",
      files: [
        {
          destination: "index.ts",
          format: "ts/all",
        },
        {
          destination: "dictionary.ts",
          format: "ts/dictionary",
        },
      ],
    },
    android: {
      transforms: ["name/ti/snake", "attribute/cti", "color/hex8android"],
      buildPath: "android/",
      files: [
        {
          destination: "colors.xml",
          format: "android/colors",
          options: {
            showFileHeader: false,
          },
          filter: {
            attributes: {
              category: "color",
            },
          },
        },
      ],
    },
    ios: {
      transformGroup: "ios-swift-separate-custom",
      buildPath: "ios/",
      prefix: "twitch",
      files: [
        {
          destination: "UIColor+CoreUI.swift",
          format: "ios/swift_colors",
          filter: {
            attributes: {
              category: "color",
            },
          },
        },
        {
          destination: "TWCoreUITheme.h",
          format: "ios/theme_protocol",
          filter: "isThemeColor",
        },
        {
          destination: "CoreUITheme.swift",
          format: "ios/swift_themes",
          filter: "isThemeColor",
        },
      ],
    },
  },
};
