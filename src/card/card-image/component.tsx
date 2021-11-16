import { Aspect, AspectRatio } from "../../aspect";
import {
  BorderRadius,
  getAriaProps,
  getDataProps,
  styleVariant,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";
import { CoreImage, CoreImageProps } from "../../core-image";
import { FC, ReactNode } from "react";

import { Layout } from "../../layout";
import { getImageProps } from "../../_utils/image-props";

export enum CardImageSize {
  Default = "tw-card-img--size-default",
  Size2 = "tw-card-img--size-2",
  Size3 = "tw-card-img--size-3",
  Size4 = "tw-card-img--size-4",
  Size6 = "tw-card-img--size-6",
  Size8 = "tw-card-img--size-8",
  Size12 = "tw-card-img--size-12",
  Size16 = "tw-card-img--size-16",
  Size24 = "tw-card-img--size-24",
  Size32 = "tw-card-img--size-32",
}

export interface CardImageProps extends CoreImageProps {
  aspect?: AspectRatio;
  borderRadius?: BorderRadius;
  children?: ReactNode;
  size?: CardImageSize;
  overflow?: boolean;
}

const ScCardImage = styled(Layout)<{ $size: CardImageProps["size"] }>`
  flex-shrink: 0;
  background-color: ${themeTokenRule("color-background-placeholder")};
  overflow: hidden;

  width: ${styleVariant("$size", {
    [CardImageSize.Default]: "100%",
    [CardImageSize.Size2]: "2rem",
    [CardImageSize.Size3]: "3rem",
    [CardImageSize.Size4]: "4rem",
    [CardImageSize.Size6]: "6rem",
    [CardImageSize.Size8]: "8rem",
    [CardImageSize.Size12]: "12rem",
    [CardImageSize.Size16]: "16rem",
    [CardImageSize.Size24]: "24rem",
    [CardImageSize.Size32]: "32rem",
  })};
`;

/**
 * @deprecated Please use the new components named MediaCard, MediaCardImage, MediaCardMeta, etc.
 */
export const CardImage: FC<CardImageProps> = ({
  size = CardImageSize.Default,
  ...props
}) => {
  return (
    <ScCardImage
      $size={size}
      className="tw-card-image"
      borderRadius={props.borderRadius}
      {...getDataProps(props)}
      {...getAriaProps(props)}
    >
      <Aspect
        ratio={props.aspect ? props.aspect : AspectRatio.Aspect16x9}
        overflow={props.overflow}
      >
        <CoreImage {...getImageProps(props)} />
      </Aspect>
      {props.children}
    </ScCardImage>
  );
};

CardImage.displayName = "CardImage";
