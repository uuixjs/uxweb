import {
  conditionalStyles,
  PropClassNameMap,
  toCssProp,
} from "../../layout/utils/common";
import {
  LayoutCssBreakpointProps,
  LayoutCssProps,
  propMap,
} from "../../layout/utils/layout-props";
import {
  LineHeight,
  LineHeightValue,
  Lines,
  TextDecoration,
  TextDecorationValue,
  TextTransform,
  TextTransformValue,
  WhiteSpace,
  WhiteSpaceValue,
  WordBreak,
  WordBreakValue,
} from "../types";
import { getLineHeightStyles } from "./style-mixins";

/**
 * The type interface here allows only certain props from "Layout" to be
 * accepted by "CoreText", although the prop map below does actually implement
 * handlers for every prop from "Layout"
 */

export type CoreTextLayoutBreakpointProps = Pick<
  LayoutCssBreakpointProps,
  "fontSize" | "fontWeight"
>;

export type CoreTextLayoutProps = Pick<
  LayoutCssProps,
  "color" | "verticalAlign" | "ellipsis"
> &
  CoreTextLayoutBreakpointProps & {
    breakpointExtraSmall?: CoreTextLayoutBreakpointProps;
    breakpointSmall?: CoreTextLayoutBreakpointProps;
    breakpointMedium?: CoreTextLayoutBreakpointProps;
    breakpointLarge?: CoreTextLayoutBreakpointProps;
    breakpointExtraLarge?: CoreTextLayoutBreakpointProps;
    breakpointExtraExtraLarge?: CoreTextLayoutBreakpointProps;
  };

export interface CoreTextCssProps extends CoreTextLayoutProps {
  decoration?: TextDecoration | TextDecorationValue;
  italic?: boolean;
  lineHeight?: LineHeight | LineHeightValue;
  lines?: Lines;
  tabularNums?: boolean;
  transform?: TextTransform | TextTransformValue;
  whiteSpace?: WhiteSpace | WhiteSpaceValue;
  wordBreak?: WordBreak | WordBreakValue;
}

export const textPropMap: PropClassNameMap<Required<CoreTextCssProps>> = {
  ...propMap,
  decoration: toCssProp("text-decoration"),
  italic: conditionalStyles("font-style: italic !important;"),
  lineHeight: getLineHeightStyles,
  lines: (props) => {
    if (props.lines === 2) {
      // This CSS must override the CSS which will be set by Layout for the ellipsis prop.
      return `
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: normal !important;

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      `;
    }
  },
  tabularNums: conditionalStyles("font-variant-numeric: tabular-nums;"),
  transform: toCssProp("text-transform"),
  whiteSpace: toCssProp("white-space"),
  wordBreak: toCssProp("word-break"),
};
