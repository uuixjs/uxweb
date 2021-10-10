import { css, InterpolationFunction, ThemeProps } from "styled-components";
import { staticTokenRule } from "../../styled-utils";
import { ThemeContextValue } from "../../themed-styled-components";

export enum BorderRadius {
  None = "border-radius-none",
  Small = "border-radius-small",
  Medium = "border-radius-medium",
  Large = "border-radius-large",
  Rounded = "border-radius-rounded",
}

export interface BorderRadiusValues {
  topLeft?: BorderRadius;
  topRight?: BorderRadius;
  bottomRight?: BorderRadius;
  bottomLeft?: BorderRadius;
}

type InterpolationFn<P> = InterpolationFunction<
  P & ThemeProps<ThemeContextValue>
>;
export type BorderRadiusMixinProps = {
  borderRadius?: BorderRadius | BorderRadiusValues;
};
export function getBorderRadiusStyles<P extends {}>(
  opts: BorderRadiusMixinProps,
): InterpolationFn<P> {
  if (typeof opts.borderRadius === "string") {
    const borderRadius: BorderRadius = opts.borderRadius;
    return () => css`
      border-radius: ${staticTokenRule(borderRadius)};
    `;
  } else if (typeof opts.borderRadius === "object") {
    const borderRadius: BorderRadiusValues = opts.borderRadius;
    return () => css`
      border-top-left-radius: ${borderRadius.topLeft &&
      staticTokenRule(borderRadius.topLeft)};
      border-top-right-radius: ${borderRadius.topRight &&
      staticTokenRule(borderRadius.topRight)};
      border-bottom-right-radius: ${borderRadius.bottomRight &&
      staticTokenRule(borderRadius.bottomRight)};
      border-bottom-left-radius: ${borderRadius.bottomLeft &&
      staticTokenRule(borderRadius.bottomLeft)};
    `;
  }

  return () => "";
}
