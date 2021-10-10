import { Background, Display, Layout, Position } from "../layout";
import {
  BorderRadius,
  css,
  keyframes,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "lib/ui-utils";
import { StaticToken, ThemeToken } from "lib/ui-tokens";

import { FC } from "react";

export enum ChannelStatusIndicatorSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum ChannelStatusIndicatorStatus {
  Offline = "offline",
  Hosting = "hosting",
  Live = "live",
  Recording = "recording",
}

export interface ChannelStatusIndicatorProps {
  /* Allows for the background behind the indicator to specified. */
  mask?: Background;
  /** Enable a pulse animation around the indicator. */
  pulse?: boolean;
  /** The status of the indicator. */
  status?:
    | ChannelStatusIndicatorStatus
    | "offline"
    | "hosting"
    | "live"
    | "recording"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  /** The size of the channel status indicator. */
  size?: ChannelStatusIndicatorSize | "small" | "medium" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
}

const SizeMap: Record<ChannelStatusIndicatorSize, string> = {
  [ChannelStatusIndicatorSize.Small]: "0.8rem",
  [ChannelStatusIndicatorSize.Medium]: "1.2rem",
  [ChannelStatusIndicatorSize.Large]: "1.6rem",
};

const FillTokensMap: Record<ChannelStatusIndicatorStatus, ThemeToken> = {
  [ChannelStatusIndicatorStatus.Live]: "color-fill-live",
  [ChannelStatusIndicatorStatus.Recording]: "color-fill-live",
  [ChannelStatusIndicatorStatus.Hosting]: "color-fill-hosting",
  [ChannelStatusIndicatorStatus.Offline]: "color-fill-offline",
};

interface ScChannelStatusIndicatorProps {
  borderRadius: StaticToken;
  $backgroundColor: ThemeToken;
  $size: string;
  $enablePulse?: boolean;
}

const pulseKeyframes = keyframes`
  0% {
    transform: scale3d(1, 1, 1);
    opacity: 0.2;
  }

  100% {
    transform: scale3d(4, 4, 4);
    opacity: 0;
  }
`;

const pulseCss = css`
  animation: ${pulseKeyframes} 1.5s infinite;
`;

const ScChannelStatusIndicator = styled.div<ScChannelStatusIndicatorProps>`
  background-color: ${(props) => themeTokenRule(props.$backgroundColor)};
  border-radius: ${(props) => staticTokenRule(props.borderRadius)};

  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  display: inline-block;
  position: relative;

  &::after {
    background-color: ${(props) => themeTokenRule(props.$backgroundColor)};
    ${pulseCss};
    display: ${(props) => (props.$enablePulse ? "block" : "none")};
    width: ${(props) => props.$size};
    height: ${(props) => props.$size};
    position: absolute;
    top: 0;
    left: 0;
    border-radius: inherit;
    content: "";
    opacity: 0.2;
    animation-timing-function: ease-out;
  }
`;

const ScChannelStatusIndicatorMask = styled(Layout)`
  padding: 0.2rem;
`;

/**
 * Displays an element that helps to communicate the status of a channel. This
 * element relies on color, so it must be used in addition to text to
 * adequately indicate the status of the channel.
 */
export const ChannelStatusIndicator: FC<ChannelStatusIndicatorProps> = ({
  status = ChannelStatusIndicatorStatus.Offline,
  size = ChannelStatusIndicatorSize.Small,
  mask,
  pulse,
  ...props
}) => {
  const indicator = (
    <ScChannelStatusIndicator
      className="tw-channel-status-indicator"
      borderRadius={
        status === ChannelStatusIndicatorStatus.Recording
          ? "border-radius-small"
          : "border-radius-rounded"
      }
      $backgroundColor={FillTokensMap[status]}
      $enablePulse={pulse}
      $size={SizeMap[size]}
      {...props}
    />
  );

  if (mask) {
    return (
      <ScChannelStatusIndicatorMask
        display={Display.InlineFlex}
        position={Position.Relative}
        background={mask}
        borderRadius={
          status === ChannelStatusIndicatorStatus.Recording
            ? BorderRadius.Small
            : BorderRadius.Rounded
        }
      >
        {indicator}
      </ScChannelStatusIndicatorMask>
    );
  } else {
    return indicator;
  }
};

ChannelStatusIndicator.displayName = "ChannelStatusIndicator";
