import { DialogLayerProps } from "../dialog-layer";
import { withDialogLayer } from "../dialog-layer/with-dialog-layer";
import {
  DropDownMenuWrapper,
  DropDownMenuWrapperProps,
} from "./drop-down-menu-wrapper";

export interface DropDownMenuProps
  extends DropDownMenuWrapperProps,
    DialogLayerProps {}

export const DropDownMenu = withDialogLayer(DropDownMenuWrapper);
