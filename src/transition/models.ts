export enum TransitionType {
  Fade = "fade",
  TranslateRight = "translate-right",
  TranslateLeft = "translate-left",
  TranslateTop = "translate-top",
  TranslateBottom = "translate-bottom",
  ScaleOver = "scale-over",
  SlideOverRight = "slide-over-right",
  SlideOverLeft = "slide-over-left",
  SlideOverTop = "slide-over-top",
  SlideOverBottom = "slide-over-bottom",
  None = "none",
}

export type TransitionTypeValue =
  | "fade"
  | "translate-right"
  | "translate-left"
  | "translate-top"
  | "translate-bottom"
  | "scale-over"
  | "slide-over-right"
  | "slide-over-left"
  | "slide-over-top"
  | "slide-over-bottom"
  | "none"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export enum TransitionStatus {
  enter = "enter-prep",
  entering = "enter-active",
  entered = "enter-done",
  exit = "exit-prep",
  exiting = "exit-active",
  exited = "exit-done",
}
