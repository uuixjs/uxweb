import { LineHeight, LineHeightValue } from "../types";
import { ThemeContextValue, ThemedStyledProps, staticTokenRule, styleVariant } from "@uuixjs/uuixweb-lib";

type StringOnlyStyleVariant<P> = (props: ThemedStyledProps<P, ThemeContextValue>) => string;

/**
 * Line Height
 */

export interface LineHeightProps {
  lineHeight?: LineHeightValue;
}

export const getLineHeightStyles = styleVariant<LineHeightProps, "lineHeight">("lineHeight", {
  [LineHeight.Body]: (p) => `line-height: ${staticTokenRule("line-height-body")(p)} !important;`,
  [LineHeight.Heading]: (p) => `line-height: ${staticTokenRule("line-height-heading")(p)} !important;`,
}) as StringOnlyStyleVariant<LineHeightProps>;
