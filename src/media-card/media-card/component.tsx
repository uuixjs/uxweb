import { Display, FlexDirection, Layout } from "../../layout";
import { FC, ReactNode } from "react";
import { Margin, getAriaProps, getDataProps } from "@uuixjs/uuixweb-lib";

export interface MediaCardProps {
  /** A <MediaCardImage> or custom image component */
  image?: ReactNode;
  /** A <MediaCardMeta> or custom meta component */
  meta?: ReactNode;
  /** Space around the Media Card  */
  margin?: Margin;
  /**
   * Experimental alternate syntax to provide certain props.
   *
   * @deprecated Please set props directly on the component.
   */
  children?: MediaCardChildren;
}

export interface MediaCardChildren {
  image: ReactNode;
  meta: ReactNode;
}

export const MediaCard: FC<MediaCardProps> = (props) => {
  const meta = props.meta || (props.children && props.children.meta);
  const image = props.image || (props.children && props.children.image);

  return (
    <Layout
      as="article"
      margin={props.margin}
      display={Display.Flex}
      flexDirection={FlexDirection.Column}
      {...getDataProps(props)}
      {...getAriaProps(props)}
    >
      {/** These are in a specific DOM order for SEO and accessibility; they get arranged for visual layout via flex-order */}
      <Layout flexOrder={2} margin={{ top: 1 }}>
        {meta}
      </Layout>
      <Layout flexOrder={1}>{image}</Layout>
    </Layout>
  );
};

MediaCard.defaultProps = {
  margin: { bottom: 2 },
};
