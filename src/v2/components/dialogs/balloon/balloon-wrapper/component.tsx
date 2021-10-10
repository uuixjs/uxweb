import { Background, Color, Elevation, InjectLayout } from "../../../layout";
import {
  BorderRadius,
  CSSObject,
  css,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "lib/ui-utils";
import { FC, ReactNode } from "react";

import { withOverlayContext } from "../../../overlay-region/context";

export enum BalloonSize {
  /* Auto means the balloon width should adjust to accomodate the width of its children without wrapping */
  Auto = "auto",
  ExtraSmall = "xs",
  Small = "sm",
  Medium = "md",
  Large = "lg",
  ExtraLarge = "xl",
}

const BalloonSizeElevations: { [key: string]: Elevation } = {
  [BalloonSize.Auto]: 2,
  [BalloonSize.ExtraSmall]: 2,
  [BalloonSize.Small]: 2,
  [BalloonSize.Medium]: 3,
  [BalloonSize.Large]: 4,
  [BalloonSize.ExtraLarge]: 5,
};

const BalloonSizes: { [key: string]: CSSObject } = {
  [BalloonSize.Auto]: {
    "min-width": 0,
    "white-space": "nowrap",
  },
  [BalloonSize.ExtraSmall]: { width: "10rem", "min-width": "10rem" },
  [BalloonSize.Small]: { width: "20rem" },
  [BalloonSize.Medium]: { width: "30rem" },
  [BalloonSize.Large]: { width: "40rem" },
  [BalloonSize.ExtraLarge]: { width: "50rem" },
};

export interface BalloonWrapperProps {
  /** Set the background color of the balloon */
  background?: Background;
  /**
   * Content rendered in the Balloon
   *
   * @example <Layout padding={5} />
   */
  children?: ReactNode;
  /** Apply elevation styling to the balloon. */
  elevation?: Elevation;
  /**
   * The width of the Balloon. A Balloon's height is determined by
   * its children.
   */
  size?: BalloonSize | "auto" | "xs" | "sm" | "md" | "lg" | "xl"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  /** Adds overlay support to Balloon. */
  overlay?: boolean;
  /**
   * Passes an `aria-label` to the component to provide context to assistive
   * devices. All standard HTML aria attributes are now supported on Core UI
   * components — see https://www.w3.org/TR/html-aria/."
   */
  "aria-label"?: string;
}

const ScBalloonWrapper = styled.div<{
  $size: BalloonWrapperProps["size"];
  $overlay: BalloonWrapperProps["overlay"];
}>`
  display: inline-block;
  min-width: 16rem;
  max-width: 90vw;
  ${(props) => {
    return props.$size ? BalloonSizes[props.$size] : undefined;
  }};

  ${(props) => {
    if (props.$overlay) {
      return css`
        border-style: solid;
        border-width: ${staticTokenRule("border-width-default")};
        border-color: ${themeTokenRule("color-border-balloon-overlay")};
      `;
    }
  }};
`;

export const DEFAULT_BALLOON_ELEVATION = 2;

/**
 * To facilitate a focused interface, important actions and information should
 * always be visible to the user; but, less-used actions and information can
 * be placed within Balloons and shown by clicking.
 */
export const BalloonWrapperComponent: FC<BalloonWrapperProps> = ({
  background,
  elevation,
  size,
  overlay,
  ...props
}) => {
  return (
    <InjectLayout
      borderRadius={BorderRadius.Large}
      background={overlay ? Background.Overlay : background}
      elevation={
        elevation === 0
          ? elevation // when the elevation is specified as 0, set elevation 0.
          : size && elevation
          ? elevation // when elevation and size is otherwise specified, use that elevation regardless of size
          : (size && BalloonSizeElevations[size]) || // if size is specified, but not elevation, use the elevation according to size
            elevation || // without a specified size, but with elevation, use the elevation specified
            DEFAULT_BALLOON_ELEVATION // otherwise, use the default elevation
      }
      color={overlay ? Color.Overlay : Color.Inherit}
    >
      <ScBalloonWrapper
        $size={size}
        $overlay={overlay}
        role="dialog"
        className="tw-balloon"
        {...props}
      />
    </InjectLayout>
  );
};

BalloonWrapperComponent.defaultProps = {
  background: Background.Base,
};

BalloonWrapperComponent.displayName = "BalloonWrapperComponent";

export const BalloonWrapper = withOverlayContext(BalloonWrapperComponent);
