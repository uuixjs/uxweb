/**
 * Many string values in this file must match the CSS values
 * for the corresponding property because they get used directly!
 */

export type Lines = 1 | 2;

export enum LineHeight {
  Body = "body",
  Heading = "heading",
}

export type LineHeightValue = "body" | "heading"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum TextDecoration {
  Underline = "underline",
  Strikethrough = "line-through",
}

export type TextDecorationValue = "underline" | "line-through"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum TextTransform {
  Capitalize = "capitalize",
  Uppercase = "uppercase",
}

export type TextTransformValue = "capitalize" | "uppercase"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum TextType {
  P = "p",
  Span = "span",
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  Strong = "strong",
  Em = "em",
}

export type TextTypeValue =
  | "p"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "strong"
  | "em"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum WordBreak {
  Normal = "normal",
  BreakAll = "break-all",
  KeepAll = "keep-all",
  BreakWord = "break-word",
}

export type WordBreakValue = "normal" | "break-all" | "keep-all" | "break-word"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum WhiteSpace {
  NoWrap = "nowrap",
  PreWrap = "pre-wrap",
}

export type WhiteSpaceValue = "nowrap" | "pre-wrap"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
