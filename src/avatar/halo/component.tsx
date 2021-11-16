import { Aspect, AspectRatio } from "../../aspect";
import { Background, Layout } from "../../layout";
import {
  CoreInteractive,
  CoreInteractivePublicProps,
} from "../../core-interactive";
import { FC, ReactNode } from "react";
import {
  focusVisible,
  hoverCss,
  rem,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";

import { ChannelStatusIndicatorStatus } from "../../channel-status-indicator";

export interface AvatarHaloProps
  extends ScHaloProps,
    CoreInteractivePublicProps {
  background?: Background;
  children: ReactNode;
  indicator?: ReactNode;
}

interface ScHaloProps {
  size: number;
  status?:
    | ChannelStatusIndicatorStatus.Offline
    | ChannelStatusIndicatorStatus.Live;
}

const ScHalo = styled(CoreInteractive)<ScHaloProps>`
  display: block;
  width: ${(props) => rem(props.size)};
  height: ${(props) => rem(props.size)};
  position: relative;
  background-color: inherit;
  padding: 0.2rem;
  border-width: 0.2rem;
  border-style: solid;
  border-color: ${(props) =>
    props.status === ChannelStatusIndicatorStatus.Offline
      ? themeTokenRule("color-fill-offline")
      : staticTokenRule("color-accent")};
  z-index: ${staticTokenRule("z-index-default")};
  border-radius: ${staticTokenRule("border-radius-rounded")};

  &::before {
    content: "";
    transition-property: transform;
    transition-duration: ${staticTokenRule("timing-short")};
    border-radius: ${staticTokenRule("border-radius-rounded")};
    z-index: ${staticTokenRule("z-index-below")};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: -0.2rem;
    border-width: 0.2rem;
    border-style: solid;
    border-color: ${(props) =>
      props.status === ChannelStatusIndicatorStatus.Offline
        ? themeTokenRule("color-fill-offline")
        : staticTokenRule("color-accent")};
  }

  ${hoverCss`
    &::before {
      transform: scale(${biggerSize});
    }

    &:active {
      &::before {
        transform: scale(1);
      }
    }
  `}

  ${focusVisible`
    &::before {
      transform: scale(${biggerSize});
    }

    &:active {
      &::before {
        transform: scale(1);
      }
    }
  `}
`;

function biggerSize({ size }: { size: number }) {
  return (size + 3) / size;
}

const ScHaloIndicator = styled(Layout)`
  background-color: ${(props) =>
    props.background
      ? { "background-color": props.background }
      : themeTokenRule("color-background-body")};
  position: absolute;
  bottom: 0;
  left: 50%;
  right: 50%;
  display: flex;
  justify-content: center;
  margin-bottom: -0.5rem;
`;

export const AvatarHalo: FC<AvatarHaloProps> = ({
  children,
  indicator,
  background,
  ...ringProps
}) => {
  return (
    <ScHalo className="tw-halo" {...ringProps}>
      <Aspect ratio={AspectRatio.Aspect1x1}>{children}</Aspect>
      {indicator && (
        <ScHaloIndicator className="tw-halo__indicator" background={background}>
          {indicator}
        </ScHaloIndicator>
      )}
    </ScHalo>
  );
};

AvatarHalo.displayName = "AvatarHalo";
