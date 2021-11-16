import { Aspect, AspectRatio } from "../aspect";
import { SVGAsset, SVG_PATHS } from "../svg";

import { FC } from "react";
import { styled } from "lib";

export const DEFAULT_ICON_SIZE_REM = 2;

interface ScIconLayoutProps {
  /**
   * Controls whether the icon expands to fill its parent's size.
   */
  fillParent?: boolean;
}

function getIconLayoutSize({ fillParent }: ScIconLayoutProps) {
  if (fillParent) {
    return `
      height: 100%;
      width: 100%;
    `;
  }

  return `
    height: ${DEFAULT_ICON_SIZE_REM}rem;
    width: ${DEFAULT_ICON_SIZE_REM}rem;
  `;
}

export const ScIconLayout = styled.div<ScIconLayoutProps>`
  display: inline-flex;
  align-items: center;
  ${getIconLayoutSize}
`;

export const ScIconSVG = styled.svg`
  fill: currentColor;
`;

export interface IconProps extends ScIconLayoutProps {
  /**
   * The SVG asset to render.
   */
  asset: SVGAsset;
  /**
   * Deprecated alias for fillParent.
   *
   * @deprecated
   */
  fill?: boolean;
}

export const Icon: FC<IconProps> = ({ asset, fill, fillParent, ...props }) => {
  return (
    <ScIconLayout
      fillParent={fillParent ?? fill}
      className="tw-icon"
      {...props}
    >
      <Aspect ratio={AspectRatio.Aspect1x1}>
        <ScIconSVG
          width="100%"
          height="100%"
          version="1.1"
          viewBox={`0 0 20 20`}
          x="0px"
          y="0px"
        >
          {SVG_PATHS[asset].path}
        </ScIconSVG>
      </Aspect>
    </ScIconLayout>
  );
};

Icon.displayName = "Icon";
