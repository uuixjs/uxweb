import { FC } from "react";
import { ModalLayer, ModalLayerProps } from "../modal-layer";
import { ModalWrapper, ModalWrapperProps } from "../modal-wrapper";

export interface ModalProps extends ModalWrapperProps, ModalLayerProps {}

/**
 * Composes Core UI `<ModalLayer>` and `<ModalWrapper>`
 */
export const Modal: FC<ModalProps> = ({
  children,
  elevation,
  size,
  borderRadius,
  fullHeight,
  ...modalLayerProps
}) => (
  <ModalLayer {...modalLayerProps}>
    <ModalWrapper
      children={children}
      elevation={elevation}
      size={size}
      borderRadius={borderRadius}
      fullHeight={fullHeight}
    />
  </ModalLayer>
);
