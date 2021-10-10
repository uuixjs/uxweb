import { Dictionary } from "../types";
import {
  capitalize,
  fixPropertyName,
  fixUiColor,
  formatCssValue,
  formatIOSPropertyNameFromPath,
  formatIOSValue,
  formatRawPropertyNameFromPath,
  formatThemePropertyName,
  hasCssKeywordValue,
  sortByPropertyName,
} from "../utils";

export * from "./js";

/**
 * Returns theme tokens as CSS variables.
 */
export const cssThemesCustomFormat = {
  name: "css/themes",
  formatter: ({ allProperties, properties }: Dictionary) => {
    const themeKeys = Object.keys(properties.themes);
    let str = "";

    // If filtering by a specific, ie light OR dark, then write the tokens
    // to root.
    if (themeKeys.length === 1) {
      str += `:root {\r`;

      allProperties.forEach((property) => {
        str += `  --${formatThemePropertyName(
          property.name,
          themeKeys[0],
        )}: ${formatCssValue(property)};\r`;
      });

      str += `}\r`;
      return str;
    }

    // If providing several theme objects, map through each one creating a
    // classname for each.
    if (themeKeys.length > 1) {
      themeKeys.forEach((theme) => {
        str += `.tw-root--theme-${theme} {\r`;

        allProperties.forEach((property) => {
          if (property.attributes.type === theme) {
            str += `  --${formatThemePropertyName(
              property.name,
              theme,
            )}: ${formatCssValue(property)};\r`;
          }
        });

        str += `}\r`;
      });

      return str;
    }
  },
};

/**
 * Returns color properties as SCSS variables.
 */
export const scssColorsCustomFormat = {
  name: "scss/colors",
  formatter: ({ allProperties }: Dictionary) => {
    let str = `// stylelint-disable\r`;
    str += `//\r`;
    str += `// Do not edit directly; this file is generated automatically.\r`;
    str += `// --------------------------------------------------------\r`;
    str += `\r`;

    allProperties.forEach((property) => {
      str += `$${property.name.replace(/color-/, "")}: ${property.value};\r`;
    });

    return str;
  },
};

/**
 * Returns theme tokens as SCSS maps.
 */
export const scssThemesCustomFormat = {
  name: "scss/themes",
  formatter: ({ allProperties, properties }: Dictionary) => {
    const themeKeys = Object.keys(properties.themes);

    let str = `// stylelint-disable\r`;
    str += `//\r`;
    str += `// Do not edit directly; this file is generated automatically.\r`;
    str += `// --------------------------------------------------------\r`;
    str += `\r`;

    themeKeys.forEach((theme) => {
      str += `$theme-${theme}: (\r`;

      const themeProperties = allProperties.filter(
        (t) => t.attributes.type === theme,
      );

      themeProperties.forEach((property, index) => {
        str += `  '${property.path.slice(2).join("-")}': (${property.value})${
          index < themeProperties.length - 1 ? "," : ""
        }\r`;
      });

      str += `);\r`;
      str += `\r`;
    });

    str += `$themes: (\r`;

    themeKeys.forEach((theme, index) => {
      str += `  '${theme}': $theme-${theme}${
        index < themeKeys.length - 1 ? "," : ""
      }\r`;
    });

    str += `);\r`;

    return str;
  },
};

/**
 * Returns color properties in Swift.
 */
export const iosSwiftColorsCustomFormat = {
  name: "ios/swift_colors",
  formatter: ({ allProperties }: Dictionary) => {
    let str = `// Do not edit directly; this file is generated automatically.\n`;
    str += `\n`;
    str += `import UIKit\n`;
    str += `\n`;
    str += `public extension UIColor {\n`;

    allProperties.sort(sortByPropertyName).forEach((property) => {
      if (typeof property.value !== "string") {
        return;
      }
      str += `    @objc static let ${fixPropertyName(
        property.name,
      )} = ${fixUiColor(property.value)}\n`;
    });

    str += `}\n`;

    return str;
  },
};

/**
 * Returns theme tokens in iOS protocol.
 */
export const iosThemeProtocolCustomFormat = {
  name: "ios/theme_protocol",
  formatter: ({ allProperties, properties }: Dictionary) => {
    let str = `// Do not edit directly; this file is generated automatically.\n`;
    str += `\n`;
    str += `@import UIKit;\n`;
    str += `\n`;
    str += `NS_ASSUME_NONNULL_BEGIN\n`;
    str += `\n`;
    str += `@protocol TWCoreUITheme <NSObject>\n`;
    str += `\n`;

    allProperties
      .sort(sortByPropertyName)
      .filter((t) => !hasCssKeywordValue(t))
      .forEach(({ path }) => {
        if (path[1] === Object.keys(properties.themes)[0]) {
          str += `/// ${formatRawPropertyNameFromPath(path)}\n`;
          str += `@property (nonatomic, readonly) UIColor *${formatIOSPropertyNameFromPath(
            path,
          )};\n`;
          str += `\n`;
        }
      });

    str += `@end\n`;
    str += `\n`;
    str += `NS_ASSUME_NONNULL_END\n`;

    return str;
  },
};

/**
 * Returns theme tokens in iOS Swift format.
 */
export const iosSwiftThemesCustomFormat = {
  name: "ios/swift_themes",
  formatter: ({ allProperties, properties }: Dictionary) => {
    let str = `// Do not edit directly; this file is generated automatically.\n`;
    str += `\n`;
    str += `import UIKit\n`;
    str += `\n`;

    Object.keys(properties.themes).forEach((themeKey) => {
      str += `final class CoreUI${capitalize(themeKey)}Theme: TW${capitalize(
        themeKey,
      )}AppTheme, TWCoreUITheme, TWThemeProtocol {\n`;

      allProperties
        .sort(sortByPropertyName)
        .filter((t) => !hasCssKeywordValue(t))
        .forEach((property) => {
          const path = property.path;

          if (path[1] === themeKey) {
            str += `    var ${formatIOSPropertyNameFromPath(
              path,
            )}: UIColor { return ${formatIOSValue(property)} }\n`;
          }
        });
      str += `}\n`;
    });

    return str;
  },
};
