import { FC } from "react";
import { Display, Layout } from "../../../layout";
import { Attached, AttachedProps } from "../../attached/component";
import {
  BalloonWrapper,
  BalloonWrapperProps,
} from "../balloon-wrapper/component";

export interface AttachedBalloonProps
  extends BalloonWrapperProps,
    AttachedProps {
  /**
   * @example true
   */
  show?: boolean;
}

/**
 * Legacy implementation of Balloon which uses CSS position: absolute
 *
 * @deprecated Please migrate to the new `<Balloon>` component; see Core UI 19.0.0 release notes and docs for migration steps.
 */
export const AttachedBalloon: FC<AttachedBalloonProps> = ({
  show,
  direction,
  offsetX,
  offsetY,
  ...props
}) => (
  // Display.Hide was the legacy way this worked; keeping for compatibility
  <Layout display={show ? Display.Block : Display.Hide}>
    <Attached direction={direction} offsetX={offsetX} offsetY={offsetY}>
      <BalloonWrapper {...props} />
    </Attached>
  </Layout>
);

AttachedBalloon.displayName = "AttachedBalloon";
