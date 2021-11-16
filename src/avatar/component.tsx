import {
  BorderRadius,
  getAriaProps,
  getDataProps,
  rem,
  staticTokenRule,
  styled,
} from "@uuixjs/uuixweb-lib";
import { EventHandler, FC, Ref, SyntheticEvent } from "react";
import { Layout, Overflow } from "../layout";
import { Presence, PresenceStatus } from "../presence";

import { CoreImageProps } from "../core-image";
import { DefaultAvatar } from "./default-avatar";
import { ImageAvatar } from "./image-avatar";
import { Placeholder } from "../placeholder";
import { userCustomizedImage } from "./utils/user-customized-image";

const AVATAR_CLASSNAME = "tw-avatar";

export type AvatarSize =
  | 10
  | 15
  | 20
  | 24
  | 30
  | 36
  | 40
  | 50
  | 60
  | 64
  | 80
  | 96
  | 120
  | 300;

export interface AvatarProps {
  /** The border radius of the avatar. */
  borderRadius?: BorderRadius;
  /**
   * The size of the avatar.
   *
   * @example 40
   */
  size: AvatarSize;
  /**
   * Alternative text for the image.
   *
   * @example Required alternative text.
   */
  alt: string;
  /** Used to compute default avatar color */
  userLogin: string | undefined | null;
  /** The source of the avatar image. */
  src?: string | null;
  /** A configuration object for responsive image display. Accepts an object with valid descriptors for keys and image urls for values. */
  srcSet?: CoreImageProps["srcSet"];
  /** The intended display size of the image at various breakpoints. Accepts an array of objects that contain a size, and optionally a mediaCondition. */
  sizes?: CoreImageProps["sizes"];
  /** Event handler emitted if the image fails to load. */
  onError?: EventHandler<SyntheticEvent<HTMLImageElement>>;
  /** Event handler emitted when the image loads.  */
  onLoad?: EventHandler<SyntheticEvent<HTMLImageElement>>;
  /** Show or hide the presence indicator. */
  presenceIndicator?: boolean;
  /** Status of the channel represented. */
  presenceStatus?: PresenceStatus;
  imageRefHandler?: Ref<HTMLImageElement>;
}

const ScAvatar = styled.figure<{ $size: AvatarProps["size"] }>`
  position: relative;
  background-color: inherit;

  ${(props) => {
    return {
      width: rem(props.$size),
      height: rem(props.$size),
    };
  }}
`;

const ScAvatarPresence = styled.div<{ $offset: boolean }>`
  border-radius: ${staticTokenRule("border-radius-rounded")};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -0.5rem;
  bottom: -0.5rem;
  width: 1rem;
  height: 1rem;
  background-color: inherit;

  ${(props) => {
    if (props.$offset) {
      return {
        top: "calc(86% - 0.5rem)",
        left: "calc(86% - 0.5rem)",
      };
    }
  }}
`;

/**
 * Avatars are a visual represention channels on Twitch. They can also indicate
 * a channels presence — such as online or away.
 */
export const Avatar: FC<AvatarProps> = ({
  borderRadius = BorderRadius.Rounded,
  size,
  ...props
}) => {
  let indicator: JSX.Element | undefined;

  if (props.presenceIndicator) {
    indicator = (
      <ScAvatarPresence
        className={`${AVATAR_CLASSNAME}__presence`}
        $offset={borderRadius === BorderRadius.Rounded}
      >
        <Presence border status={props.presenceStatus} />
      </ScAvatarPresence>
    );
  }

  let content;
  if (
    (props.src || props.srcSet) &&
    userCustomizedImage(props.src || props.srcSet)
  ) {
    content = (
      <ImageAvatar borderRadius={borderRadius} size={size} {...props} />
    );
  } else if (props.userLogin) {
    // TS only respects the type narrowing implied by the conditional above (that ensures userLogin is defined)
    // if we split it out into an explicit prop for DefaultAvatar.
    content = (
      <DefaultAvatar
        borderRadius={borderRadius}
        size={size}
        {...props}
        userLogin={props.userLogin}
      />
    );
  } else {
    content = (
      <Layout borderRadius={borderRadius} overflow={Overflow.Hidden}>
        <Placeholder width={size} height={size} />
      </Layout>
    );
  }

  return (
    <ScAvatar
      aria-label={props.alt}
      $size={size}
      className={AVATAR_CLASSNAME}
      {...getAriaProps(props)}
      {...getDataProps(props)}
    >
      {content}
      {indicator}
    </ScAvatar>
  );
};

Avatar.displayName = "Avatar";
