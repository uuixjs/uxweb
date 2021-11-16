import { AnimationEvent, FC } from "react";
import {
  BorderRadius,
  getAriaProps,
  getDataProps,
  keyframes,
  styleVariant,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";
import { Display, InjectLayout } from "../layout";

import { withOverlayContext } from "../overlay-region/context";

export enum ProgressBarSize {
  Default = "default",
  Small = "sm",
  ExtraSmall = "xs",
}

export enum ProgressBarStatus {
  Default = "default",
  Caution = "caution",
  Error = "error",
  Success = "success",
}

export enum ProgressBarAnimationDirection {
  Up = "up",
  Down = "down",
}

interface ScProgressBarWrapperProps
  extends Pick<ProgressBarProps, "overlay" | "size" | "status"> {
  $mask?: boolean;
}

export const ScProgressBarWrapper = styled.div<ScProgressBarWrapperProps>`
  overflow: hidden;
  width: 100%;
  height: ${styleVariant("size", {
    [ProgressBarSize.Default]: "1rem",
    [ProgressBarSize.Small]: "0.5rem",
    [ProgressBarSize.ExtraSmall]: "0.3rem",
  })};

  background: ${wrapperBgColor};
`;

function wrapperBgColor(props: ScProgressBarWrapperProps) {
  if (props.status && props.status !== ProgressBarStatus.Default) {
    return styleVariant("status", {
      [ProgressBarStatus.Default]: "",
      [ProgressBarStatus.Caution]: themeTokenRule(
        "color-background-progress-status-caution",
      ),
      [ProgressBarStatus.Error]: themeTokenRule(
        "color-background-progress-status-error",
      ),
      [ProgressBarStatus.Success]: themeTokenRule(
        "color-background-progress-status-success",
      ),
    });
  }

  if (props.overlay && props.$mask) {
    return themeTokenRule("color-background-progress-overlay-mask");
  } else if (props.$mask) {
    return themeTokenRule("color-background-progress");
  }

  return "";
}

const countDownKeyframes = keyframes`
100% {
  width: 0%;
}
`;

const countUpKeyframes = keyframes`
100% {
  width: 100%;
}
`;

type ScProgressBarFillProps = Pick<
  ProgressBarProps,
  | "status"
  | "overlay"
  | "animationDuration"
  | "animationDirection"
  | "value"
  | "paused"
  | "inherit"
>;

export const ScProgressBarFill = styled.div<ScProgressBarFillProps>`
  width: ${({ value, animationDirection }) => {
    if (value !== undefined) {
      return value + "%";
    }

    if (animationDirection === ProgressBarAnimationDirection.Down) {
      return "100%";
    } else if (animationDirection === ProgressBarAnimationDirection.Up) {
      return "0%";
    }

    return "100%";
  }};
  max-width: 100%;
  height: 100%;

  visibility: ${styleVariant("status", {
    [ProgressBarStatus.Default]: "",
    [ProgressBarStatus.Caution]: "hidden",
    [ProgressBarStatus.Error]: "hidden",
    [ProgressBarStatus.Success]: "hidden",
  })};

  background: ${({ overlay, inherit }) =>
    inherit
      ? "currentColor"
      : overlay
      ? themeTokenRule("color-background-progress-overlay-status")
      : themeTokenRule("color-background-progress-status")};

  animation-name: ${styleVariant("animationDirection", {
    [ProgressBarAnimationDirection.Down]: countDownKeyframes,
    [ProgressBarAnimationDirection.Up]: countUpKeyframes,
  })};

  animation-timing-function: linear;
  animation-fill-mode: both;
  animation-play-state: ${({ paused }) => paused && "paused"};
  animation-duration: ${({ animationDuration }) =>
    animationDuration !== undefined && animationDuration + "s"};
`;

export interface ProgressBarProps {
  animationDuration?: number;
  animationDirection?: ProgressBarAnimationDirection | "up" | "down"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  borderRadius?: BorderRadius;
  onAnimationEnd?: (e: AnimationEvent<HTMLDivElement>) => void;
  size?: ProgressBarSize | "default" | "sm" | "xs"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  status?: ProgressBarStatus | "default" | "caution" | "error" | "success"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  value?: number;
  inherit?: boolean;
  mask?: boolean;
  paused?: boolean;
  overlay?: boolean;
}

export const ProgressBarComponent: FC<ProgressBarProps> = (props) => {
  return (
    <InjectLayout borderRadius={props.borderRadius}>
      <ScProgressBarWrapper
        {...getDataProps(props)}
        {...getAriaProps(props)}
        className={"tw-progress-bar"}
        $mask={props.mask}
        overlay={props.overlay}
        status={props.status}
        size={props.size || ProgressBarSize.Default}
        role="progressbar"
        aria-valuenow={props.value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <InjectLayout
          borderRadius={{
            topLeft: props.borderRadius,
            bottomLeft: props.borderRadius,
          }}
          display={Display.Block}
        >
          <ScProgressBarFill
            overlay={props.overlay}
            status={props.status}
            onAnimationEnd={props.onAnimationEnd}
            animationDirection={props.animationDirection}
            animationDuration={props.animationDuration}
            paused={props.paused}
            value={props.value}
            inherit={props.inherit}
            data-a-target="tw-progress-bar-animation"
          />
        </InjectLayout>
      </ScProgressBarWrapper>
    </InjectLayout>
  );
};

ProgressBarComponent.defaultProps = {
  borderRadius: BorderRadius.Large,
  status: ProgressBarStatus.Default,
};

ProgressBarComponent.displayName = "ProgressBarComponent";

export const ProgressBar = withOverlayContext(ProgressBarComponent);
