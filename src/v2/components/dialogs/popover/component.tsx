import { DialogLayerProps } from "../dialog-layer";
import { withDialogLayer } from "../dialog-layer/with-dialog-layer";
import { PopoverWrapper, PopoverWrapperProps } from "./popover-wrapper";

export interface PopoverProps extends PopoverWrapperProps, DialogLayerProps {}

export const Popover = withDialogLayer(PopoverWrapper);
