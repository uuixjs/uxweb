import { FC } from "react";
import { SVGAsset } from "../../../svg";
import { CoreButtonSize } from "../component";
import { CoreButtonIcon } from "../core-button-icon";

export enum CoreButtonDropdownType {
  ArrowDown = 1,
  ArrowUp = 2,
  Select = 3,
}

const DropdownType = {
  [CoreButtonDropdownType.ArrowUp]: SVGAsset.AngleUp,
  [CoreButtonDropdownType.ArrowDown]: SVGAsset.AngleDown,
  [CoreButtonDropdownType.Select]: SVGAsset.GlyphArrUpDown,
};

export interface CoreButtonDropdownProps {
  type?: CoreButtonDropdownType;
  size?: CoreButtonSize | "default" | "small" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
}

/**
 * Buttons communicate that an action will happen when clicked. Best used as
 * primary actions inside of another component such as a Modals, Cards, and/or
 * forms. **Buttons should never be used for generic links.**
 */
export const CoreButtonDropdown: FC<CoreButtonDropdownProps> = (props) => {
  return (
    <CoreButtonIcon
      size={props.size}
      icon={
        props.type
          ? DropdownType[props.type]
          : DropdownType[CoreButtonDropdownType.ArrowDown]
      }
    />
  );
};

CoreButtonIcon.displayName = "CoreButtonDropdown";
