import { FC } from "react";
import { Display, Layout } from "../../../layout";
import { Attached, AttachedProps, BalloonDirection } from "../../attached";
import { PopoverWrapper, PopoverWrapperProps } from "../popover-wrapper";

export type PopoverDirection =
  | BalloonDirection.TopLeft
  | BalloonDirection.TopRight
  | BalloonDirection.BottomLeft
  | BalloonDirection.BottomRight;

export interface AttachedPopoverProps
  extends PopoverWrapperProps,
    AttachedProps {
  /** Direction the `Popover` balloon will go. */
  direction?: PopoverDirection;
  /**
   * Show the `Popover`. The `Popover`'s behavior is controlled by
   * its parent.
   */
  show?: boolean;
}

/**
 * Legacy implementation of Popover which uses CSS position: absolute
 *
 * @deprecated Please migrate to the new `<Popover>` component; see Core UI 19.0.0 release notes and docs for migration steps.
 */
export const AttachedPopover: FC<AttachedPopoverProps> = ({
  show,
  direction,
  offsetX,
  offsetY,
  ...props
}) => (
  // Display.Hide was the legacy way this worked; keeping for compatibility
  <Layout display={show ? Display.Block : Display.Hide}>
    <Attached direction={direction} offsetX={offsetX} offsetY={offsetY}>
      <PopoverWrapper {...props} />
    </Attached>
  </Layout>
);
