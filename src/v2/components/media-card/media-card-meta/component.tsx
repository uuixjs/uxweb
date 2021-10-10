import { Display, FlexWrap, Layout } from "../../layout";
import { FC, ReactNode } from "react";
import { MediaCardLink, MediaCardLinkProps } from "../media-card-link";
import { MediaCardTitle, MediaCardTitleProps } from "../media-card-title";
import { staticTokenRule, styled } from "lib/ui-utils";

const ScImageWrapper = styled.div`
  order: 1;
  flex-basis: 4rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: ${staticTokenRule("space-1")};
`;

const ScTextWrapper = styled.div`
  order: 2;
  flex-grow: 1;
  flex-shrink: 1;

  /* some width is required in IE11 to trigger text ellipsis */
  width: 100%;

  /**
   * This "min-width: 0" property is responsible for ensuring
   * that the ellipsis trigger on the text component contained inside.
   * Because we indend to allow other components inside the
   * container to show up outside of it (i.e. a ballon triggered from
   * inside the preview card information section bellow the image)
   * we cannot simply just apply "overflow: hidden" to the entire section
  */
  min-width: 0;
`;

const ScTextMargin = styled.div`
  margin-bottom: 0.3rem;
`;

export interface MediaCardMetaProps {
  /** The main title for the card, appears first in DOM */
  title?: MediaCardTitleProps | ReactNode;
  /** Zero or more links to appear below the title */
  links?: MediaCardLinkProps | MediaCardLinkProps[] | ReactNode;
  menu?: ReactNode;
  /** Small image displayed next to text */
  image?: ReactNode;
  /** Space for any additional actions or metadata */
  actions?: ReactNode;
  /**
   * Experimental alternate syntax to provide certain props.
   *
   * @deprecated Please set props directly on the component.
   */
  children?: MediaCardMetaChildren;
}

export interface MediaCardMetaChildren {
  image?: ReactNode;
  actions?: ReactNode;
}

export const MediaCardMeta: FC<MediaCardMetaProps> = (props) => {
  let actions = props.actions || (props.children && props.children.actions);
  let image = props.image || (props.children && props.children.image);

  image = image && <ScImageWrapper>{image}</ScImageWrapper>;

  actions = actions && (
    <Layout
      flexGrow={1}
      flexShrink={1}
      fullWidth // Required to fix an IE11 bug where text doesn't wrap: https://stackoverflow.com/q/35111090
    >
      {actions}
    </Layout>
  );

  const menu = props.menu && (
    <Layout flexGrow={0} flexShrink={0} flexOrder={3}>
      {props.menu}
    </Layout>
  );

  let title = props.title;

  if (isMediaCardTitleProps(props.title)) {
    title = <MediaCardTitle {...props.title} />;
  } else if (typeof props.title === "string") {
    title = <MediaCardTitle>{props.title}</MediaCardTitle>;
  }

  let links = props.links;

  if (isMediaCardLinkProps(props.links)) {
    links = <MediaCardLink {...props.links} />;
  } else if (isMediaCardLinkPropsArray(props.links)) {
    links = props.links.map((p, i) => <MediaCardLink {...p} key={i} />);
  }

  const text = (
    <ScTextWrapper>
      {title && <ScTextMargin>{title}</ScTextMargin>}
      {links && <ScTextMargin>{links}</ScTextMargin>}
      {actions}
    </ScTextWrapper>
  );

  return (
    <Layout display={Display.Flex} flexWrap={FlexWrap.NoWrap}>
      {/** These are in a specific DOM order for SEO and accessibility; they get arranged for visual layout via flex-order */}
      {text}
      {image}
      {menu}
    </Layout>
  );
};

function isMediaCardTitleProps(
  props: MediaCardTitleProps | ReactNode,
): props is MediaCardTitleProps {
  return (
    props !== null &&
    typeof props === "object" &&
    props.hasOwnProperty("children") &&
    typeof (props as MediaCardTitleProps).children === "string"
  );
}

function isMediaCardLinkProps(
  props: MediaCardLinkProps | ReactNode,
): props is MediaCardLinkProps {
  return (
    props !== null &&
    typeof props === "object" &&
    props.hasOwnProperty("children") &&
    typeof (props as MediaCardLinkProps).children === "string"
  );
}

function isMediaCardLinkPropsArray(
  props: MediaCardLinkProps | ReactNode,
): props is MediaCardLinkProps[] {
  return Array.isArray(props) && props.every((p) => isMediaCardLinkProps(p));
}
