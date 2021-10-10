import { AlignItems, Display, JustifyContent, Layout } from "../../../layout";
import {
  CoreButtonDropdown,
  CoreButtonDropdownType,
} from "../core-button-dropdown";
import { FC, ReactNode } from "react";
import { staticTokenRule, styled } from "lib";

import { CoreButtonIcon } from "../core-button-icon";
import { CoreButtonSize } from "..";
import { SVGAsset } from "../../../svg";
import { TEST_AUTOMATION_SELECTORS } from "../../../../tests/selectors";

export interface CoreButtonLabelProps {
  labelAlign?: JustifyContent;
  children?: ReactNode;
  fullWidth?: boolean;
  icon?: SVGAsset;
  size?: CoreButtonSize | "default" | "small" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  dropdown?: boolean | CoreButtonDropdownType;
}

interface ScCoreButtonLabelProps {
  hasIcon?: boolean;
  isDropdown?: boolean;
  isFullWidth?: boolean;
}

const ScCoreButtonLabel = styled.div<ScCoreButtonLabelProps>`
  display: flex;
  align-items: center;
  flex-grow: ${(props) => (props.isDropdown || props.isFullWidth ? 1 : 0)};
  padding-top: 0;
  padding-bottom: 0;
  padding-left: ${(props) =>
    props.hasIcon
      ? `calc(${staticTokenRule("button-padding-x")(props)} - 0.2rem)`
      : staticTokenRule("button-padding-x")(props)};
  padding-right: ${(props) =>
    props.isDropdown
      ? `calc(${staticTokenRule("button-padding-x")(props)} - 0.2rem)`
      : staticTokenRule("button-padding-x")(props)};
`;

export const CoreButtonLabel: FC<CoreButtonLabelProps> = ({
  children,
  dropdown,
  fullWidth,
  icon,
  labelAlign,
  size,
  ...props
}) => {
  return (
    <ScCoreButtonLabel
      hasIcon={!!icon}
      isFullWidth={fullWidth}
      isDropdown={!!dropdown}
      {...props}
    >
      {icon && (
        <Layout
          margin={icon && (children || dropdown) ? { right: 0.5 } : 0}
          display={Display.Flex}
          alignItems={AlignItems.Center}
        >
          <CoreButtonIcon icon={icon} size={size} />
        </Layout>
      )}
      {children && (
        <Layout
          flexGrow={dropdown || fullWidth ? 1 : 0}
          data-a-target={TEST_AUTOMATION_SELECTORS.CoreButtonLabelText}
          display={Display.Flex}
          alignItems={AlignItems.Center}
          justifyContent={labelAlign ? labelAlign : JustifyContent.Start}
        >
          {children}
        </Layout>
      )}
      {dropdown && (
        <Layout
          margin={{ left: 0.5 }}
          display={Display.Flex}
          alignItems={AlignItems.Center}
        >
          <CoreButtonDropdown
            size={size}
            type={
              dropdown === true ? CoreButtonDropdownType.ArrowDown : dropdown
            }
          />
        </Layout>
      )}
    </ScCoreButtonLabel>
  );
};
