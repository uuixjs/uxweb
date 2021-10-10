import { FC, ReactNode } from "react";

import { styled } from "lib/ui-utils";

export enum AspectRatio {
  Aspect21x9 = "tw-aspect--21x9",
  Aspect16x9 = "tw-aspect--16x9",
  Aspect4x3 = "tw-aspect--4x3",
  Aspect1x1 = "tw-aspect--1x1",
  Aspect3x4 = "tw-aspect--3x4",
  Aspect3x2 = "tw-aspect--3x2",
  // Leaving BoxArt as a semantic alias for now.
  BoxArt = "tw-aspect--3x4",
}

const AspectRatioValues = {
  [AspectRatio.Aspect21x9]: 21 / 9,
  [AspectRatio.Aspect16x9]: 16 / 9,
  [AspectRatio.Aspect4x3]: 4 / 3,
  [AspectRatio.Aspect1x1]: 1,
  [AspectRatio.Aspect3x4]: 3 / 4,
  [AspectRatio.Aspect3x2]: 3 / 2,
  [AspectRatio.BoxArt]: 3 / 4,
};

export enum Align {
  Bottom = 1,
  Center = 2,
  Top = 3,
}

interface ScAspectRatioProps {
  /**
   * Align the content within the component (if the content has a different
   * aspect ratio than the component).
   */
  align?: Align;
  /**
   * Show overflowing content (if the content has a different aspect ratio
   * than the component).
   */
  allowOverflow?: boolean;
}

function getAlign({ align }: ScAspectRatioProps): string {
  switch (align) {
    case Align.Bottom:
      return "bottom: 0;";
    case Align.Center:
      return "top: 50%; transform: translateY(-50%)";
    default:
      return "top: 0;";
  }
}

// @ts-ignore
export const ScAspectSpacer = styled.div<{ ratio: number | any }>`
  ${(props) => `padding-bottom: ${(1 / Math.abs(props.ratio)) * 100}%`}
`;

export const ScAspectRatio = styled.div<ScAspectRatioProps>`
  position: relative;
  width: 100%;
  overflow: ${(props) => (props.allowOverflow ? "visible" : "hidden")};

  /* stylelint-disable selector-max-universal, selector-max-type */
  & > *:not(${ScAspectSpacer}) {
    position: absolute;
    left: 0;
    width: 100%;
    min-height: 100%;
    ${getAlign}
  }
`;

export interface AspectProps extends ScAspectRatioProps {
  /**
   * The desired aspect ratio. If expressed as a number this value is width divided by height.
   * For example, a 3x4 ratio (box art) is calculated as 3 divided by 4 which equals 0.75
   *
   * @example 0.75
   */
  ratio?: AspectRatio | number;
  /**
   * The content to be contained within the aspect.
   *
   * @example <img src="https://static-cdn.jtvnw.net/s3_vods/twitchpresents/159083707/cf22b5ad-ce79-454b-bd91-c9831579ecfc/thumb/index-0000000000-1280x720.jpg" />
   */
  children?: ReactNode;
  /**
   * Deprecated alias for allowOverflow.
   *
   * @deprecated
   */
  overflow?: boolean;
}

/**
 * Aspect is used to set the height of an element based on its width for
 * applications such as box art and thumbnail images.
 */
export const Aspect: FC<AspectProps> = ({
  ratio = AspectRatioValues[AspectRatio.Aspect16x9],
  children,
  allowOverflow,
  overflow,
  ...aspectProps
}) => {
  return (
    <ScAspectRatio
      className="tw-aspect"
      allowOverflow={allowOverflow ?? overflow}
      {...aspectProps}
    >
      <ScAspectSpacer
        ratio={
          ratio && typeof ratio === "string" ? AspectRatioValues[ratio] : ratio
        }
      />
      {children}
    </ScAspectRatio>
  );
};

Aspect.defaultProps = {
  align: Align.Top,
  // This uses the deprecated prop to enable proper fallback from the new
  // `allowOverflow`. Once `overflow` is fully removed, this should switch to
  // `allowOverflow`.
  overflow: false,
};

Aspect.displayName = "Aspect";
