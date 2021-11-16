import {
  AlignItems,
  Background,
  Color,
  Display,
  Elevation,
  FlexDirection,
  FlexWrap,
  Layout,
  Position,
} from "../../layout";
import { BorderRadius, getAriaProps, getDataProps } from "@uuixjs/uuixweb-lib";
import { FC, ReactNode } from "react";

export interface CardProps {
  /** Display a border around the card. */
  border?: boolean;
  borderRadius?: BorderRadius;
  background?: Background;
  /**
   * The children.
   *
   * @example <CardImage
   *   src="https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-285x380.jpg"
   *   alt="Leage of Legends"
   *   aspect={AspectRatio.Aspect3x4} />
   *   <CardBody>League of Legends</CardBody>
   */
  children?: ReactNode;
  /** Display an elevation shadow on the card. */
  elevation?: Elevation;
  /** Display the card as a row. */
  row?: boolean;
}

/**
 * Cards summarize information — such as games, channels, and communities — and
 * they provide a way of performing actions or viewing more detailed parts of
 * that information.
 *
 * @deprecated Please use the new components named MediaCard, MediaCardImage, MediaCardMeta, etc.
 */
export const Card: FC<CardProps> = (props) => {
  let alignItems: AlignItems | undefined;
  let elevation: Elevation | undefined;
  let color: Color | undefined;

  if (props.row) {
    alignItems = AlignItems.Center;
  }

  if (props.elevation) {
    elevation = props.elevation;
  }

  if (props.background === Background.Overlay) {
    color = Color.Overlay;
  }

  return (
    <Layout
      className="tw-card"
      position={Position.Relative}
      {...getDataProps(props)}
      {...getAriaProps(props)}
    >
      <Layout
        display={Display.Flex}
        flexDirection={props.row ? FlexDirection.Row : FlexDirection.Column}
        alignItems={alignItems}
        elevation={elevation}
        background={props.background}
        borderRadius={props.borderRadius}
        color={color}
        border={props.border}
        flexWrap={FlexWrap.NoWrap}
      >
        {props.children}
      </Layout>
    </Layout>
  );
};

Card.displayName = "Card";
