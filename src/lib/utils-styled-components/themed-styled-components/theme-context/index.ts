import { StaticToken, Theme, ThemeToken } from "lib/ui-tokens";
import { prefersDarkMode, supportsCssVars } from "../../supports";
import { useContext, useMemo } from "react";

// eslint-disable-next-line no-restricted-imports
import { ThemeContext } from "styled-components";

/**
 * The Core UI theme context value for use with the
 * styled-components ThemeProvider and consumer
 */
export interface ThemeContextValue {
  name: Theme;
  cssVars: boolean;
  disableHoverCSS: boolean;
  tokenOverrides?: {
    [key in ThemeToken | StaticToken]?: string;
  };
}

export const getDefaultThemeContextValue = (): ThemeContextValue => ({
  name: getDefaultTheme(),
  cssVars: supportsCssVars(),
  disableHoverCSS: false,
});

function getDefaultTheme(): Theme {
  if (typeof window === "undefined" || window.matchMedia === undefined) {
    return "dark";
  }

  return prefersDarkMode() ? "dark" : "light";
}

/**
 * styled-components offers no way to set a default context value,
 * yet also defaults to an empty object when setting the theme prop
 * on components if no ThemeProvider is present.
 *
 * See https://github.com/styled-components/styled-components/issues/2960
 */
export function getDefaultThemeIfEmpty(theme: ThemeContextValue | {} = {}) {
  return Object.keys(theme).length === 0
    ? getDefaultThemeContextValue()
    : (theme as ThemeContextValue);
}

/**
 * Hook to get the current theme context value.
 *
 * Returns a default value if one is not set, because
 * styled-components doesn't expose a way to set the default
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  const defaultCtx = useMemo(getDefaultThemeContextValue, []);

  return ctx || defaultCtx;
}
