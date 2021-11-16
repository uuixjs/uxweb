import { CoreText, TextTransform, TextType } from "../core-text";
import { styleVariant, styled, themeTokenRule } from "lib";

import { FC } from "react";
import { FontWeight } from "../layout";

export enum PillType {
  Default = "default",
  Notification = "notification",
  Brand = "brand",
  Info = "info",
  Live = "live",
  Alert = "alert",
  Success = "success",
  Overlay = "overlay",
  Warn = "warn",
  New = "new",
  Subtle = "subtle",
}

export interface PillProps {
  /**
   * @example Beta
   */
  label: string;
  type?:
    | PillType
    | "default"
    | "notification"
    | "brand"
    | "info"
    | "live"
    | "alert"
    | "success"
    | "overlay"
    | "new"
    | "subtle"
    | "warn"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  transform?: TextTransform;
}

interface ScPillProps {
  $pillType?:
    | PillType
    | "default"
    | "notification"
    | "brand"
    | "info"
    | "live"
    | "alert"
    | "success"
    | "overlay"
    | "new"
    | "subtle"
    | "warn"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
}

const bgColor = styleVariant<ScPillProps, "$pillType">("$pillType", {
  [PillType.Default]: themeTokenRule("color-background-pill"),
  [PillType.Notification]: themeTokenRule("color-background-pill-notification"),
  [PillType.Brand]: themeTokenRule("color-background-brand"),
  [PillType.Info]: themeTokenRule("color-background-info"),
  [PillType.Live]: themeTokenRule("color-fill-live"),
  [PillType.Alert]: themeTokenRule("color-background-error"),
  [PillType.Success]: themeTokenRule("color-background-success"),
  [PillType.Overlay]: themeTokenRule("color-background-overlay"),
  [PillType.Warn]: themeTokenRule("color-background-warn"),
  [PillType.New]: themeTokenRule("color-background-pill-new"),
  [PillType.Subtle]: themeTokenRule("color-background-pill-subtle"),
});

const overlay = themeTokenRule("color-text-overlay");

const textColor = styleVariant<ScPillProps, "$pillType">("$pillType", {
  [PillType.Default]: overlay,
  [PillType.Notification]: overlay,
  [PillType.Brand]: themeTokenRule("color-text-pill"),
  [PillType.Info]: themeTokenRule("color-text-pill"),
  [PillType.Live]: overlay,
  [PillType.Alert]: themeTokenRule("color-text-pill"),
  [PillType.Success]: themeTokenRule("color-text-pill"),
  [PillType.Overlay]: overlay,
  [PillType.Warn]: themeTokenRule("color-text-pill"),
  [PillType.New]: themeTokenRule("color-text-pill"),
  [PillType.Subtle]: themeTokenRule("color-text-pill"),
});

const ScPill = styled(CoreText)<ScPillProps>`
  color: ${textColor};
  background-color: ${bgColor};
  display: inline-block;
  position: relative;
  line-height: 1;
  text-align: center;
  white-space: nowrap;

  /* Compensate for difference caused by padding; half of the y padding */
  bottom: 0.15em;

  /* Round the end caps. */
  border-radius: 1000px;

  /* Because the ends are rounded, padding should be relative to the font size of the pill. */
  padding: 0.3rem 0.8em;

  /* Pills typically display inline with text; but should render a slightly smaller font size. */
  font-size: 75%;

  &:empty {
    display: none;
  }
`;

export const Pill: FC<PillProps> = ({
  label,
  transform = TextTransform.Uppercase,
  type = PillType.Info,
  ...props
}) => {
  return (
    <ScPill
      $pillType={type}
      className="tw-pill"
      type={TextType.Span}
      transform={transform}
      fontWeight={FontWeight.SemiBold}
      {...props}
    >
      {label}
    </ScPill>
  );
};

Pill.displayName = "Pill";
