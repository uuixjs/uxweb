import { Display, InjectLayout } from "../../layout";

import { AvatarProps } from "..";
import { CoreImage } from "../../core-image";
import { FC } from "react";
import { getAriaProps } from "@uuixjs/uuixweb-lib";

export type ImageAvatarProps = Omit<AvatarProps, "userLogin">;
/**
 * CoreImage for use in the Avatar component.
 */
export const ImageAvatar: FC<ImageAvatarProps> = (props) => {
  return (
    <InjectLayout
      display={Display.Block} // The image needs to not be 'inline' otherwise it has whitespace below it
      borderRadius={props.borderRadius}
      fullWidth
    >
      <CoreImage
        className={"tw-image-avatar"}
        src={props.src || ""}
        alt={props.alt}
        srcSet={props.srcSet}
        sizes={props.sizes}
        onLoad={props.onLoad}
        onError={props.onError}
        ref={props.imageRefHandler}
        {...getAriaProps(props)}
      />
    </InjectLayout>
  );
};

ImageAvatar.displayName = "ImageAvatar";
