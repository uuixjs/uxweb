import { AlignItems, Display, Layout } from "../../layout";
import {
  CoreButton,
  CoreButtonRounding,
  CoreButtonSize,
  CoreButtonType,
} from "../core-button";
import {
  CoreButtonDropdown,
  CoreButtonDropdownType,
} from "../core-button/core-button-dropdown";
import { FC, ReactNode } from "react";
import {
  getDataProps,
  omitDataProps,
  staticTokenRule,
  styled,
} from "@uuixjs/uuixweb-lib";

import { CoreButtonLabel } from "../core-button/core-button-label";
import { CoreInteractivePublicProps } from "../../core-interactive";
import { SVGAsset } from "../../svg";
import { StaticToken } from "@uuixjs/uuixweb-lib";
import { withOverlayContext } from "../../overlay-region/context";

export interface SplitButtonDropdownProps extends CoreInteractivePublicProps {
  /**
   * Passes an `aria-label` to the component to provide context to assistive
   * devices. All standard HTML aria attributes are now supported on Core UI
   * components — see https://www.w3.org/TR/html-aria/."
   */
  "aria-label"?: string;
  type?: CoreButtonDropdownType;
}

export interface SplitButtonProps extends CoreInteractivePublicProps {
  children?: ReactNode;
  dropdown: SplitButtonDropdownProps;
  fullWidth?: boolean;
  overlay?: boolean;
  icon?: SVGAsset;
  size?: CoreButtonSize;
  type?: CoreButtonType;
}

const ScSplitButtonDropdown = styled.div`
  display: inline-flex;
  border-left-width: ${staticTokenRule("border-width-default")};
  border-left-style: solid;
  border-left-color: transparent;
`;

const ICON_SIZE_MAP: Record<CoreButtonSize, StaticToken> = {
  [CoreButtonSize.Small]: "button-size-small",
  [CoreButtonSize.Default]: "button-size-default",
  [CoreButtonSize.Large]: "button-size-large",
};

const ScSplitButtonIcon = styled.div<{ $size?: SplitButtonProps["size"] }>`
  display: flex;
  justify-content: center;
  width: ${({ $size }) =>
    staticTokenRule(ICON_SIZE_MAP[$size || CoreButtonSize.Default])};
`;
export const SplitButtonComponent: FC<SplitButtonProps> = (props) => {
  return (
    <Layout
      className="tw-split-button"
      display={props.fullWidth ? Display.Flex : Display.InlineFlex}
      alignItems={AlignItems.Center}
      fullWidth={props.fullWidth}
      {...getDataProps(props)}
    >
      <CoreButton
        {...omitDataProps(props)}
        rounding={CoreButtonRounding.Left}
        variant={props.type ? props.type : CoreButtonType.Primary}
      >
        <CoreButtonLabel icon={props.icon} size={props.size}>
          {props.children}
        </CoreButtonLabel>
      </CoreButton>
      <ScSplitButtonDropdown>
        <CoreButton
          {...props.dropdown}
          size={props.size}
          overlay={props.overlay}
          rounding={CoreButtonRounding.Right}
          variant={props.type ? props.type : CoreButtonType.Primary}
        >
          <ScSplitButtonIcon $size={props.size}>
            <CoreButtonDropdown
              size={props.size}
              type={
                props.dropdown.type
                  ? props.dropdown.type
                  : CoreButtonDropdownType.ArrowDown
              }
            />
          </ScSplitButtonIcon>
        </CoreButton>
      </ScSplitButtonDropdown>
    </Layout>
  );
};

SplitButtonComponent.displayName = "SplitButtonComponent";

export const SplitButton = withOverlayContext(SplitButtonComponent);
