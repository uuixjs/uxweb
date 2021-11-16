import {
  CORE_UI_ROOT_DARK_THEME_SELECTOR,
  CORE_UI_ROOT_LIGHT_THEME_SELECTOR,
  createGlobalStyle,
} from "@uuixjs/uuixweb-lib";
import {
  DarkThemeMap,
  LightThemeMap,
  StaticTokenMap,
} from "lib/ui-tokens";

/* stylelint-disable */

export const ScGlobalCssVars = createGlobalStyle`
  :root {
    ${printCssVars(StaticTokenMap)}
  }

  .${CORE_UI_ROOT_LIGHT_THEME_SELECTOR} {
    ${printCssVars(LightThemeMap)}
  }

  .${CORE_UI_ROOT_DARK_THEME_SELECTOR} {
    ${printCssVars(DarkThemeMap)}
  }
`;

function printCssVars(input: Record<string, string | number>) {
  return Object.entries(input).map(([token, value]) => `--${token}: ${value};`);
}

ScGlobalCssVars.displayName = "ScGlobalCssVars";
