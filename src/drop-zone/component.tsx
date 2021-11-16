import {
  BorderRadius,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";
import { FC, ReactNode } from "react";

import { Layout } from "../layout";

export interface DropZoneProps {
  borderRadius?: BorderRadius;
  /**
   * Children
   */
  children?: ReactNode;
  /** Provide feedback when the element is dragged over. */
  dragOver?: boolean;
  /** Provide feedback when an error occurs. */
  error?: boolean;
  /** Display the element as disabled – remove ability to interact with it. */
  disabled?: boolean;
}

interface ScDropZoneProps {
  $dragOver?: DropZoneProps["dragOver"];
  $error?: DropZoneProps["error"];
  $disabled: DropZoneProps["disabled"];
}

const ScDropZone = styled(Layout)<ScDropZoneProps>`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;

  border-width: ${staticTokenRule("border-width-input")};
  border-style: dashed;
  border-color: ${({ $error, $dragOver }) =>
    $error
      ? themeTokenRule("color-border-error")
      : $dragOver
      ? themeTokenRule("color-border-brand")
      : themeTokenRule("color-border-base")};

  user-select: none;

  ${({ $disabled }) =>
    $disabled && {
      cursor: "not-allowed",
      opacity: 0.5,
    }}
`;

/**
 * This component provides an interface for drag and drop inputs.
 */
export const DropZone: FC<DropZoneProps> = ({
  borderRadius = BorderRadius.Medium,
  disabled,
  dragOver,
  error,
  ...props
}) => {
  return (
    <ScDropZone
      $disabled={disabled}
      $dragOver={dragOver}
      $error={error}
      className="tw-drop-zone"
      borderRadius={borderRadius}
      {...props}
    >
      <div className="tw-drop-zone__content">{props.children}</div>
    </ScDropZone>
  );
};

DropZone.displayName = "DropZone";
