import { useEffect, useState } from "react";

import { Theme } from "lib/ui-tokens";
import { prefersDarkMode } from "lib/ui-utils";

export type ThemeOption = Theme | "system";

/**
 * Resolves "system" theme to either "light" or "dark"
 * and updates using a Media Query listener.
 */
export function useSystemThemeOptionHandler(themeOption: ThemeOption): Theme {
  const [theme, setTheme] = useState<Theme>(getInitialTheme(themeOption));

  useEffect(() => {
    // Standard theme choice of light or dark:
    if (themeOption !== "system") {
      setTheme(themeOption);
      return;
    }

    // Skip event listener when not in browser context
    if (typeof window === "undefined" || window.matchMedia === undefined) {
      return;
    }

    // System theme w/ media query listener:
    const setThemeFromMq = (e: MediaQueryList | MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    setThemeFromMq(query);

    // Older browsers which do not support "addEventListener" should skip this and will just not auto-update when system theme changes
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", setThemeFromMq);
      return () => query.removeEventListener("change", setThemeFromMq);
    }
  }, [themeOption]);

  return theme;
}

function getInitialTheme(theme: ThemeOption): Theme {
  if (theme === "system") {
    if (prefersDarkMode()) {
      return "dark";
    } else {
      return "light";
    }
  }

  return theme;
}
