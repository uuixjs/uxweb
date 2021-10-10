import { StaticToken, StaticTokenMap } from "lib/ui-tokens";

import { CSSObject } from "lib";

interface BreakpointPropObject<C> {
  default?: C;
  xs?: C;
  sm?: C;
  md?: C;
  lg?: C;
  xl?: C;
  xxl?: C;
}

export function getBreakpointCss<T>(
  propValue: T | BreakpointPropObject<T> | undefined,
  callback: (value: T) => CSSObject,
): CSSObject {
  if (typeof propValue === "string" || typeof propValue === "number") {
    return callback(propValue);
  }

  if (typeof propValue === "object") {
    const css: CSSObject = {};
    Object.entries(propValue).forEach(([breakpointKey, breakpointValue]) => {
      css[getBreakpointWidthRule(breakpointKey)] = callback(breakpointValue);
    });
    return css;
  }

  // Un-handled type gets no css
  return {};
}

const breakpointTokenMap: Record<string, StaticToken> = {
  xs: "break-xs",
  sm: "break-sm",
  md: "break-md",
  lg: "break-lg",
  xl: "break-xl",
  xxl: "break-xxl",
};

const getBreakpointWidthRule = (
  breakpoint: "default" | keyof typeof breakpointTokenMap,
): string => {
  if (breakpoint === "default") {
    return "&";
  }

  return `@media screen and (min-width: ${
    StaticTokenMap[breakpointTokenMap[breakpoint]]
  })`;
};
