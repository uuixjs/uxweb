import { Background, Color, Layout, LayoutProps } from "../layout";
import {
  CORE_UI_ROOT_DARK_THEME_SELECTOR,
  CORE_UI_ROOT_LIGHT_THEME_SELECTOR,
  ThemeProvider,
} from "@uuixjs/uuixweb-lib";
import { ThemeOption, useSystemThemeOptionHandler } from "./utils";

import { FC } from "react";
import { Theme } from "@uuixjs/uuixweb-lib";

export interface ThemeRegionProps extends Omit<LayoutProps, "className"> {
  theme: ThemeOption;
  /** Specify true or false to override browser detection for CSS variable support. Warning: Changing this can have un-intended side-effects! */
  cssVars?: boolean;
  /** Omit rendering of hover CSS rules */
  disableHoverCSS?: boolean;
}

/**
 * ThemeRegion can be used to set the theme within a region on the page.
 *
 * It renders a theme context provider to nested Core UI components.
 */
export const ThemeRegion: FC<ThemeRegionProps> = ({
  theme: themeOption,
  cssVars,
  disableHoverCSS,
  ...layoutProps
}) => {
  const currentTheme = useSystemThemeOptionHandler(themeOption);

  return (
    <ThemeProvider
      theme={currentTheme}
      cssVars={cssVars}
      disableHoverCSS={disableHoverCSS}
    >
      <Layout
        className={getThemeClass(currentTheme)}
        background={Background.Base}
        color={Color.Base}
        {...layoutProps}
      />
    </ThemeProvider>
  );
};

ThemeRegion.displayName = "ThemeRegion";

function getThemeClass(theme: Theme): string {
  if (theme === "dark") {
    return CORE_UI_ROOT_DARK_THEME_SELECTOR;
  } else if (theme === "light") {
    return CORE_UI_ROOT_LIGHT_THEME_SELECTOR;
  }

  return "";
}
