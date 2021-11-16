import { FC, ReactNode } from "react";
import { rem, styled } from "@uuixjs/uuixweb-lib";

import { StaticTokenMap } from "lib/ui-tokens";

export enum TowerGutter {
  Default = "default",
  ExtraSmall = "xs",
  Small = "sm",
  Large = "lg",
  None = "none",
}

export enum TowerChildWidth {
  ExtraSmall = 120, // 120px
  Small = 180, // 180px
  Medium = 240, // 240px
  Large = 300, // 300px
  ExtraLarge = 360, // 360px
}

export interface TowerProps {
  /** Center the children. */
  center?: boolean;
  /**
   * The items to be laid out by tower.
   *
   * @example
   *  <div>
   *    <Layout background={Background.Accent} padding={4} margin={{bottom: 1}} fullWidth />
   *  </div>
   *  <div>
   *    <Layout background={Background.Accent} padding={4} margin={{bottom: 1}} fullWidth />
   *  </div>
   *  <div>
   *    <Layout background={Background.Accent} padding={4} margin={{bottom: 1}} fullWidth />
   *  </div>
   *    <div>
   *    <Layout background={Background.Accent} padding={4} margin={{bottom: 1}} fullWidth />
   *  </div>
   *  <div>
   *    <Layout background={Background.Accent} padding={4} margin={{bottom: 1}} fullWidth />
   *  </div>
   *  <div>
   *    <Layout background={Background.Accent} padding={4} margin={{bottom: 1}} fullWidth />
   *  </div>
   *    <div>
   *    <Layout background={Background.Accent} padding={4} margin={{bottom: 1}} fullWidth />
   *  </div>
   *  <div>
   *    <Layout background={Background.Accent} padding={4} margin={{bottom: 1}} fullWidth />
   *  </div>
   *  <div>
   *    <Layout background={Background.Accent} padding={4} margin={{bottom: 1}} fullWidth />
   *  </div>
   */
  children?: ReactNode;
  /** Sets the width of the children. */
  childWidth?: TowerChildWidth | number;
  /** Sets the size of gutter between the children. */
  gutterSize?: TowerGutter | "default" | "xs" | "sm" | "lg" | "none"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  noGrow?: boolean;
  noWrap?: boolean;
  placeholderItems?: number;
}

export const gutterWidthMap: Record<TowerGutter, string> = {
  [TowerGutter.None]: "0",
  [TowerGutter.ExtraSmall]: StaticTokenMap["grid-gutter-width-xs"],
  [TowerGutter.Small]: StaticTokenMap["grid-gutter-width-sm"],
  [TowerGutter.Default]: StaticTokenMap["grid-gutter-width"],
  [TowerGutter.Large]: StaticTokenMap["grid-gutter-width-lg"],
};

interface ScTowerProps {
  gutterWidth: string;
}
export const ScTower = styled.div<TowerProps & ScTowerProps>`
  /* stylelint-disable selector-max-universal */
  display: flex;
  justify-content: ${(props) => (props.center ? "center" : undefined)};
  flex-wrap: ${(props) => (props.noWrap ? "no-wrap" : "wrap")};
  min-width: 100%;
  list-style: none;
  margin: 0 ${(props) => "-" + props.gutterWidth};

  & > * {
    flex: 0 0 auto;
    flex-grow: ${(props) => (props.noGrow || !props.childWidth ? "0" : "1")};
    width: ${(props) => (props.childWidth ? rem(props.childWidth) : undefined)};
    max-width: 50%;
    padding: 0 ${(props) => props.gutterWidth};
  }
`;

export const ScTowerPlaceholder = styled.div`
  order: 32767;
`;

/**
 * Tower helps to lay out items of the same width while forcing a desired width on those children via flexbox.
 */
export const Tower: FC<TowerProps> = ({
  children,
  gutterSize,
  placeholderItems,
  ...props
}) => {
  const placeholders = new Array<JSX.Element>();
  const gutterWidth = gutterSize
    ? gutterWidthMap[gutterSize]
    : gutterWidthMap[TowerGutter.Default];

  if (placeholderItems) {
    for (let i = 0; i < placeholderItems; ++i) {
      placeholders.push(<ScTowerPlaceholder key={i} />);
    }
  }

  return (
    <ScTower className="tw-tower" gutterWidth={gutterWidth} {...props}>
      {children}
      {placeholders}
    </ScTower>
  );
};

Tower.displayName = "Tower";
