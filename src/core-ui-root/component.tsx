import "focus-visible";

import {
  CORE_UI_ROOT_DARK_THEME_SELECTOR,
  CORE_UI_ROOT_HOVER_SELECTOR,
  CORE_UI_ROOT_LIGHT_THEME_SELECTOR,
  ThemeProvider,
} from "@uuixjs/uuixweb-lib";
import { FC, ReactNode, useLayoutEffect } from "react";
import {
  ThemeOption,
  useSystemThemeOptionHandler,
} from "../theme-region/utils";

import { ReactModalRoot } from "../dialogs";
import { Theme } from "@uuixjs/uuixweb-lib";

export interface CoreUIRootProps {
  /**
   * CoreUIRoot must wrap the entire page in order for Context to be available
   * to all Core UI components. */
  children: ReactNode;
  /** Omit rendering of hover CSS rules */
  disableHoverCSS?: boolean;
  /**
   * @experimental
   * Pass the id of the app's root element to enable proper aria interactions
   * for modals and other dialogs.
   */
  appRootElementId?: string;
  /** Specify theme choice currently selected by the user */
  theme?: ThemeOption;
  /**
   * Specify true or false to enable or disable css variables. When undefined,
   * will check for browser support of CSS variables. Apps that use SSR must
   * set this property to ensure proper rendering of themes.
   */
  cssVars?: boolean;
}

export const CoreUIRoot: FC<CoreUIRootProps> = ({
  children,
  disableHoverCSS,
  appRootElementId,
  theme: themeOption = "system",
  cssVars,
}) => {
  const currentTheme = useSystemThemeOptionHandler(themeOption);
  useRootThemeClass(currentTheme);
  useRootHoverClass(disableHoverCSS);
  return (
    <ThemeProvider
      theme={currentTheme}
      cssVars={cssVars}
      disableHoverCSS={disableHoverCSS}
    >
      <ReactModalRoot appRootElementId={appRootElementId} children={children} />
    </ThemeProvider>
  );
};

CoreUIRoot.displayName = "CoreUIRoot";

function useRootThemeClass(theme: Theme): void {
  /** useLayoutEffect ensures synchronously applying class names to prevent FOUC */
  useLayoutEffect(() => {
    const { documentElement } = document;
    if (theme === "dark") {
      documentElement.classList.add(CORE_UI_ROOT_DARK_THEME_SELECTOR);
      documentElement.classList.remove(CORE_UI_ROOT_LIGHT_THEME_SELECTOR);
    } else if (theme === "light") {
      documentElement.classList.add(CORE_UI_ROOT_LIGHT_THEME_SELECTOR);
      documentElement.classList.remove(CORE_UI_ROOT_DARK_THEME_SELECTOR);
    }
  }, [theme]);
}

function useRootHoverClass(disable?: boolean) {
  /** useLayoutEffect ensures synchronously applying class names to prevent FOUC */
  useLayoutEffect(() => {
    if (disable) {
      return;
    }

    document.documentElement.classList.add(CORE_UI_ROOT_HOVER_SELECTOR);
  }, [disable]);
}
