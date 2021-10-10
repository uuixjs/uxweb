import { SVGAsset, SVG_PATHS } from "./paths";
import {
  getAriaProps,
  getDataProps,
  styled,
  themeTokenRule,
} from "lib/ui-utils";

import { FC } from "react";
import { ThemeToken } from "lib/ui-tokens";

export enum SVGType {
  Inherit = "color-fill-current",
  Alt = "color-fill-alt",
  Alt2 = "color-fill-alt-2",
  Brand = "color-fill-brand",
  Live = "color-text-accessible-red",
  Warn = "color-fill-warn",
  Alert = "color-fill-alert",
  Success = "color-fill-success",
  Prime = "color-fill-prime",
  Placeholder = "color-background-placeholder",
  OverlayPlaceholder = "color-background-overlay-placeholder",
}

interface ScFigureProps {
  size: "100%" | undefined;
}

const ScFigure = styled.figure<ScFigureProps>`
  align-items: center;
  display: inline-flex;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`;

interface ScSvgProps {
  /**
   * Forces all values in the SVGType enum to be valid ThemeToken names
   */
  type: ThemeToken;
}

const ScSvg = styled.svg<ScSvgProps>`
  fill: ${({ type }) => themeTokenRule(type)};
`;

export interface SVGProps {
  asset: SVGAsset;
  height?: number;
  width?: number;
  /**
   * Deprecated alias for fillParent.
   *
   * @deprecated
   */
  fill?: boolean;
  /**
   * Controls whether the icon expands to fill its parent's size.
   */
  fillParent?: boolean;
  type?: SVGType;
}

export const SVG: FC<SVGProps> = (props) => {
  const fillParent = props.fillParent || props.fill;

  return (
    <ScFigure
      className="tw-svg"
      size={fillParent ? "100%" : undefined}
      {...getDataProps(props)}
      {...getAriaProps(props)}
    >
      <ScSvg
        type={props.type || SVGType.Inherit}
        width={fillParent ? "100%" : (props.width || 20) + "px"}
        height={fillParent ? "100%" : (props.height || 20) + "px"}
        version="1.1"
        viewBox={`0 0 ${SVG_PATHS[props.asset].width} ${
          SVG_PATHS[props.asset].height
        }`}
        x="0px"
        y="0px"
      >
        {SVG_PATHS[props.asset].path}
      </ScSvg>
    </ScFigure>
  );
};

SVG.displayName = "SVG";
