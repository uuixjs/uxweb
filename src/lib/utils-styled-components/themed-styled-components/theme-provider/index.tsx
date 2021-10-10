import { FC, useMemo } from "react";
import { ThemeContextValue, useTheme } from "../theme-context";

import { Theme } from "lib/ui-tokens";
// eslint-disable-next-line no-restricted-imports
import { ThemeContext } from "styled-components";

export interface ThemeProviderProps {
  theme?: Theme;
  /** Specify true or false to override browser detection for CSS variable support */
  cssVars?: boolean;
  /** Omit rendering of hover CSS rules */
  disableHoverCSS?: boolean;
  /** Override the colors for theme tokens */
  tokenOverrides?: ThemeContextValue["tokenOverrides"];
}

/**
 * Configure and render a theme context provider, with Core UI defaults.
 *
 * Only for internal use within Core UI. This component alone is not enough to
 * switch the current theme! Root class names and CSS variables do not get
 * updated by this. It ONLY handles setting context value.
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({
  theme,
  cssVars,
  disableHoverCSS,
  tokenOverrides,
  children,
}) => {
  const parentThemeCtx = useTheme();

  const themeCtx = useMemo((): ThemeContextValue => {
    const ctx: ThemeContextValue = {
      ...parentThemeCtx,
    };

    if (theme !== undefined) {
      ctx.name = theme;
    }

    if (cssVars !== undefined) {
      ctx.cssVars = cssVars;
    }

    if (disableHoverCSS !== undefined) {
      ctx.disableHoverCSS = disableHoverCSS;
    }

    if (tokenOverrides !== undefined) {
      ctx.tokenOverrides = Object.assign(
        ctx.tokenOverrides || {},
        tokenOverrides,
      );
    }

    return ctx;
  }, [theme, cssVars, disableHoverCSS, tokenOverrides, parentThemeCtx]);

  return <ThemeContext.Provider value={themeCtx} children={children} />;
};
