import { FC } from "react";
import { CoreInteractivePublicProps } from "../../core-interactive";
import { CoreLink, CoreLinkType } from "../../core-link";
import { CoreText } from "../../core-text";
import { Color } from "../../layout";

export interface MediaCardLinkProps extends CoreInteractivePublicProps {
  children: string;
}

export const MediaCardLink: FC<MediaCardLinkProps> = (props) => {
  return (
    <CoreText color={Color.Alt2} ellipsis>
      <CoreLink variant={CoreLinkType.Inherit} hoverUnderlineNone {...props}>
        {props.children}
      </CoreLink>
    </CoreText>
  );
};
