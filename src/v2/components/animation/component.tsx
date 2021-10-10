import { AnimationEvent, FC, ReactNode } from "react";
import {
  bounce,
  bounceIn,
  bounceOut,
  fadeIn,
  fadeOut,
  slideInBottom,
  slideInLeft,
  slideInRight,
  slideInTop,
  slideOutBottom,
  slideOutLeft,
  slideOutRight,
  slideOutTop,
} from "./keyframes";
import { styleVariant, styled } from "lib/ui-utils";

export enum AnimationDelay {
  Short = "short",
  Medium = "medium",
  Long = "long",
  ExtraLong = "extra-long",
}

export enum AnimationDuration {
  Short = "short",
  Medium = "medium",
  Long = "long",
  ExtraLong = "extra-long",
}

export enum AnimationFillMode {
  Both = "both",
  None = "none",
  Forwards = "forwards",
  Backwards = "backwards",
}

export enum AnimationTiming {
  Ease = "ease",
  Linear = "linear",
  EaseIn = "ease-in",
  EaseOut = "ease-out",
  EaseInOut = "ease-in-out",
}

export enum AnimationType {
  Bounce = "bounce",
  BounceIn = "bounce-in",
  BounceOut = "bounce-out",
  FadeIn = "fade-in",
  FadeOut = "fade-out",
  SlideInTop = "slide-in-top",
  SlideInRight = "slide-in-right",
  SlideInBottom = "slide-in-bottom",
  SlideInLeft = "slide-in-left",
  SlideOutTop = "slide-out-top",
  SlideOutRight = "slide-out-right",
  SlideOutBottom = "slide-out-bottom",
  SlideOutLeft = "slide-out-left",
}

interface ScAnimationProps {
  $delay: AnimationProps["delay"];
  $duration: AnimationProps["duration"];
  $enabled: AnimationProps["enabled"];
  $fillMode: AnimationProps["fillMode"];
  $loop: AnimationProps["loop"];
  $timing: AnimationProps["timing"];
  $type: AnimationProps["type"];
}

const ScAnimation = styled.div<ScAnimationProps>`
  animation-name: ${(props) =>
    props.$enabled &&
    styleVariant("$type", {
      [AnimationType.Bounce]: bounce,
      [AnimationType.BounceIn]: bounceIn,
      [AnimationType.BounceOut]: bounceOut,
      [AnimationType.FadeIn]: fadeIn,
      [AnimationType.FadeOut]: fadeOut,
      [AnimationType.SlideInBottom]: slideInBottom,
      [AnimationType.SlideInLeft]: slideInLeft,
      [AnimationType.SlideInRight]: slideInRight,
      [AnimationType.SlideInTop]: slideInTop,
      [AnimationType.SlideOutBottom]: slideOutBottom,
      [AnimationType.SlideOutLeft]: slideOutLeft,
      [AnimationType.SlideOutRight]: slideOutRight,
      [AnimationType.SlideOutTop]: slideOutTop,
    })};

  animation-delay: ${styleVariant("$delay", {
    [AnimationDelay.Short]: "0.15s",
    [AnimationDelay.Medium]: "0.3s",
    [AnimationDelay.Long]: "0.6s",
    [AnimationDelay.ExtraLong]: "1s",
  })};

  animation-duration: ${styleVariant("$duration", {
    [AnimationDuration.Short]: "0.15s",
    [AnimationDuration.Medium]: "0.3s",
    [AnimationDuration.Long]: "0.6s",
    [AnimationDuration.ExtraLong]: "1s",
  })};

  animation-fill-mode: ${styleVariant("$fillMode", {
    [AnimationFillMode.None]: "none",
    [AnimationFillMode.Forwards]: "forwards",
    [AnimationFillMode.Backwards]: "backwards",
    [AnimationFillMode.Both]: "both",
  })};

  animation-timing-function: ${styleVariant("$timing", {
    [AnimationTiming.Ease]: "ease",
    [AnimationTiming.EaseIn]: "ease-in",
    [AnimationTiming.EaseInOut]: "ease-in-out",
    [AnimationTiming.EaseOut]: "ease-out",
    [AnimationTiming.Linear]: "linear",
  })};

  animation-iteration-count: ${(props) => props.$loop && "infinite"};
`;

export interface AnimationProps {
  /**
   * The content to render inside the animation.
   *
   * @example <CoreText fontSize={FontSize.Size4}>Toggle the "enabled" property to animate.</CoreText>
   */
  children?: ReactNode;
  /** The delay before the animation is triggered. */
  delay?: AnimationDelay | "short" | "medium" | "long" | "extra-long"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  /** The duration of the animation. */
  duration?: AnimationDuration | "short" | "medium" | "long" | "extra-long"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  /**
   * Used to trigger the animation. Toggling this prop will fire the animation.
   *
   * @example true
   */
  enabled?: boolean;
  /** Applies the CSS `animation-fill-mode` property. */
  fillMode?: AnimationFillMode | "both" | "none" | "forwards" | "backwards"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  /** When enabled, loop the animation. */
  loop?: boolean;
  /** Event called when the animation start. */
  onAnimationStart?: (e: AnimationEvent<HTMLDivElement>) => void;
  /** Event called when the animation ends. */
  onAnimationEnd?: (e: AnimationEvent<HTMLDivElement>) => void;
  /** The easing function that will be used for the animation. */
  timing?:
    | AnimationTiming
    | "ease"
    | "linear"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  /** The type of animation that will occur. */
  type:
    | AnimationType
    | "bounce"
    | "bounce-in"
    | "bounce-out"
    | "fade-in"
    | "fade-out"
    | "slide-in-top"
    | "slide-in-right"
    | "slide-in-bottom"
    | "slide-in-left"
    | "slide-out-top"
    | "slide-out-right"
    | "slide-out-bottom"
    | "slide-out-left"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
}

/**
 * Animations provide context and cues to the user interface.
 *
 * @deprecated Deprecated in favor of the new <Transition> component which was introduced in 5.5.0.
 * Please migrate your usage of <Animation> to the new <Transition> component. If you have a use case
 * which is not met by the new component, please reach out on Slack.
 * [See New Component](https://design.xarth.tv/user-interface/patterns/transition)
 * [Release Notes](https://git.xarth.tv/core-ui/core-ui/releases/tag/v5.5.0)
 */
export const Animation: FC<AnimationProps> = ({
  delay,
  duration = AnimationDuration.Short,
  enabled,
  fillMode = AnimationFillMode.Both,
  loop,
  timing = AnimationTiming.Ease,
  type,
  ...props
}) => {
  return (
    <ScAnimation
      $delay={delay}
      $duration={duration}
      $enabled={enabled}
      $fillMode={fillMode}
      $loop={loop}
      $timing={timing}
      $type={type}
      className="tw-animation"
      data-a-target="tw-animation-target"
      {...props}
    />
  );
};

Animation.displayName = "Animation";
