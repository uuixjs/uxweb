import { Aspect, AspectRatio } from "../../aspect";
import {
  BorderRadius,
  getAriaProps,
  getDataProps,
  hoverCss,
  styled,
  themeTokenRule,
} from "lib";
import { Color, Display, FontSize, Layout } from "../../layout";
import { CoreLink, CoreLinkType } from "../../core-link";
import { CoreText, LineHeight, TextType } from "../../core-text";
import { Tag, TagProps } from "../../tag";

import { Card } from "../../card/card";
import { CardBody } from "../../card/card-body";
import { CardImage } from "../../card/card-image";
import { CoreImageProps } from "../../core-image";
import { CoreInteractivePublicProps } from "../../core-interactive";
import { FC } from "react";
import { Placeholder } from "../../placeholder";
import { getImageProps } from "../../../_utils/image-props";

export interface BoxArtCardProps
  extends CoreImageProps,
    Omit<CoreInteractivePublicProps, "refHandler"> {
  /**
   * The meta information displayed under the title.
   *
   * @example 106,303 viewers
   */
  info: string | JSX.Element;
  /** Show the placeholder representation of this card */
  placeholder?: boolean;
  /** A list of tag interfaces to render into tags underneath the card body */
  tags?: TagProps[];
  /**
   * The card's title.
   *
   * @example League of Legends
   */
  title: string;
  /** Displays the BoxArt as unavailable to launch */
  unavailable?: boolean;
}

const ScBoxArtCardImage = styled.div<{
  unavailable?: BoxArtCardProps["unavailable"];
  disabled?: BoxArtCardProps["disabled"];
}>`
  ${({ unavailable, disabled }) =>
    unavailable &&
    !disabled && {
      opacity: 0.5,
    }}
`;

const ScBoxArtCardLink = styled(CoreLink)`
  ${hoverCss`
    color: ${themeTokenRule("color-text-base")};
  `}

  ${({ disabled }) =>
    disabled && {
      cursor: "not-allowed",
      opacity: 0.5,
    }};
`;

/**
 * Box art cards can be used to link to game and category views.
 *
 * @deprecated Please use the new components named MediaCard, MediaCardImage, MediaCardMeta, etc.
 */
export const BoxArtCard: FC<BoxArtCardProps> = ({
  unavailable,
  disabled,
  ...props
}) => {
  const cardContent = (
    <>
      <ScBoxArtCardImage
        className="tw-box-art-card__image"
        data-test-selector="tw-card-image"
        data-a-target="tw-card-image"
        unavailable={unavailable}
        disabled={disabled}
      >
        <CardImage
          aspect={AspectRatio.BoxArt}
          borderRadius={BorderRadius.Medium}
          {...getImageProps(props)}
        />
      </ScBoxArtCardImage>
      <CardBody>
        <Layout
          data-test-selector="tw-card-title"
          data-a-target="tw-card-title"
          margin={{ top: 0.5 }}
        >
          <CoreText
            className="tw-box-art-card__title"
            type={TextType.H3}
            fontSize={FontSize.Size5}
            lineHeight={LineHeight.Body}
            ellipsis
          >
            {props.title}
          </CoreText>
          <CoreText color={Color.Alt2} ellipsis>
            {props.info}
          </CoreText>
        </Layout>
      </CardBody>
    </>
  );

  if (props.placeholder) {
    return (
      <>
        <Layout margin={{ bottom: 0.5 }}>
          <Aspect ratio={AspectRatio.Aspect3x4}>
            <Placeholder />
          </Aspect>
        </Layout>
        <CoreText>
          <Placeholder width={150} />
        </CoreText>
        <CoreText fontSize={FontSize.Size7}>
          <Placeholder width={100} />
        </CoreText>
      </>
    );
  }

  return (
    <div
      className="tw-box-art-card"
      {...getDataProps(props)}
      {...getAriaProps(props)}
    >
      <Card key={props.title}>
        {props.linkTo || props.onClick || disabled ? (
          <ScBoxArtCardLink
            className="tw-box-art-card__link"
            data-a-target="tw-box-art-card-link"
            disabled={disabled}
            download={props.download}
            linkTo={props.linkTo}
            aria-label={props.title}
            onClick={props.onClick}
            renderLink={props.renderLink}
            targetBlank={props.targetBlank}
            tabIndex={props.tabIndex}
            variant={CoreLinkType.Inherit}
            hoverColorInherit={disabled || unavailable}
            hoverUnderlineNone
          >
            {cardContent}
          </ScBoxArtCardLink>
        ) : (
          cardContent
        )}
        {props.tags && (
          <Layout className="tw-box-art-card__tags" margin={{ top: 0.5 }}>
            {props.tags.map((tag, i) => (
              <Layout
                key={i}
                fontSize={FontSize.Size7}
                display={Display.InlineBlock}
                margin={{ right: 0.5, bottom: 0.5 }}
              >
                <Tag {...tag} data-a-target={tag.label} />
              </Layout>
            ))}
          </Layout>
        )}
      </Card>
    </div>
  );
};

BoxArtCard.displayName = "BoxArtCard";
