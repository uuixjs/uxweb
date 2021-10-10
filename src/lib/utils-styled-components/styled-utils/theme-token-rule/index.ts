import { DarkThemeMap, LightThemeMap, ThemeToken } from "lib/ui-tokens";
import { InterpolationFunction, ThemeProps } from "styled-components";

import { ThemeContextValue } from "../../themed-styled-components";
import { getDefaultThemeIfEmpty } from "../../themed-styled-components/theme-context";

/**
 * Utility for generating a CSS value based on theme context.
 */
export function themeTokenRule(
  themeToken: ThemeToken,
): InterpolationFunction<ThemeProps<ThemeContextValue>> {
  return ({ theme: providedTheme }: { theme: ThemeContextValue | {} }) => {
    const theme = getDefaultThemeIfEmpty(providedTheme);

    if (theme.cssVars) {
      return `var(--${themeToken})`;
    }

    if (theme.tokenOverrides && theme.tokenOverrides[themeToken]) {
      return theme.tokenOverrides[themeToken];
    }

    if (theme.name === "light") {
      return LightThemeMap[themeToken];
    }

    return DarkThemeMap[themeToken];
  };
}
