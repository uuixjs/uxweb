import { InterpolationFunction, ThemeProps } from "styled-components";
import { StaticToken, StaticTokenMap } from "lib/ui-tokens";

import { ThemeContextValue } from "../../themed-styled-components";

/**
 * Utility for generating a CSS value based on theme context.
 */
export function staticTokenRule(
  staticToken: StaticToken,
): InterpolationFunction<ThemeProps<ThemeContextValue>> {
  /**
   * Dynamic output based on theme context.
   *
   * Theme Context may be undefined if the app is not wrapped in a theme provider!
   */
  return ({ theme }: Partial<ThemeProps<ThemeContextValue>>) => {
    if (theme && theme.cssVars) {
      return `var(--${staticToken})`;
    }

    return StaticTokenMap[staticToken];
  };
}
