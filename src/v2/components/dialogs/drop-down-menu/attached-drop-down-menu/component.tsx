import { FC } from "react";
import { Display, Layout } from "../../../layout";
import { Attached, AttachedProps, BalloonDirection } from "../../attached";
import {
  DropDownMenuWrapper,
  DropDownMenuWrapperProps,
} from "../drop-down-menu-wrapper";

export type DropDownMenuDirection =
  | BalloonDirection.TopLeft
  | BalloonDirection.TopRight
  | BalloonDirection.BottomLeft
  | BalloonDirection.BottomRight;

export interface AttachedDropDownMenuProps
  extends DropDownMenuWrapperProps,
    AttachedProps {
  /** Direction the `DropDownMenu` balloon will go. */
  direction?: DropDownMenuDirection;
  /**
   * Show the `DropDownMenu`. The `DropDownMenu`'s behavior is controlled by
   * its parent.
   */
  show?: boolean;
}

/**
 * Legacy implementation of DropDownMenu which uses CSS position: absolute
 *
 * @deprecated Please migrate to the new `<DropDownMenu>` component; see Core UI 19.0.0 release notes and docs for migration steps.
 */
export const AttachedDropDownMenu: FC<AttachedDropDownMenuProps> = ({
  show,
  direction,
  offsetX,
  offsetY,
  ...props
}) => (
  // Display.Hide was the legacy way this worked; keeping for compatibility
  <Layout display={show ? Display.Block : Display.Hide}>
    <Attached direction={direction} offsetX={offsetX} offsetY={offsetY}>
      <DropDownMenuWrapper {...props} />
    </Attached>
  </Layout>
);
