import { Aspect, AspectRatio } from "../../aspect";
import { BorderRadius, getAriaProps, getDataProps } from "lib";
import { Color, FontSize, Layout } from "../../layout";
import { CoreLink, CoreLinkProps, CoreLinkType } from "../../core-link";
import { CoreText, LineHeight, TextType } from "../../core-text";

import { Card } from "../../card/card";
import { CardBody } from "../../card/card-body";
import { CardImage } from "../../card/card-image";
import { CoreImageProps } from "../../core-image";
import { FC } from "react";
import { Placeholder } from "../../placeholder";
import { getImageProps } from "../../_utils/image-props";

export interface ThumbnailCardProps
  extends CoreImageProps,
    Pick<CoreLinkProps, "linkTo"> {
  /** The meta information displayed under the title. */
  info: string | JSX.Element;
  /** Show the placeholder representation of this card */
  placeholder?: boolean;
  /** The card's title. */
  title: string;
}

/**
 * @deprecated Please use the new components named MediaCard, MediaCardImage, MediaCardMeta, etc.
 */
export const ThumbnailCard: FC<ThumbnailCardProps> = (props) => {
  const cardContent = (
    <Card key={props.title}>
      <CardImage
        aspect={AspectRatio.Aspect16x9}
        borderRadius={BorderRadius.Medium}
        {...getImageProps(props)}
      />
      <CardBody>
        <Layout margin={{ top: 0.5 }}>
          <CoreText
            className="tw-thumbnail-card__title"
            type={TextType.H3}
            fontSize={FontSize.Size5}
            lineHeight={LineHeight.Body}
            ellipsis
          >
            {props.title}
          </CoreText>
        </Layout>
        <CoreText color={Color.Alt2} ellipsis>
          {props.info}
        </CoreText>
      </CardBody>
    </Card>
  );

  if (props.placeholder) {
    return (
      <Layout>
        <Layout margin={{ bottom: 0.5 }}>
          <Aspect ratio={AspectRatio.Aspect16x9}>
            <Placeholder />
          </Aspect>
        </Layout>
        <CoreText>
          <Placeholder width={150} />
        </CoreText>
        <CoreText fontSize={FontSize.Size7}>
          <Placeholder width={100} />
        </CoreText>
      </Layout>
    );
  }

  if (props.linkTo) {
    return (
      <div
        className="tw-thumbnail-card"
        {...getDataProps(props)}
        {...getAriaProps(props)}
      >
        <CoreLink
          className="tw-thumbnail-card__link"
          linkTo={props.linkTo}
          title={props.title}
          data-a-target="tw-thumbnail-card-link"
          variant={CoreLinkType.Inherit}
          hoverUnderlineNone
        >
          {cardContent}
        </CoreLink>
      </div>
    );
  } else {
    return (
      <div className="tw-thumbnail-card" {...getDataProps(props)}>
        {cardContent}
      </div>
    );
  }
};

ThumbnailCard.displayName = "ThumbnailCard";
