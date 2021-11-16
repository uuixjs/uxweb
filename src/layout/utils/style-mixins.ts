import {
  Background,
  BackgroundValue,
  BorderRadiusProps,
  Color,
  ColorValue,
  DisplayValue,
  Elevation,
  FontSize,
  FontWeight,
  FontWeightValue,
  ZIndex,
} from "../types";
import {
  BorderRadius,
  Margin,
  Padding,
  StaticTokenMap,
  ThemeContextValue,
  ThemedStyledProps,
  a11yHide,
  staticTokenRule,
  styleVariant,
  themeTokenRule
} from "@uuixjs/uuixweb-lib";

/**
 * !!! IMPORTANT NOTE ON PERFORMANCE !!!
 *
 * These functions get used a lot and must be performant.
 *
 * The way to make styled-components have the fastest possible render time is
 * to provide it with only strings and no interpolation values like functions,
 * CSS objects, or arrays. Therefore, all of these functions return strings.
 *
 * To maximize performance (in critical components like <Layout>) an additional
 * strategy is to call these functions directly and use the return value instead of
 * passing the functions to styled-components as interpolation values.
 */

type StringOnlyStyleVariant<P> = (props: ThemedStyledProps<P, ThemeContextValue>) => string;

/**
 * Color
 */

export interface ColorProps {
  color?: ColorValue;
}

export const getColorStyles = styleVariant<ColorProps, "color">("color", {
  [Color.Base]: (p) => `color: ${themeTokenRule("color-text-base")(p)} !important;`,
  [Color.Alt]: (p) => `color: ${themeTokenRule("color-text-alt")(p)} !important;`,
  [Color.Alt2]: (p) => `color: ${themeTokenRule("color-text-alt-2")(p)} !important;`,
  [Color.Link]: (p) => `color: ${themeTokenRule("color-text-link")(p)} !important;`,
  [Color.Live]: (p) => `color: ${themeTokenRule("color-text-live")(p)} !important;`,
  [Color.Error]: (p) => `color: ${themeTokenRule("color-text-error")(p)} !important;`,
  [Color.Overlay]: (p) => `color: ${themeTokenRule("color-text-overlay")(p)} !important;`,
  [Color.OverlayAlt]: (p) => `color: ${themeTokenRule("color-text-overlay-alt")(p)} !important;`,
  [Color.Inherit]: `color: inherit !important;`,
}) as StringOnlyStyleVariant<ColorProps>;

/**
 * Background
 */

export interface BackgroundProps {
  background?: BackgroundValue;
}

export const getBackgroundStyles = styleVariant<BackgroundProps, "background">("background", {
  [Background.Base]: (p) => `background-color: ${themeTokenRule("color-background-base")(p)} !important;`,
  [Background.Alt]: (p) => `background-color: ${themeTokenRule("color-background-alt")(p)} !important;`,
  [Background.Alt2]: (p) => `background-color: ${themeTokenRule("color-background-alt-2")(p)} !important;`,
  [Background.Overlay]: (p) => `background-color: ${themeTokenRule("color-background-overlay")(p)} !important;`,
  [Background.Accent]: (p) => `background-color: ${themeTokenRule("color-background-accent")(p)} !important;`,
  [Background.AccentAlt]: (p) => `background-color: ${themeTokenRule("color-background-accent-alt")(p)} !important;`,
  [Background.AccentAlt2]: (p) => `background-color: ${themeTokenRule("color-background-accent-alt-2")(p)} !important;`,
  [Background.Inherit]: "background-color: inherit !important;",
}) as StringOnlyStyleVariant<BackgroundProps>;

/**
 * Display
 */

interface DisplayProps {
  display?: DisplayValue;
}

export const getDisplayStyles = (props: DisplayProps) => {
  if (props.display === "hide-accessible") {
    return a11yHide;
  }

  if (props.display) {
    return `display: ${props.display} !important;`;
  }
};

/**
 * Z-Index
 */

export interface ZIndexProps {
  zIndex?: ZIndex;
}

