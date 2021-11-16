import { StaticTokenMap, styleVariant } from "@uuixjs/uuixweb-lib";

import { TransitionStatus } from "../../models";

const space_2 = StaticTokenMap["space-2"];

type Props = {
  $status: TransitionStatus;
};

const S = TransitionStatus;

export const cssFade = styleVariant<Props, "$status">("$status", {
  // Enter
  [S.enter]: { opacity: 0 },
  [S.entering]: { opacity: 1 },
  [S.entered]: { opacity: 1 },
  // Exit
  [S.exit]: { opacity: 1 },
  [S.exiting]: { opacity: 0 },
  [S.exited]: { opacity: 0 },
});

export const cssScaleOver = styleVariant<Props, "$status">("$status", {
  // Enter
  [S.enter]: { opacity: 0, transform: "scale(0.9)" },
  [S.entering]: { opacity: 1, transform: "scale(1)" },
  [S.entered]: { opacity: 1, transform: "scale(1)" },
  // Exit
  [S.exit]: { opacity: 1, transform: "scale(1)" },
  [S.exiting]: { opacity: 0, transform: "scale(0.9)" },
  [S.exited]: { opacity: 0, transform: "scale(0.9)" },
});

export const cssSlideOverBottom = styleVariant<Props, "$status">("$status", {
  // Enter
  [S.enter]: { opacity: 0, transform: `translateY(${space_2})` },
  [S.entering]: { opacity: 1, transform: `translateY(0)` },
  [S.entered]: { opacity: 1, transform: `translateY(0)` },
  // Exit
  [S.exit]: { opacity: 1, transform: `translateY(0)` },
  [S.exiting]: { opacity: 0, transform: `translateY(${space_2})` },
  [S.exited]: { opacity: 0, transform: `translateY(${space_2})` },
});

export const cssSlideOverLeft = styleVariant<Props, "$status">("$status", {
  // Enter
  [S.enter]: { opacity: 0, transform: `translateX(-${space_2})` },
  [S.entering]: { opacity: 1, transform: `translateX(0)` },
  [S.entered]: { opacity: 1, transform: `translateX(0)` },
  // Exit
  [S.exit]: { opacity: 1, transform: `translateX(0)` },
  [S.exiting]: { opacity: 0, transform: `translateX(-${space_2})` },
  [S.exited]: { opacity: 0, transform: `translateX(-${space_2})` },
});

export const cssSlideOverRight = styleVariant<Props, "$status">("$status", {
  // Enter
  [S.enter]: { opacity: 0, transform: `translateX(${space_2})` },
  [S.entering]: { opacity: 1, transform: `translateX(0)` },
  [S.entered]: { opacity: 1, transform: `translateX(0)` },
  // Exit
  [S.exit]: { opacity: 1, transform: `translateX(0)` },
  [S.exiting]: { opacity: 0, transform: `translateX(${space_2})` },
  [S.exited]: { opacity: 0, transform: `translateX(${space_2})` },
});

export const cssSlideOverTop = styleVariant<Props, "$status">("$status", {
  // Enter
  [S.enter]: { opacity: 0, transform: `translateY(-${space_2})` },
  [S.entering]: { opacity: 1, transform: `translateY(0)` },
  [S.entered]: { opacity: 1, transform: `translateY(0)` },
  // Exit
  [S.exit]: { opacity: 1, transform: `translateY(0)` },
  [S.exiting]: { opacity: 0, transform: `translateY(-${space_2})` },
  [S.exited]: { opacity: 0, transform: `translateY(-${space_2})` },
});

export const cssTranslateBottom = styleVariant<Props, "$status">("$status", {
  // Enter
  [S.enter]: { transform: "translateY(100%)" },
  [S.entering]: { transform: "translateY(0)" },
  [S.entered]: { transform: "translateY(0)" },
  // Exit
  [S.exit]: { transform: "translateY(0)" },
  [S.exiting]: { transform: "translateY(100%)" },
  [S.exited]: { transform: "translateY(100%)" },
});

export const cssTranslateLeft = styleVariant<Props, "$status">("$status", {
  // Enter
  [S.enter]: { transform: "translateX(-100%)" },
  [S.entering]: { transform: "translateX(0)" },
  [S.entered]: { transform: "translateX(0)" },
  // Exit
  [S.exit]: { transform: "translateX(0)" },
  [S.exiting]: { transform: "translateX(-100%)" },
  [S.exited]: { transform: "translateX(-100%)" },
});

export const cssTranslateRight = styleVariant<Props, "$status">("$status", {
  // Enter
  [S.enter]: { transform: "translateX(100%)" },
  [S.entering]: { transform: "translateX(0)" },
  [S.entered]: { transform: "translateX(0)" },
  // Exit
  [S.exit]: { transform: "translateX(0)" },
  [S.exiting]: { transform: "translateX(100%)" },
  [S.exited]: { transform: "translateX(100%)" },
});

export const cssTranslateTop = styleVariant<Props, "$status">("$status", {
  // Enter
  [S.enter]: { transform: "translateY(-100%)" },
  [S.entering]: { transform: "translateY(0)" },
  [S.entered]: { transform: "translateY(0)" },
  // Exit
  [S.exit]: { transform: "translateY(0)" },
  [S.exiting]: { transform: "translateY(-100%)" },
  [S.exited]: { transform: "translateY(-100%)" },
});

/**
 * This is a special transition type used to effectively disable
 * the transition and not show any effect during entrance/exit.
 *
 * CSS "visibility" is used in order to keep the layout behavior consistent
 * with other transition types (i.e. it occupies layout space when not visible,
 * and the React component will manage removal of the element from the DOM)
 */
export const cssVisibility = styleVariant<Props, "$status">("$status", {
  // Enter
  [S.enter]: { visibility: "hidden" },
  [S.entering]: { visibility: "visible" },
  [S.entered]: { visibility: "visible" },
  // Exit
  [S.exit]: { visibility: "visible" },
  [S.exiting]: { visibility: "hidden" },
  [S.exited]: { visibility: "hidden" },
});
