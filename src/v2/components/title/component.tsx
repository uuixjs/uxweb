import {
  CoreText,
  LineHeight,
  TextType,
  WhiteSpace,
  WordBreak,
} from "../core-text";
import { FC, HTMLProps, ReactNode } from "react";
import { FontSize, FontWeight } from "../layout";
import { cn, staticTokenRule, styled } from "lib/ui-utils";

export enum TitleSize {
  ExtraLarge = "xl",
  Large = "lg",
  Default = "md",
  Small = "sm",
  ExtraSmall = "xs",
}
export interface BreakpointProps {
  size?: TitleSize | "xl" | "lg" | "md" | "sm" | "xs"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
}

export interface TitleProps extends BreakpointProps {
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

export const ScTitleText = styled(CoreText)<{ $size: TitleProps["size"] }>`
  font-family: ${({ $size }) =>
    $size === TitleSize.ExtraSmall
      ? "inherit"
      : staticTokenRule("font-display")};
`;

export const Title: FC<
  TitleProps & Omit<HTMLProps<HTMLElement>, "as" | "ref" | "size">
> = ({
  size = TitleSize.Default,
  color,
  children,
  className,
  breakpointExtraSmall,
  breakpointSmall,
  breakpointMedium,
  breakpointLarge,
  breakpointExtraLarge,
  breakpointExtraExtraLarge,
  ...titleProps
}) => {
  return (
    <ScTitleText
      $size={size}
      {...titleProps}
      {...getFontProps({ size })}
      className={cn("tw-title", className)}
      breakpointExtraSmall={getFontProps(breakpointExtraSmall)}
      breakpointSmall={getFontProps(breakpointSmall)}
      breakpointMedium={getFontProps(breakpointMedium)}
      breakpointLarge={getFontProps(breakpointLarge)}
      breakpointExtraLarge={getFontProps(breakpointExtraLarge)}
      breakpointExtraExtraLarge={getFontProps(breakpointExtraExtraLarge)}
    >
      {children}
    </ScTitleText>
  );
};

Title.defaultProps = {
  size: TitleSize.Default,
  lineHeight: LineHeight.Heading,
};

Title.displayName = "Title";

const titleSizeMap = {
  [TitleSize.ExtraLarge]: {
    fontSize: FontSize.Size1,
    fontWeight: FontWeight.Bold,
  },
  [TitleSize.Large]: {
    fontSize: FontSize.Size2,
    fontWeight: FontWeight.Bold,
  },
  [TitleSize.Default]: {
    fontSize: FontSize.Size3,
    fontWeight: FontWeight.SemiBold,
  },
  [TitleSize.Small]: {
    fontSize: FontSize.Size4,
    fontWeight: FontWeight.SemiBold,
  },
  [TitleSize.ExtraSmall]: {
    fontSize: FontSize.Size5,
    fontWeight: FontWeight.SemiBold,
  },
};

function getFontProps(
  props?: BreakpointProps,
): { fontSize?: FontSize; fontWeight?: FontWeight } | undefined {
  if (!props || props.size === undefined) {
    return undefined;
  }
  return titleSizeMap[props.size];
}