export const getZIndexStyles = styleVariant<ZIndexProps, "zIndex">("zIndex", {
  [ZIndex.Default]: (p) => `z-index: ${staticTokenRule("z-index-default")(p)} !important;`,
  [ZIndex.Above]: (p) => `z-index: ${staticTokenRule("z-index-above")(p)} !important;`,
  [ZIndex.Below]: (p) => `z-index: ${staticTokenRule("z-index-below")(p)} !important;`,
}) as StringOnlyStyleVariant<ZIndexProps>;

/**
 * FontWeight
 */

export interface FontWeightProps {
  fontWeight?: FontWeightValue;
}

export const getFontWeightStyles = styleVariant<FontWeightProps, "fontWeight">("fontWeight", {
  [FontWeight.Regular]: (p) => `font-weight: ${staticTokenRule("font-weight-normal")(p)} !important;`,
  [FontWeight.SemiBold]: (p) => `font-weight: ${staticTokenRule("font-weight-semibold")(p)} !important;`,
  [FontWeight.Bold]: (p) => `font-weight: ${staticTokenRule("font-weight-bold")(p)} !important;`,
}) as StringOnlyStyleVariant<FontWeightProps>;

/**
 * FontSize
 */

export interface FontSizeProps {
  fontSize?: FontSize;
}

export const getFontSizeStyles = styleVariant<FontSizeProps, "fontSize">("fontSize", {
  [FontSize.Size1]: (p) => `font-size: ${staticTokenRule("font-size-1")(p)} !important;`,
  [FontSize.Size2]: (p) => `font-size: ${staticTokenRule("font-size-2")(p)} !important;`,
  [FontSize.Size3]: (p) => `font-size: ${staticTokenRule("font-size-3")(p)} !important;`,
  [FontSize.Size4]: (p) => `font-size: ${staticTokenRule("font-size-4")(p)} !important;`,
  [FontSize.Size5]: (p) => `font-size: ${staticTokenRule("font-size-5")(p)} !important;`,
  [FontSize.Size6]: (p) => `font-size: ${staticTokenRule("font-size-6")(p)} !important;`,
  [FontSize.Size7]: (p) => `font-size: ${staticTokenRule("font-size-7")(p)} !important;`,
  [FontSize.Size8]: (p) => `font-size: ${staticTokenRule("font-size-8")(p)} !important;`,
}) as StringOnlyStyleVariant<FontSizeProps>;

/**
 * Elevation
 */

export interface ElevationProps {
  elevation?: Elevation;
}

export const getElevationStyles = (props: ThemedStyledProps<ElevationProps, ThemeContextValue>) => {
  if (props.elevation === 1) {
    return `box-shadow: ${themeTokenRule("shadow-elevation-1")(props)} !important;`;
  }
  if (props.elevation === 2) {
    return `box-shadow: ${themeTokenRule("shadow-elevation-2")(props)} !important;`;
  }
  if (props.elevation === 3) {
    return `box-shadow: ${themeTokenRule("shadow-elevation-3")(props)} !important;`;
  }
  if (props.elevation === 4) {
    return `box-shadow: ${themeTokenRule("shadow-elevation-4")(props)} !important;`;
  }
  if (props.elevation === 5) {
    return `box-shadow: ${themeTokenRule("shadow-elevation-5")(props)} !important;`;
  }
};

/**
 * Spacing.
 *
 * Returns a spacing values as a CSS string.
 *
 * This implementation returns string values in order to be faster with styled-components.
 *
 * @deprecated This is also implemented in the utils package.
 */
