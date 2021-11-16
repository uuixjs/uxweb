import { FC, ReactNode } from "react";
import { Layout, Overflow, Position } from "../../layout";
import { getAriaProps, getDataProps } from "@uuixjs/uuixweb-lib";

export interface CardBodyProps {
  overflow?: Overflow;
  children?: ReactNode;
}

/**
 * @deprecated Please use the new components named MediaCard, MediaCardImage, MediaCardMeta, etc.
 */
export const CardBody: FC<CardBodyProps> = (props) => {
  return (
    <Layout
      className="tw-card-body"
      overflow={props.overflow}
      position={Position.Relative}
      {...getDataProps(props)}
      {...getAriaProps(props)}
    >
      {props.children}
    </Layout>
  );
};

CardBody.displayName = "CardBody";
