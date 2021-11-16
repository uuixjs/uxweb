import {
  CoreText,
  LineHeight,
  TextType,
  WhiteSpace,
  WordBreak,
} from "../core-text";
import { FC, HTMLProps, ReactNode } from "react";
import { FontSize, FontWeight } from "../layout";
import { cn, staticTokenRule } from "@uuixjs/uuixweb-lib";

import styled from "styled-components";

export enum SubtitleSize {
  Large = "lg",
  Default = "md",
  Small = "sm",
  ExtraSmall = "xs",
}

export interface BreakpointProps {
  size?: SubtitleSize | "lg" | "md" | "sm" | "xs"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
}

export interface SubtitleProps extends BreakpointProps {
  children?: ReactNode;
  ellipsis?: boolean;
  lineHeight?: LineHeight;
  type?: TextType;
  whiteSpace?: WhiteSpace;
  wordBreak?: WordBreak;
  breakpointExtraSmall?: BreakpointProps;
  breakpointSmall?: BreakpointProps;
  breakpointMedium?: BreakpointProps;
  breakpointLarge?: BreakpointProps;
  breakpointExtraLarge?: BreakpointProps;
  breakpointExtraExtraLarge?: BreakpointProps;
}

const subtitleSizeMap = {
  [SubtitleSize.Large]: {
    fontSize: FontSize.Size2,
    fontWeight: FontWeight.Regular,
  },
  [SubtitleSize.Default]: {
    fontSize: FontSize.Size3,
    fontWeight: FontWeight.Regular,
  },
  [SubtitleSize.Small]: {
    fontSize: FontSize.Size4,
    fontWeight: FontWeight.Regular,
  },
  [SubtitleSize.ExtraSmall]: {
    fontSize: FontSize.Size5,
    fontWeight: FontWeight.Regular,
  },
};

export const ScSubtitle = styled(CoreText)<{ $size: BreakpointProps["size"] }>`
  font-family: ${({ $size }) =>
    $size === SubtitleSize.ExtraSmall
      ? "inherit"
      : staticTokenRule("font-display")};
`;

export const Subtitle: FC<
  SubtitleProps & Omit<HTMLProps<HTMLElement>, "as" | "ref" | "size">
> = ({
  size = SubtitleSize.Default,
  color,
  children,
  className,
  breakpointExtraSmall,
  breakpointSmall,
  breakpointMedium,
  breakpointLarge,
  breakpointExtraLarge,
  breakpointExtraExtraLarge,
  ...subtitleProps
}) => {
  return (
    <ScSubtitle
      $size={size}
      {...subtitleProps}
      {...getFontProps({ size })}
      className={cn("tw-subtitle", className)}
      breakpointExtraSmall={getFontProps(breakpointExtraSmall)}
      breakpointSmall={getFontProps(breakpointSmall)}
      breakpointMedium={getFontProps(breakpointMedium)}
      breakpointLarge={getFontProps(breakpointLarge)}
      breakpointExtraLarge={getFontProps(breakpointExtraLarge)}
      breakpointExtraExtraLarge={getFontProps(breakpointExtraExtraLarge)}
    >
      {children}
    </ScSubtitle>
  );
};

Subtitle.defaultProps = {
  size: SubtitleSize.Default,
  lineHeight: LineHeight.Heading,
};

Subtitle.displayName = "Subtitle";

export function getFontProps(
  props?: BreakpointProps,
): { fontSize?: FontSize; fontWeight?: FontWeight } | undefined {
  if (!props || props.size === undefined) {
    return undefined;
  }
  return subtitleSizeMap[props.size];
}
