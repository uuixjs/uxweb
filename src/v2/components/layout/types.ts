// from inject-layout
import { BorderRadius, BorderRadiusValues } from "lib/ui-utils";

/**
 * Many string values in this file must match the CSS values
 * for the corresponding property because they get used directly!
 */

export enum AlignContent {
  Start = "flex-start",
  End = "flex-end",
  Center = "center",
  Between = "space-between",
  Around = "space-around",
  Stretch = "stretch",
}

export type AlignContentValue =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "stretch"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum AlignItems {
  Start = "flex-start",
  End = "flex-end",
  Center = "center",
  Baseline = "baseline",
  Stretch = "stretch",
}

export type AlignItemsValue =
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum AlignSelf {
  Auto = "auto",
  Start = "flex-start",
  End = "flex-end",
  Center = "center",
  Baseline = "baseline",
  Stretch = "stretch",
}

export type AlignSelfValue =
  | "auto"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum Cursor {
  Default = "default",
  Auto = "auto",
  NotAllowed = "not-allowed",
  Pointer = "pointer",
}

export type CursorValue = "default" | "auto" | "not-allowed" | "pointer"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum Display {
  Block = "block",
  Flex = "flex",
  Initial = "initial",
  Inline = "inline",
  InlineBlock = "inline-block",
  InlineFlex = "inline-flex",
  Hide = "none",
  HideAccessible = "hide-accessible",
}

export type DisplayValue =
  | "block"
  | "flex"
  | "initial"
  | "inline"
  | "inline-block"
  | "inline-flex"
  | "none"
  | "hide-accessible"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum FlexDirection {
  Column = "column",
  ColumnReverse = "column-reverse",
  Row = "row",
  RowReverse = "row-reverse",
}

export type FlexDirectionValue =
  | "column"
  | "column-reverse"
  | "row"
  | "row-reverse"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum FlexWrap {
  Wrap = "wrap",
  NoWrap = "nowrap",
  WrapReverse = "wrap-reverse",
}

export type FlexWrapValue = "wrap" | "nowrap" | "wrap-reverse"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum JustifyContent {
  Start = "flex-start",
  End = "flex-end",
  Center = "center",
  Between = "space-between",
  Around = "space-around",
}

export type JustifyContentValue =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum Overflow {
  Auto = "auto",
  Scroll = "scroll",
  Visible = "visible",
  Hidden = "hidden",
}

export type OverflowValue = "auto" | "scroll" | "visible" | "hidden"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum Position {
  Relative = "relative",
  Absolute = "absolute",
  Fixed = "fixed",
}

export type PositionValue = "relative" | "absolute" | "fixed"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum Resize {
  None = "none",
  X = "horizontal",
  Y = "vertical",
}

export type ResizeValue = "none" | "horizontal" | "vertical"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum TextAlign {
  Left = "left",
  Center = "center",
  Right = "right",
  Justify = "justify",
}

export type TextAlignValue = "left" | "center" | "right" | "justify"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum VerticalAlign {
  Top = "top",
  Middle = "middle",
  Baseline = "baseline",
  Bottom = "bottom",
  TextTop = "text-top",
  TextBottom = "text-bottom",
}

export type VerticalAlignValue =
  | "top"
  | "middle"
  | "baseline"
  | "bottom"
  | "text-top"
  | "text-bottom"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum Visibility {
  Visible = "visible",
  Hidden = "hidden",
}

export type VisibilityValue = "visible" | "hidden"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum ZIndex {
  Default = "z-index-default",
  Above = "z-index-above",
  Below = "z-index-below",
}

// `ZIndexValue` is not defined to avoid possible confusion; only the Enum is accepted for now.

export type FlexValue = 0 | 1 | 2 | 3 | 4;

// from inject-styled-layout

export enum Background {
  Base = "base",
  Alt = "alt",
  Alt2 = "alt-2",
  Overlay = "overlay",
  Accent = "accent",
  AccentAlt = "accent-alt",
  AccentAlt2 = "accent-alt-2",
  Inherit = "inherit",
}

export type BackgroundValue =
  | "base"
  | "alt"
  | "alt-2"
  | "overlay"
  | "accent"
  | "accent-alt"
  | "accent-alt-2"
  | "inherit"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum Color {
  Base = "base",
  Alt = "alt",
  Alt2 = "alt-2",
  Link = "link",
  Live = "live",
  Error = "error",
  Overlay = "overlay",
  OverlayAlt = "overlay-alt",
  Inherit = "inherit",
}

export type ColorValue =
  | "base"
  | "alt"
  | "alt-2"
  | "link"
  | "live"
  | "error"
  | "overlay"
  | "overlay-alt"
  | "inherit"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export type Elevation = 0 | 1 | 2 | 3 | 4 | 5;

export enum FontSize {
  Size1 = "font-size-1",
  Size2 = "font-size-2",
  Size3 = "font-size-3",
  Size4 = "font-size-4",
  Size5 = "font-size-5",
  Size6 = "font-size-6",
  Size7 = "font-size-7",
  Size8 = "font-size-8",
}

// `FontSizeValue` is not defined to avoid possible confusion; only the Enum is accepted for now.

export enum FontWeight {
  Regular = "regular",
  SemiBold = "semibold",
  Bold = "bold",
}

export type FontWeightValue = "regular" | "semibold" | "bold"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export type BorderRadiusProps = BorderRadius | BorderRadiusValues;
