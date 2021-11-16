import {
  BorderRadiusMixinProps,
  css,
  getBorderRadiusStyles,
  staticTokenRule,
  styled,
} from "@uuixjs/uuixweb-lib";
import { FC, memo } from "react";

import { AvatarProps } from "..";
import { Icon } from "../../icon";
import { SVGAsset } from "../../svg";
import { StaticToken } from "lib/ui-tokens";

/** Defines the classnames corresponding to each accent color, which are assigned to users who do not have a custom avatar selection. */
const DEFAULT_AVATAR_COLORS: StaticToken[] = [
  "color-brand-accent-carrot",
  "color-brand-accent-dragonfruit",
  "color-brand-accent-eggplant",
  "color-brand-accent-grape",
  "color-brand-accent-lime",
  "color-brand-accent-marine",
  "color-brand-accent-seafoam",
  "color-brand-accent-sun",
  "color-brand-accent-turquoise",
  "color-brand-accent-wine",
  "color-brand-muted-emerald",
  "color-brand-muted-ice",
  "color-brand-muted-mustard",
];

const DEFAULT_AVATAR_COLORS_COLOR_MAP: Record<string, StaticToken> = {
  "color-brand-accent-carrot": "color-black",
  "color-brand-accent-dragonfruit": "color-white",
  "color-brand-accent-eggplant": "color-white",
  "color-brand-accent-grape": "color-white",
  "color-brand-accent-lime": "color-black",
  "color-brand-accent-marine": "color-white",
  "color-brand-accent-seafoam": "color-black",
  "color-brand-accent-sun": "color-black",
  "color-brand-accent-turquoise": "color-black",
  "color-brand-accent-wine": "color-white",
  "color-brand-muted-emerald": "color-black",
  "color-brand-muted-ice": "color-black",
  "color-brand-muted-mustard": "color-black",
};

export type DefaultAvatarProps = Pick<AvatarProps, "borderRadius" | "size"> & {
  // @deprecated the user service now implements default avatars as PNGs, so we no longer need to rely on this code for the default user avatar experience.
  userLogin: string;
};

// @deprecated the user service now implements default avatars as PNGs, so we no longer need to rely on this code for the default user avatar experience.
export const ScDefaultAvatar = styled.div<
  { userLogin: DefaultAvatarProps["userLogin"] } & BorderRadiusMixinProps
>`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100%;
  ${getBorderRadiusStyles}
  ${({ userLogin }) => assignAvatarColor(userLogin)}
`;

const ScDefaultAvatarIcon = styled.div`
  width: calc(2 / 3 * 100%);
  height: calc(2 / 3 * 100%);
`;
export const DefaultAvatarComponent: FC<DefaultAvatarProps> = ({
  size,
  ...props
}) => {
  return (
    <ScDefaultAvatar {...props}>
      <ScDefaultAvatarIcon className="tw-default-avatar__icon">
        {size >= 20 && <Icon fill asset={SVGAsset.Account} />}
      </ScDefaultAvatarIcon>
    </ScDefaultAvatar>
  );
};

/**
 * Combines the first letter of the user's Login with a 'random' UltraViolet accent color
 */
export const DefaultAvatar = memo(DefaultAvatarComponent);
DefaultAvatar.displayName = "DefaultAvatar";

function assignAvatarColor(login: string) {
  const sumOfCharCodes = login
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const assignedAvatarColor =
    DEFAULT_AVATAR_COLORS[sumOfCharCodes % DEFAULT_AVATAR_COLORS.length];

  return css`
    background-color: ${staticTokenRule(assignedAvatarColor as StaticToken)};
    color: ${staticTokenRule(
      DEFAULT_AVATAR_COLORS_COLOR_MAP[assignedAvatarColor],
    )};
  `;
}
