import { staticTokenRule, styled, themeTokenRule } from "lib";

import { FC } from "react";
import { ThemeToken } from "lib/ui-tokens";

export enum PresenceStatus {
  Offline = "offline",
  Invisible = "invisible",
  Online = "online",
  Busy = "busy",
  Away = "away",
  Idle = "idle",
}

export interface PresenceProps {
  status?:
    | PresenceStatus
    | "offline"
    | "invisible"
    | "online"
    | "busy"
    | "away"
    | "idle"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  /** @deprecated This property no longer had styles associated with it. */
  border?: boolean;
}

const FillTokensMap: Record<PresenceStatus, ThemeToken> = {
  [PresenceStatus.Offline]: "color-fill-presence-offline",
  [PresenceStatus.Invisible]: "color-fill-presence-offline",
  [PresenceStatus.Online]: "color-fill-presence-online",
  [PresenceStatus.Busy]: "color-fill-presence-busy",
  [PresenceStatus.Away]: "color-fill-presence-away",
  [PresenceStatus.Idle]: "color-fill-presence-idle",
};

const ScPresence = styled.div`
  display: inline-flex;
  position: relative;
  width: 0.6rem;
  height: 0.6rem;
  background-color: inherit;
`;

const ScPresenceBorder = styled.div`
  position: absolute;
  top: -0.2rem;
  left: -0.2rem;
  width: 1rem;
  max-width: none;
  height: 1rem;
  background-color: inherit;
  border-radius: ${staticTokenRule("border-radius-rounded")};
`;

const ScPresenceIndicator = styled.div<{ backgroundColor: ThemeToken }>`
  position: absolute;
  width: 0.6rem;
  height: 0.6rem;
  top: 0;
  left: 0;
  border-radius: ${staticTokenRule("border-radius-rounded")};
  background-color: ${(props) => themeTokenRule(props.backgroundColor)};
`;

export const Presence: FC<PresenceProps> = ({
  status = PresenceStatus.Offline,
  ...props
}) => {
  return (
    <ScPresence className="tw-presence" {...props}>
      <ScPresenceBorder className="tw-presence__border" />
      <ScPresenceIndicator
        className="tw-presence__indicator"
        backgroundColor={FillTokensMap[status]}
      />
    </ScPresence>
  );
};

Presence.displayName = "Presence";
