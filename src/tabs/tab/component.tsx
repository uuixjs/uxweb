import {
  CoreInteractive,
  CoreInteractivePublicProps,
} from "../../core-interactive";
import { FC, ReactNode } from "react";
import {
  css,
  getAriaProps,
  getDataProps,
  hoverCss,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "lib";

export interface TabProps extends CoreInteractivePublicProps {
  active?: boolean;
  /**
   * @example Discover
   */
  children?: ReactNode;
}

const ScTabWrapper = styled.li`
  display: inline-block;
  font-size: ${staticTokenRule("font-size-5")};
  line-height: ${staticTokenRule("line-height-body")};
  list-style: none;

  &:not(:last-child) {
    margin-right: ${staticTokenRule("space-2")};
  }
`;

interface ScTabInteractiveProps {
  $disabled: boolean;
  $active: boolean;
}

const ScTabInteractive = styled(CoreInteractive)<ScTabInteractiveProps>`
  display: inline-flex;
  padding: ${staticTokenRule("space-05")} ${staticTokenRule("space-0")};

  color: ${({ $disabled, $active }) =>
    $disabled
      ? themeTokenRule("color-text-button-disabled")
      : $active
      ? themeTokenRule("color-text-tab-active")
      : themeTokenRule("color-text-tab")};

  box-shadow: ${({ $active }) =>
    $active &&
    css`0 -1px 0 ${themeTokenRule("color-border-tab-active")} inset`};

  opacity: ${({ $disabled }) => $disabled && "0.5"};
  cursor: ${({ $disabled }) => $disabled && "not-allowed !important"};

  ${({ $disabled }) =>
    !$disabled &&
    hoverCss`
      box-shadow: 0 -1px 0 ${themeTokenRule("color-border-tab-hover")} inset;
      text-decoration: none;
    `};
`;

/**
 * @deprecated Deprecated in favor of the new <Tabs> component which was introduced in 4.10.0.
 * Please migrate your usage of <TabWrapper> and <Tab> to the new <Tabs> component.
 * [See New Component](https://design.xarth.tv/user-interface/patterns/tabs)
 * [Release Notes](https://git.xarth.tv/core-ui/core-ui/releases/tag/v4.10.0)
 */
export const Tab: FC<TabProps> = (props) => {
  return (
    <ScTabWrapper
      className={"tw-tab"}
      role="presentation"
      {...getDataProps(props)}
    >
      <ScTabInteractive
        $disabled={!!props.disabled}
        $active={!!props.active}
        data-a-target="tw-tab-link"
        role="tab"
        disabled={props.disabled}
        download={props.download}
        linkTo={props.linkTo}
        onClick={props.onClick}
        renderLink={props.renderLink}
        tabIndex={props.tabIndex}
        targetBlank={props.targetBlank}
        {...getAriaProps(props)}
      >
        {props.children}
      </ScTabInteractive>
    </ScTabWrapper>
  );
};

Tab.displayName = "Tab";
