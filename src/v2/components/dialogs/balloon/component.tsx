import { DialogLayerProps } from "../dialog-layer";
import { withDialogLayer } from "../dialog-layer/with-dialog-layer";
import { BalloonWrapper, BalloonWrapperProps } from "./balloon-wrapper";

export interface BalloonProps extends BalloonWrapperProps, DialogLayerProps {}

export const Balloon = withDialogLayer(BalloonWrapper);
