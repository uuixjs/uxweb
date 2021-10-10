import { CoreButtonSize } from "../component";
import { FC } from "react";
import { Icon } from "../../../icon";
import { SVGAsset } from "../../../svg";
import { TEST_AUTOMATION_SELECTORS } from "../../../../tests/selectors";
import { styled } from "lib/ui-utils";

export interface CoreButtonIconProps {
  icon: SVGAsset;
  size?: CoreButtonSize | "default" | "small" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
}

const SizeMap: Record<CoreButtonSize, string> = {
  [CoreButtonSize.Small]: "1.6rem",
  [CoreButtonSize.Default]: "2rem",
  [CoreButtonSize.Large]: "2.4rem",
};

const ScCoreButtonIcon = styled.div<{ size: string }>`
  display: inline-flex;
  align-items: center;
  width: ${(props) => props.size};
`;

/**
 * Buttons communicate that an action will happen when clicked. Best used as
 * primary actions inside of another component such as a Modals, Cards, and/or
 * forms. **Buttons should never be used for generic links.**
 */
export const CoreButtonIcon: FC<CoreButtonIconProps> = ({
  icon,
  size = CoreButtonSize.Default,
  ...props
}) => {
  return (
    <ScCoreButtonIcon
      className="tw-core-button-icon"
      size={SizeMap[size]}
      {...props}
    >
      <Icon
        fill
        asset={icon}
        data-a-selector={TEST_AUTOMATION_SELECTORS.CoreButtonIcon}
      />
    </ScCoreButtonIcon>
  );
};

CoreButtonIcon.displayName = "CoreButtonIcon";
