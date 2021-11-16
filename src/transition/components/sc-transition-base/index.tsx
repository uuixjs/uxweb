import {
  TransitionStatus,
  TransitionType,
  TransitionTypeValue,
} from "../../models";
import {
  cssFade,
  cssScaleOver,
  cssSlideOverBottom,
  cssSlideOverLeft,
  cssSlideOverRight,
  cssSlideOverTop,
  cssTranslateBottom,
  cssTranslateLeft,
  cssTranslateRight,
  cssTranslateTop,
  cssVisibility,
} from "./transition-styles";
import { styleVariant, styled } from "@uuixjs/uuixweb-lib";

import { WrapOrInjectChild } from "../wrap-or-inject-child";

export interface ScTransitionBaseProps {
  $type: TransitionTypeValue;
  $status: TransitionStatus;
  $delay: number;
  $duration: number;
}

export const ScTransitionBase = styled(WrapOrInjectChild)<
  ScTransitionBaseProps
>`
  transition-delay: ${(props) => props.$delay + "ms"};
  transition-duration: ${(props) => props.$duration + "ms"};
  transition-property: none;

  ${styleVariant("$status", {
    [TransitionStatus.enter]: undefined,
    [TransitionStatus.entering]: {
      transitionProperty: "transform, opacity",
      transitionTimingFunction: "ease",
    },
    [TransitionStatus.entered]: undefined,
    [TransitionStatus.exit]: undefined,
    [TransitionStatus.exiting]: {
      transitionProperty: "transform, opacity",
      transitionTimingFunction: "ease",
    },
    [TransitionStatus.exited]: undefined,
  })};

  ${styleVariant("$type", {
    [TransitionType.Fade]: cssFade,
    [TransitionType.ScaleOver]: cssScaleOver,
    [TransitionType.SlideOverBottom]: cssSlideOverBottom,
    [TransitionType.SlideOverLeft]: cssSlideOverLeft,
    [TransitionType.SlideOverRight]: cssSlideOverRight,
    [TransitionType.SlideOverTop]: cssSlideOverTop,
    [TransitionType.TranslateBottom]: cssTranslateBottom,
    [TransitionType.TranslateLeft]: cssTranslateLeft,
    [TransitionType.TranslateRight]: cssTranslateRight,
    [TransitionType.TranslateTop]: cssTranslateTop,
    [TransitionType.None]: cssVisibility,
  })}
`;
