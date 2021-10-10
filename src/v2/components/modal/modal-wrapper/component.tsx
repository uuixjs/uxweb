import {
  Background,
  Display,
  Elevation,
  FlexDirection,
  Layout,
} from "../../layout";
import { BorderRadius, styleVariant, styled } from "lib/ui-utils";
import { FC, ReactNode } from "react";

export enum ModalSize {
  Small = "sm",
  Medium = "md",
  Large = "lg",
}

export interface ModalWrapperProps {
  children?: ReactNode;
  elevation?: Elevation;
  size?: ModalSize | "sm" | "md" | "lg"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  borderRadius?: BorderRadius;
  fullHeight?: boolean;
}

const ScModalWrapper = styled(Layout)<{ $size: ModalWrapperProps["size"] }>`
  max-height: 100%;

  max-width: ${styleVariant("$size", {
    [ModalSize.Small]: "30rem",
    [ModalSize.Medium]: "60rem",
    [ModalSize.Large]: "80rem",
  })};
`;

export const ModalWrapper: FC<ModalWrapperProps> = ({ size, ...props }) => {
  return (
    <ScModalWrapper
      {...props}
      className="tw-modal"
      display={Display.Flex}
      flexDirection={FlexDirection.Column}
      background={Background.Base}
      borderRadius={props.borderRadius || BorderRadius.Large}
      elevation={props.elevation ?? 5}
      fullWidth
      role="dialog"
      aria-modal={true}
      fullHeight={props.fullHeight}
      $size={size}
    >
      {props.children}
    </ScModalWrapper>
  );
};
