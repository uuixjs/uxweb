import { AlignItems, JustifyContent, Layout } from "../../layout";
import { CSSObject, styled } from "@uuixjs/uuixweb-lib";
import { FC, ReactNode } from "react";

import { ScColumn } from "../column/component";
import { StaticTokenMap } from "@uuixjs/uuixweb-lib";

export enum GridGutterSize {
  Default = "default",
  Small = "sm",
  Medium = "md",
  Large = "lg",
  None = "none",
}

export interface GridBreakpointProps {
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
}

export interface GridProps extends GridBreakpointProps {
  /**
   * @example
   *   <Column cols={4}>
   *     <Layout background={Background.Accent} padding={2} />
   *   </Column>
   *   <Column cols={4}>
   *     <Layout background={Background.Accent} padding={2} />
   *   </Column>
   *   <Column cols={4}>
   *     <Layout background={Background.Accent} padding={2} />
   *   </Column>
   */
  children?: ReactNode;
  fullHeight?: boolean;
  gutterSize?: GridGutterSize | "default" | "sm" | "md" | "lg" | "none"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  breakpointExtraSmall?: GridBreakpointProps;
  breakpointSmall?: GridBreakpointProps;
  breakpointMedium?: GridBreakpointProps;
  breakpointLarge?: GridBreakpointProps;
  breakpointExtraLarge?: GridBreakpointProps;
  breakpointExtraExtraLarge?: GridBreakpointProps;
}

const GutterSizeMap: Record<GridGutterSize, CSSObject> = {
  [GridGutterSize.Default]: {
    margin: `${StaticTokenMap["space-0"]} calc(-1 * ${StaticTokenMap["space-05"]})`,
    [`${ScColumn}`]: {
      padding: `${StaticTokenMap["space-0"]} ${StaticTokenMap["space-05"]}`,
    },
  },
  [GridGutterSize.None]: {
    margin: StaticTokenMap["space-0"],
    [`${ScColumn}`]: {
      padding: StaticTokenMap["space-0"],
    },
  },
  [GridGutterSize.Small]: {
    margin: `${StaticTokenMap["space-0"]}
    calc(-1 * ${StaticTokenMap["space-05"]} / 2)`,
    [`${ScColumn}`]: {
      padding: `0 calc(${StaticTokenMap["space-05"]} / 2)`,
    },
  },
  [GridGutterSize.Medium]: {
    margin: `${StaticTokenMap["space-0"]} calc(-1 * ${StaticTokenMap["space-2"]} / 2)`,
    [`${ScColumn}`]: {
      padding: `0 calc(${StaticTokenMap["space-2"]} / 2)`,
    },
  },
  [GridGutterSize.Large]: {
    margin: `${StaticTokenMap["space-0"]} calc(-1 * ${StaticTokenMap["space-4"]} / 2)`,
    [`${ScColumn}`]: {
      padding: `0 calc(${StaticTokenMap["space-4"]} / 2)`,
    },
  },
};

const ScGrid = styled(Layout)<{ $gutterSize: GridProps["gutterSize"] }>`
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;

  ${({ $gutterSize }) => GutterSizeMap[$gutterSize || GridGutterSize.Default]}
`;

export const Grid: FC<GridProps> = ({
  gutterSize = GridGutterSize.Default,
  ...props
}) => {
  return <ScGrid className="tw-grid" $gutterSize={gutterSize} {...props} />;
};

Grid.displayName = "Grid";