export function getSpacingStyles(value: Padding | Margin, cssPropName: string): string {
  if (typeof value === "object") {
    const cssStrings: string[] = [];

    if (value.x && (value.left || value.right)) {
      throw new Error("Cannot use `x` and `left` or `right` at the same time.");
    }

    if (value.y && (value.top || value.bottom)) {
      throw new Error("Cannot use `y` and `top` or `bottom` at the same time.");
    }

    if (value.bottom !== undefined) {
      if (value.bottom === 0.5) {
        cssStrings.push(`${cssPropName}-bottom: 0.5rem !important;`);
      } else if (value.bottom === "auto") {
        cssStrings.push(`${cssPropName}-bottom: auto !important;`);
      } else {
        cssStrings.push(`${cssPropName}-bottom: ${value.bottom}rem !important;`);
      }
    }

    if (value.left !== undefined) {
      if (value.left === 0.5) {
        cssStrings.push(`${cssPropName}-left: 0.5rem !important;`);
      } else if (value.left === "auto") {
        cssStrings.push(`${cssPropName}-left: auto !important;`);
      } else {
        cssStrings.push(`${cssPropName}-left: ${value.left}rem !important;`);
      }
    }

    if (value.right !== undefined) {
      if (value.right === 0.5) {
        cssStrings.push(`${cssPropName}-right: 0.5rem !important;`);
      } else if (value.right === "auto") {
        cssStrings.push(`${cssPropName}-right: auto !important;`);
      } else {
        cssStrings.push(`${cssPropName}-right: ${value.right}rem !important;`);
      }
    }

    if (value.top !== undefined) {
      if (value.top === 0.5) {
        cssStrings.push(`${cssPropName}-top: 0.5rem !important;`);
      } else if (value.top === "auto") {
        cssStrings.push(`${cssPropName}-top: auto !important;`);
      } else {
        cssStrings.push(`${cssPropName}-top: ${value.top}rem !important;`);
      }
    }

    if (value.x !== undefined) {
      if (value.x === 0.5) {
        cssStrings.push(`${cssPropName}-left: 0.5rem !important;`);
        cssStrings.push(`${cssPropName}-right: 0.5rem !important;`);
      } else if (value.x === "auto") {
        cssStrings.push(`${cssPropName}-left: auto !important;`);
        cssStrings.push(`${cssPropName}-right: auto !important;`);
      } else {
        cssStrings.push(`${cssPropName}-left: ${value.x}rem !important;`);
        cssStrings.push(`${cssPropName}-right: ${value.x}rem !important;`);
      }
    }

    if (value.y !== undefined) {
      if (value.y === 0.5) {
        cssStrings.push(`${cssPropName}-top: 0.5rem !important;`);
        cssStrings.push(`${cssPropName}-bottom: 0.5rem !important;`);
      } else if (value.y === "auto") {
        cssStrings.push(`${cssPropName}-top: auto !important;`);
        cssStrings.push(`${cssPropName}-bottom: auto !important;`);
      } else {
        cssStrings.push(`${cssPropName}-top: ${value.y}rem !important;`);
        cssStrings.push(`${cssPropName}-bottom: ${value.y}rem !important;`);
      }
    }

    return cssStrings.join(" ");
  }

  if (value === 0.5) {
    return `${cssPropName}: 0.5rem !important;`;
  }

  if (value === "auto") {
    return `${cssPropName}: auto !important;`;
  }

  // Handles typeof "number"
  return `${cssPropName}: ${value}rem !important;`;
}

/**
 * BorderRadius.
 *
 * Returns a border radius values as a CSS string.
 *
 * This implementation returns string values in order to be faster with styled-components.
 *
 * @deprecated This is also implemented in the utils package. */
export function getBorderRadiusStyles(value: BorderRadiusProps | undefined): string | void {
  if (typeof value === "string") {
    return `border-radius: ${StaticTokenMap[value]} !important;`;
  }

  if (!value) {
    return;
  }

  let cssString = "";

  Object.entries(value).forEach(([key, size]: [string, BorderRadius]) => {
    if (key === "topLeft") {
      cssString += `border-top-left-radius: ${StaticTokenMap[size]} !important;`;
    } else if (key === "topRight") {
      cssString += `border-top-right-radius: ${StaticTokenMap[size]} !important;`;
    } else if (key === "bottomRight") {
      cssString += `border-bottom-right-radius: ${StaticTokenMap[size]} !important;`;
    } else if (key === "bottomLeft") {
      cssString += `border-bottom-left-radius: ${StaticTokenMap[size]} !important;`;
    }
  });

  return cssString;
}
