import {
  AlignContent,
  AlignContentValue,
  AlignItems,
  AlignItemsValue,
  AlignSelf,
  AlignSelfValue,
  Background,
  BackgroundValue,
  BorderRadiusProps,
  Color,
  ColorValue,
  Cursor,
  CursorValue,
  Display,
  DisplayValue,
  Elevation,
  FlexDirection,
  FlexDirectionValue,
  FlexValue,
  FlexWrap,
  FlexWrapValue,
  FontSize,
  FontWeight,
  FontWeightValue,
  JustifyContent,
  JustifyContentValue,
  Overflow,
  OverflowValue,
  Position,
  PositionValue,
  Resize,
  ResizeValue,
  TextAlign,
  TextAlignValue,
  VerticalAlign,
  VerticalAlignValue,
  Visibility,
  VisibilityValue,
  ZIndex,
} from "../types";
import {
  Margin,
  Padding,
  staticTokenRule,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";
import {
  PropClassNameMap,
  conditionalStyles,
  getLayoutStyles,
  toCssProp,
} from "./common";
import {
  getBackgroundStyles,
  getBorderRadiusStyles,
  getColorStyles,
  getDisplayStyles,
  getElevationStyles,
  getFontSizeStyles,
  getFontWeightStyles,
  getSpacingStyles,
  getZIndexStyles,
} from "./style-mixins";

import { ARIARole } from "aria-query";
import { ReactNode } from "react";
import { StandardLonghandProperties } from "csstype";
import { StaticTokenMap } from "@uuixjs/uuixweb-lib";

export interface LayoutCssBreakpointProps {
  alignContent?: AlignContent | AlignContentValue;
  alignItems?: AlignItems | AlignItemsValue;
  alignSelf?: AlignSelf | AlignSelfValue;
  display?: Display | DisplayValue;
  flexDirection?: FlexDirection | FlexDirectionValue;
  flexGrow?: FlexValue;
  flexOrder?: FlexValue;
  flexShrink?: FlexValue;
  flexWrap?: FlexWrap | FlexWrapValue;
  fontSize?: FontSize;
  fontWeight?: FontWeight | FontWeightValue;
  height?: StandardLonghandProperties["height"];
  justifyContent?: JustifyContent | JustifyContentValue;
  margin?: Margin;
  maxHeight?: StandardLonghandProperties["maxHeight"];
  maxWidth?: StandardLonghandProperties["maxWidth"];
  minHeight?: StandardLonghandProperties["minHeight"];
  minWidth?: StandardLonghandProperties["minWidth"];
  padding?: Padding;
  position?: Position | PositionValue;
  textAlign?: TextAlign | TextAlignValue;
  visibility?: Visibility | VisibilityValue;
  width?: StandardLonghandProperties["width"];
}

export interface LayoutCssProps extends LayoutCssBreakpointProps {
  attachBottom?: boolean;
  attachLeft?: boolean;
  attachRight?: boolean;
  attachTop?: boolean;
  background?: Background | BackgroundValue;
  border?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderMarked?: boolean;
  borderRadius?: BorderRadiusProps;
  borderRight?: boolean;
  borderTop?: boolean;
  color?: Color | ColorValue;
  cursor?: Cursor | CursorValue;
  elevation?: Elevation;
  ellipsis?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
  overflow?: Overflow | OverflowValue;
  resize?: Resize | ResizeValue;
  verticalAlign?: VerticalAlign | VerticalAlignValue;
  zIndex?: ZIndex;
  breakpointExtraSmall?: LayoutCssBreakpointProps;
  breakpointSmall?: LayoutCssBreakpointProps;
  breakpointMedium?: LayoutCssBreakpointProps;
  breakpointLarge?: LayoutCssBreakpointProps;
  breakpointExtraLarge?: LayoutCssBreakpointProps;
  breakpointExtraExtraLarge?: LayoutCssBreakpointProps;
}

export interface LayoutNonCssProps {
  children?: ReactNode;
  className?: string;
  role?: ARIARole;
}

export interface CommonLayoutProps extends LayoutCssProps, LayoutNonCssProps {}

/**
 * Breakpoint Props
 */
export const bpPropMap: PropClassNameMap<Required<LayoutCssBreakpointProps>> = {
  alignContent: toCssProp("align-content"),
  alignItems: toCssProp("align-items"),
  alignSelf: toCssProp("align-self"),
  display: getDisplayStyles,
  flexDirection: toCssProp("flex-direction"),
  flexGrow: toCssProp("flex-grow"),
  flexOrder: toCssProp("order"),
  flexShrink: toCssProp("flex-shrink"),
  flexWrap: toCssProp("flex-wrap"),
  fontSize: getFontSizeStyles,
  fontWeight: getFontWeightStyles,
  justifyContent: toCssProp("justify-content"),
  margin: (_, v) => getSpacingStyles(v, "margin"),
  padding: (_, v) => getSpacingStyles(v, "padding"),
  position: toCssProp("position"),
  textAlign: toCssProp("text-align"),
  visibility: toCssProp("visibility"),
  width: toCssProp("width"),
  minWidth: toCssProp("min-width"),
  maxWidth: toCssProp("max-width"),
  height: toCssProp("height"),
  minHeight: toCssProp("min-height"),
  maxHeight: toCssProp("max-height"),
};

/**
 * Standard Props
 */
export const propMap: PropClassNameMap<Required<LayoutCssProps>> = {
  ...bpPropMap,
  attachBottom: conditionalStyles("bottom: 0 !important;"),
  attachLeft: conditionalStyles("left: 0 !important;"),
  attachRight: conditionalStyles("right: 0 !important;"),
  attachTop: conditionalStyles("top: 0 !important;"),
  borderRadius: (_, v) => getBorderRadiusStyles(v),
  color: getColorStyles,
  cursor: toCssProp("cursor"),
  elevation: getElevationStyles,
  // Ellipsis omits `!important` because it needs to overridden by CoreText two-line ellipsis CSS
  ellipsis: conditionalStyles(`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `),
  fullHeight: (props) => {
    if (props.fullHeight && !props.height) {
      return "height: 100% !important;";
    }
    return;
  },
  fullWidth: (props) => {
    if (props.fullWidth && !props.width) {
      return "width: 100% !important;";
    }
    return;
  },
  overflow: toCssProp("overflow"),
  resize: toCssProp("resize"),
  verticalAlign: toCssProp("vertical-align"),
  zIndex: getZIndexStyles,
  background: (props) => {
    let cssValue = getBackgroundStyles(props);
    if (props.background === Background.Overlay && !props.color) {
      cssValue += `color: ${themeTokenRule("color-text-overlay")(
        props,
      )} !important;`;
    }
    return cssValue;
  },
  borderTop: (props, v) => {
    if (props.border) {
      return;
    }
    if (props.borderMarked) {
      return;
    }
    if (v === false) {
      return;
    }
    const width = staticTokenRule("border-width-default")(props);
    const color = themeTokenRule("color-border-base")(props);
    return `border-top: ${width} solid ${color} !important;`;
  },
  borderRight: (props, v) => {
    if (props.border) {
      return;
    }
    if (props.borderMarked) {
      return;
    }
    if (v === false) {
      return;
    }
    const width = staticTokenRule("border-width-default")(props);
    const color = themeTokenRule("color-border-base")(props);
    return `border-right: ${width} solid ${color} !important;`;
  },
  borderBottom: (props, v) => {
    if (props.border) {
      return;
    }
    if (props.borderMarked) {
      return;
    }
    if (v === false) {
      return;
    }
    const width = staticTokenRule("border-width-default")(props);
    const color = themeTokenRule("color-border-base")(props);
    return `border-bottom: ${width} solid ${color} !important;`;
  },
  borderLeft: (props, v) => {
    if (props.border) {
      return;
    }
    if (props.borderMarked) {
      return;
    }
    if (v === false) {
      return;
    }
    const width = staticTokenRule("border-width-default")(props);
    const color = themeTokenRule("color-border-base")(props);
    return `border-left: ${width} solid ${color} !important;`;
  },
  border: (props, v) => {
    if (!props.borderMarked && v) {
      const width = staticTokenRule("border-width-default")(props);
      const color = themeTokenRule("color-border-base")(props);
      return `
        border-top: ${width} solid ${color} !important;
        border-right: ${width} solid ${color} !important;
        border-bottom: ${width} solid ${color} !important;
        border-left: ${width} solid ${color} !important;
      `;
    }

    return;
  },
  borderMarked: (props, v) => {
    if (v) {
      const widthMarked = staticTokenRule("border-width-marked")(props);
      const colorMarked = themeTokenRule("color-border-brand")(props);
      const width = staticTokenRule("border-width-default")(props);
      const color = themeTokenRule("color-border-base")(props);
      return `
        border-top: ${width} solid ${color} !important;
        border-right: ${width} solid ${color} !important;
        border-bottom: ${width} solid ${color} !important;
        border-left: ${widthMarked} solid ${colorMarked} !important;
      `;
    }
    return;
  },
  breakpointExtraSmall: (props, bpProps) =>
    `@media screen and (min-width:${StaticTokenMap["break-xs"]}){
      ${getLayoutStyles({ ...bpProps, theme: props.theme }, bpPropMap)}
    }
  `,
  breakpointSmall: (props, bpProps) =>
    `@media screen and (min-width:${StaticTokenMap["break-sm"]}){
    ${getLayoutStyles({ ...bpProps, theme: props.theme }, bpPropMap)}
  }
`,
  breakpointMedium: (props, bpProps) =>
    `@media screen and (min-width:${StaticTokenMap["break-md"]}){
    ${getLayoutStyles({ ...bpProps, theme: props.theme }, bpPropMap)}
  }
`,
  breakpointLarge: (props, bpProps) =>
    `@media screen and (min-width:${StaticTokenMap["break-lg"]}){
    ${getLayoutStyles({ ...bpProps, theme: props.theme }, bpPropMap)}
  }
`,
  breakpointExtraLarge: (props, bpProps) =>
    `@media screen and (min-width:${StaticTokenMap["break-xl"]}){
    ${getLayoutStyles({ ...bpProps, theme: props.theme }, bpPropMap)}
  }
`,
  breakpointExtraExtraLarge: (props, bpProps) =>
    `@media screen and (min-width:${StaticTokenMap["break-xxl"]}){
    ${getLayoutStyles({ ...bpProps, theme: props.theme }, bpPropMap)}
  }
`,
};
