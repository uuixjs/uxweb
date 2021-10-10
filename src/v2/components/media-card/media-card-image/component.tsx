import { Aspect, AspectRatio } from "../../aspect";
import { FC, ReactNode } from "react";
import { Layout, Position } from "../../layout";

import { CoreInteractivePublicProps } from "../../core-interactive";
import { CoreLink } from "../../core-link";
import { HoverAccentEffect } from "../../hover-accent-effect";
import { OverlayRegion } from "../../overlay-region";
import { styled } from "lib/ui-utils";

const ScPositionOver = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface MediaCardImageProps {
  /* An image component such as <CoreImage> */
  image?: ReactNode;
  /* <MediaCardStat> or similar component */
  topLeft?: ReactNode;
  /* <MediaCardStat> or similar component */
  topRight?: ReactNode;
  /* <MediaCardStat> or similar component */
  bottomLeft?: ReactNode;
  /* <MediaCardStat> or similar component */
  bottomRight?: ReactNode;
  /* Layer to overlay above the image but below the corner elements */
  cover?: ReactNode;
  ratio?: AspectRatio | number;
  linkProps?: CoreInteractivePublicProps;
  hoverAccentColor?: string | null;
  /**
   * Experimental alternate syntax to provide certain props.
   *
   * @deprecated Please set props directly on the component.
   */
  children?: MediaCardImageChildren;
}

export interface MediaCardImageChildren {
  image: ReactNode;
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  cover?: ReactNode;
}

export const MediaCardImage: FC<MediaCardImageProps> = (props) => {
  const image = props.image || (props.children && props.children.image);
  let cover = props.cover || (props.children && props.children.cover);
  let topLeft = props.topLeft || (props.children && props.children.topLeft);
  let topRight = props.topRight || (props.children && props.children.topRight);
  let bottomLeft =
    props.bottomLeft || (props.children && props.children.bottomLeft);
  let bottomRight =
    props.bottomRight || (props.children && props.children.bottomRight);

  topLeft = topLeft && (
    <Layout position={Position.Absolute} attachTop attachLeft margin={1}>
      {topLeft}
    </Layout>
  );

  topRight = topRight && (
    <Layout position={Position.Absolute} attachTop attachRight margin={1}>
      {topRight}
    </Layout>
  );

  bottomLeft = bottomLeft && (
    <Layout position={Position.Absolute} attachBottom attachLeft margin={1}>
      {bottomLeft}
    </Layout>
  );

  bottomRight = bottomRight && (
    <Layout position={Position.Absolute} attachBottom attachRight margin={1}>
      {bottomRight}
    </Layout>
  );

  cover = cover && (
    <ScPositionOver className="tw-media-card-image__cover">
      {cover}
    </ScPositionOver>
  );

  const card = (
    <OverlayRegion>
      <Layout position={Position.Relative}>
        <Aspect ratio={props.ratio}>{image}</Aspect>
        {cover}
        <ScPositionOver className="tw-media-card-image__corners">
          {topLeft}
          {topRight}
          {bottomLeft}
          {bottomRight}
        </ScPositionOver>
      </Layout>
    </OverlayRegion>
  );

  if (props.linkProps) {
    return (
      <HoverAccentEffect color={props.hoverAccentColor}>
        <CoreLink {...props.linkProps}>{card}</CoreLink>
      </HoverAccentEffect>
    );
  }

  return card;
};

MediaCardImage.defaultProps = {
  ratio: AspectRatio.Aspect16x9,
};

/** Does not get automatically set by '@whoaa/babel-plugin-add-react-displayname' */
MediaCardImage.displayName = "MediaCardImage";
