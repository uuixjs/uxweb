import {
  AlignItems,
  Color,
  Display,
  FlexDirection,
  InjectLayout,
  JustifyContent,
  Layout,
} from "../../../layout";
import {
  AttachedTooltip,
  TooltipAlign,
  TooltipDirection,
} from "../../tooltip/attached-tooltip";
import {
  BorderRadius,
  MarginProps,
  getMarginStyles,
  styled,
} from "lib/ui-utils";
import {
  ButtonIcon,
  ButtonIconProps,
  ButtonIconType,
} from "../../../button/button-icon";
import { CloseButtonProps, CoreDismissible } from "../../../core-dismissible";
import { FC, ReactNode } from "react";
import { PopoverTitle, PopoverTitleProps } from "../popover-title";

import { withOverlayContext } from "../../../overlay-region/context";

export interface PopoverHeaderProps {
  /** This ID attribute must be the same for all elements for a given popover in order to set the correct aria attribute values. In other words, a Popover, PopoverHeader and PopoverBody should each receive the same string. */
  popoverId: string;
  title?: PopoverTitleProps | ReactNode;
  buttonLeftPrimary?: ButtonIconProps;
  buttonLeftSecondary?: ButtonIconProps;
  buttonRightPrimary: CloseButtonProps;
  buttonRightSecondary?: ButtonIconProps;
  overlay?: boolean;
}

const ScPopoverHeader = styled(Layout)`
  min-height: 5rem;
  display: flex;
  flex-shrink: 0;
`;

const ScPopoverHeaderIconSlot = styled.div<MarginProps>`
  ${getMarginStyles}
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 3rem;
`;

export const PopoverHeaderComponent: FC<PopoverHeaderProps> = ({
  buttonLeftPrimary,
  buttonLeftSecondary,
  buttonRightPrimary,
  buttonRightSecondary,
  overlay,
  popoverId,
  title,
  ...props
}) => {
  const leftPrimaryButton = buttonLeftPrimary || buttonLeftSecondary;
  const leftSecondaryButton = buttonLeftPrimary && buttonLeftSecondary;
  const rightPrimaryButton = buttonRightPrimary || buttonRightSecondary;
  const rightSecondaryButton = buttonRightPrimary && buttonRightSecondary;

  return (
    <ScPopoverHeader
      className="tw-popover-header"
      color={overlay ? Color.Overlay : Color.Base}
      borderRadius={{
        topLeft: BorderRadius.Medium,
        topRight: BorderRadius.Medium,
      }}
      elevation={1}
      padding={{ y: 0.5, x: 1 }}
      {...props}
    >
      {leftPrimaryButton || rightPrimaryButton ? (
        <ScPopoverHeaderIconSlot
          margin={{ right: 0.5 }}
          className="tw-popover-header__icon-slot--left"
        >
          {renderButton(leftPrimaryButton)}
        </ScPopoverHeaderIconSlot>
      ) : null}
      {leftSecondaryButton || rightSecondaryButton ? (
        <ScPopoverHeaderIconSlot
          margin={{ right: 0.5 }}
          className="tw-popover-header__icon-slot--left"
        >
          {renderButton(leftSecondaryButton)}
        </ScPopoverHeaderIconSlot>
      ) : null}
      <InjectLayout
        flexGrow={1}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
        flexDirection={FlexDirection.Column}
        display={Display.Flex}
      >
        <div id={`${popoverId}-header`}>
          {isPopoverHeaderTitleProps(title) ? (
            <PopoverTitle title={title.title} subtitle={title.subtitle} />
          ) : (
            title
          )}
        </div>
      </InjectLayout>
      {leftSecondaryButton || rightSecondaryButton ? (
        <ScPopoverHeaderIconSlot
          margin={{ left: 0.5 }}
          className="tw-popover-header__icon-slot--right"
        >
          {renderButton(rightSecondaryButton)}
        </ScPopoverHeaderIconSlot>
      ) : null}
      {leftPrimaryButton || rightPrimaryButton ? (
        <ScPopoverHeaderIconSlot
          margin={{ left: 0.5 }}
          className="tw-popover-header__icon-slot--right"
        >
          {renderButton(rightPrimaryButton, true)}
        </ScPopoverHeaderIconSlot>
      ) : null}
    </ScPopoverHeader>
  );
};

function renderButton(
  props: ButtonIconProps | CloseButtonProps | undefined,
  closeButton: boolean = false,
) {
  if (!props) {
    return null;
  }
  const button = closeButton ? (
    <CoreDismissible
      {...(props as CloseButtonProps)}
      variant={ButtonIconType.Secondary}
      title={undefined}
    />
  ) : (
    <ButtonIcon
      {...(props as ButtonIconProps)}
      variant={ButtonIconType.Secondary}
      title={undefined}
    />
  );
  return props.title ? (
    <AttachedTooltip
      label={props.title}
      align={TooltipAlign.Center}
      direction={TooltipDirection.Bottom}
    >
      {button}
    </AttachedTooltip>
  ) : (
    button
  );
}

function isPopoverHeaderTitleProps(
  titleProps: PopoverTitleProps | ReactNode,
): titleProps is PopoverTitleProps {
  return !!(titleProps && titleProps.hasOwnProperty("title"));
}

PopoverHeaderComponent.displayName = "PopoverHeader";
export const PopoverHeader = withOverlayContext(PopoverHeaderComponent);
