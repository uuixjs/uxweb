import { Background, Display, Layout } from "../layout";
import {
  BorderRadius,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "lib/ui-utils";
import { CoreText, TextTransform, WhiteSpace } from "../core-text";
import { StaticToken, ThemeToken } from "lib/ui-tokens";

import { FC } from "react";
import { withOverlayContext } from "../overlay-region/context";

export enum ChannelStatusTextIndicatorSize {
  Default = "default",
  Large = "large",
}

export enum ChannelStatusTextIndicatorType {
  Offline = "offline",
  Hosting = "hosting",
  Live = "live",
  Recording = "recording",
  Rerun = "rerun",
}

export interface ChannelStatusTextIndicatorProps {
  /* Required string to indicate the live status – ie. "Live" in the U.S. */
  label: string;

  /* Type defines the background color of the Channel Status Text Indicator. Specific
  /* background colors should go with specific messaging. */
  type?:
    | ChannelStatusTextIndicatorType
    | "offline"
    | "hosting"
    | "live"
    | "recording"
    | "rerun"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

  /* Allows for the background behind the indicator to specified. */
  mask?: Background;

  /* Allows the size to be the default, or large */
  size?: ChannelStatusTextIndicatorSize | "default" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

  /* Enables overlay */
  overlay?: boolean;
}

interface TokenMapItem {
  fill: ThemeToken;
  text: ThemeToken;
  overlay?: {
    fill: ThemeToken;
    text: ThemeToken;
  };
}

const ColorTokenMap: Record<ChannelStatusTextIndicatorType, TokenMapItem> = {
  [ChannelStatusTextIndicatorType.Offline]: {
    fill: "color-fill-channel-status-text-indicator-offline",
    text: "color-text-channel-status-text-indicator-offline",
    overlay: {
      fill: "color-fill-channel-status-text-indicator-offline-overlay",
      text: "color-text-channel-status-text-indicator-offline-overlay",
    },
  },
  [ChannelStatusTextIndicatorType.Rerun]: {
    fill: "color-fill-channel-status-text-indicator-rerun",
    text: "color-text-channel-status-text-indicator-rerun",
    overlay: {
      fill: "color-fill-channel-status-text-indicator-rerun-overlay",
      text: "color-text-channel-status-text-indicator-rerun-overlay",
    },
  },
  [ChannelStatusTextIndicatorType.Hosting]: {
    fill: "color-fill-channel-status-text-indicator-hosting",
    text: "color-text-channel-status-text-indicator-hosting",
    overlay: {
      fill: "color-fill-channel-status-text-indicator-hosting-overlay",
      text: "color-text-channel-status-text-indicator-hosting-overlay",
    },
  },
  [ChannelStatusTextIndicatorType.Recording]: {
    fill: "color-fill-live",
    text: "color-text-overlay",
  },
  [ChannelStatusTextIndicatorType.Live]: {
    fill: "color-fill-live",
    text: "color-text-overlay",
  },
};

const PaddingMap: Record<ChannelStatusTextIndicatorSize, string> = {
  [ChannelStatusTextIndicatorSize.Default]: "0 0.5rem",
  [ChannelStatusTextIndicatorSize.Large]: "0.3rem 1rem",
};

const FontSizeTokenMap: Record<ChannelStatusTextIndicatorSize, StaticToken> = {
  [ChannelStatusTextIndicatorSize.Default]: "font-size-6",
  [ChannelStatusTextIndicatorSize.Large]: "font-size-5",
};

interface ScChannelStatusTextIndicatorProps {
  padding: string;
  colorMap: TokenMapItem;
  overlay?: boolean;
  fontSize: StaticToken;
}

const ScChannelStatusTextIndicator = styled.div<
  ScChannelStatusTextIndicatorProps
>`
  display: inline-block;
  text-align: center;
  pointer-events: none;
  padding: ${(props) => props.padding};

  border-radius: ${staticTokenRule("border-radius-medium")};
  font-size: ${(props) => staticTokenRule(props.fontSize)};

  background-color: ${(props) =>
    themeTokenRule(
      props.overlay && props.colorMap.overlay
        ? props.colorMap.overlay.fill
        : props.colorMap.fill,
    )};

  color: ${(props) =>
    themeTokenRule(
      props.overlay && props.colorMap.overlay
        ? props.colorMap.overlay.text
        : props.colorMap.text,
    )};
`;

const ScChannelStatusTextIndicatorMask = styled(Layout)`
  padding: 0.2rem;
`;

export const ChannelStatusTextIndicatorComponent: FC<ChannelStatusTextIndicatorProps> = ({
  label,
  mask,
  overlay,
  size = ChannelStatusTextIndicatorSize.Default,
  type = ChannelStatusTextIndicatorType.Live,
  ...props
}) => {
  const indicator = (
    <ScChannelStatusTextIndicator
      className="tw-channel-status-text-indicator"
      colorMap={ColorTokenMap[type]}
      padding={PaddingMap[size]}
      overlay={overlay}
      fontSize={FontSizeTokenMap[size]}
      {...props}
    >
      <CoreText
        whiteSpace={WhiteSpace.NoWrap}
        transform={TextTransform.Uppercase}
        bold
      >
        {label}
      </CoreText>
    </ScChannelStatusTextIndicator>
  );

  if (mask) {
    return (
      <ScChannelStatusTextIndicatorMask
        display={Display.InlineBlock}
        background={mask}
        borderRadius={BorderRadius.Medium}
      >
        {indicator}
      </ScChannelStatusTextIndicatorMask>
    );
  } else {
    return indicator;
  }
};

ChannelStatusTextIndicatorComponent.displayName =
  "ChannelStatusTextIndicatorComponent";

export const ChannelStatusTextIndicator = withOverlayContext(
  ChannelStatusTextIndicatorComponent,
);
