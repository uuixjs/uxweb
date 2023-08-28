import {
  ButtonHTMLAttributes,
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
} from "react";
import {
  CoreButton,
  CoreButtonSize,
  CoreButtonType,
} from "../core-button";
import {
  CoreInteractiveElement,
  CoreInteractivePublicProps,
} from "../../core-interactive";
import { LoadingButton, LoadingStatus } from "../loading-button";
import { PurchaseButton, PurchaseButtonProps } from "../purchase-button";

import { CoreButtonLabel } from "../core-button/core-button-label";
import { SVGAsset } from "../../svg";
import { StatusAlertButton } from "../status-alert-button";

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Text = "text",
  Alert = "alert",
  Success = "success",
  Warning = "warning",
  Info = "info",
}

export enum ButtonSize {
  Default = "default",
  Small = "small",
  Large = "large",
}

export enum ButtonState {
  Default = "default",
  Loading = "loading",
  Success = "success",
}

export interface ButtonPublicProps extends CoreInteractivePublicProps {
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refHandler` */
  refHandler?: CoreInteractivePublicProps["refHandler"];
  /**
   * The content rendered within the button. This includes the button text.
   *
   * @example Chat
   */
  children?: ReactNode;
  /** Indicates the button will open a dropdown. */
  dropdown?: boolean;
  /** Sets the button to stretch across the width of its container. */
  fullWidth?: boolean;
  /** Displays an icon in the button. */
  icon?: SVGAsset;
  /** Indicates that this button overlays on a darker background. */
  overlay?: boolean;
  /** Size of the button. */
  size?: ButtonSize | "default" | "small" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

  /** The type of button to display. */
  variant?: ButtonType | "primary" | "secondary" | "text" | "alert" | "success"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
}

export interface ButtonStatusAlertButtonProps
  extends CoreInteractivePublicProps {
  /** Icon to display when the status button is hovered.
   *
   * @deprecated use `<StatusAlertButton>` instead.
   */
  statusAlertIcon?: SVGAsset;
  /**
   * Text to display when the status button is hovered. Setting this property
   * turns the button into a "status" button.
   *
   * @deprecated use `<StatusAlertButton>` instead.
   */
  statusAlertText?: string;
  /**
   * The content rendered within the button. This includes the button text.
   *
   * @example Chat
   */
  children: ReactNode;
  /** Size of the button. */
  size?: ButtonSize | "default" | "small" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

  /** The type of button to display. */
  variant?: ButtonType | "primary" | "secondary" | "text" | "alert" | "success"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  /** Displays an icon in the button. */
  icon?: SVGAsset;
  /** Sets the button to stretch across the width of its container. */
  fullWidth?: boolean;
}

export interface ButtonPurchaseButtonProps extends CoreInteractivePublicProps {
  /** Displays a price associated with the button action.
   *
   * @deprecated use PurchaseButton instead.
   */
  purchase?: string;
  /**
   * The content rendered within the button. This includes the button text.
   *
   * @example Chat
   */
  children: ReactNode;
  /** Size of the button. */
  size?: ButtonSize | "default" | "small" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  /** Displays an icon in the button. */
  icon?: SVGAsset;
  /** Sets the button to stretch across the width of its container. */
  fullWidth?: boolean;
}

export interface ButtonLoadingButtonProps extends CoreInteractivePublicProps {
  /**
   * @deprecated use `<LoadingButton>` instead.
   */
  state?: ButtonState | "default" | "loading" | "success"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  /**
   * The content rendered within the button. This includes the button text.
   *
   * @example Chat
   */
  children: ReactNode;
  /** Size of the button. */
  size?: ButtonSize | "default" | "small" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

  /** The type of button to display. */
  variant?: ButtonType | "primary" | "secondary" | "text" | "alert" | "success"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  /** Displays an icon in the button. */
  icon?: SVGAsset;
  /** Sets the button to stretch across the width of its container. */
  fullWidth?: boolean;
}

export type ButtonProps =
  | ButtonPublicProps
  | ButtonStatusAlertButtonProps
  | ButtonPurchaseButtonProps
  | ButtonLoadingButtonProps;

/**
 * Buttons communicate that an action will happen when clicked. Best used as
 * primary actions inside of another component such as a Modals, Cards, and/or
 * forms. **Buttons should never be used for generic links; use CoreLink instead.**
 */
const Button: ForwardRefRenderFunction<
  CoreInteractiveElement,
  ButtonProps &
    // Adding ButtonHTMLAttributes for "type" is a workaround for now to address a common use case; this component may actually render an <a> tag or a <button>!
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type">
> = (props, ref) => {
  const BUTTON_TYPES: { [key: string]: CoreButtonType } = {
    [ButtonType.Primary]: CoreButtonType.Primary,
    [ButtonType.Secondary]: CoreButtonType.Secondary,
    [ButtonType.Text]: CoreButtonType.Text,
    [ButtonType.Alert]: CoreButtonType.Destructive,
    [ButtonType.Warning]: CoreButtonType.Warning,
    [ButtonType.Info]: CoreButtonType.Info,
    [ButtonType.Success]: CoreButtonType.Success,
  };

  const BUTTON_SIZES: { [key: string]: CoreButtonSize } = {
    [ButtonSize.Small]: CoreButtonSize.Small,
    [ButtonSize.Default]: CoreButtonSize.Default,
    [ButtonSize.Large]: CoreButtonSize.Large,
  };

  if (isPurchaseProps(props)) {
    return (
      <PurchaseButton
        ref={ref}
        {...props}
        size={BUTTON_SIZES[props.size || ButtonSize.Default]}
        price={props.purchase as PurchaseButtonProps["price"]}
      />
    );
  }

  const CORE_PROPS = {
    size: BUTTON_SIZES[props.size || ButtonSize.Default],
    variant: BUTTON_TYPES[props.variant || ButtonType.Primary],
  };

  if (isStatusAlertButton(props)) {
    return <StatusAlertButton ref={ref} {...props} {...CORE_PROPS} />;
  }

  if (isLoadingButton(props)) {
    const BUTTON_STATE: { [key: string]: LoadingStatus } = {
      [ButtonState.Default]: LoadingStatus.Default,
      [ButtonState.Loading]: LoadingStatus.Loading,
      [ButtonState.Success]: LoadingStatus.Success,
    };

    return (
      <LoadingButton
        ref={ref}
        {...props}
        {...CORE_PROPS}
        loadingStatus={BUTTON_STATE[props.state || LoadingStatus.Default]}
      />
    );
  }

  const {
    dropdown,
    fullWidth,
    icon,
    overlay,
    size,
    variant,
    ...buttonProps
  } = props;

  return (
    <CoreButton
      {...buttonProps}
      fullWidth={fullWidth}
      overlay={overlay}
      ref={ref}
      size={size ? BUTTON_SIZES[size] : undefined}
      variant={variant ? BUTTON_TYPES[variant] : CoreButtonType.Primary}
    >
      <CoreButtonLabel
        dropdown={dropdown}
        icon={icon}
        size={size ? BUTTON_SIZES[size] : undefined}
      >
        {props.children}
      </CoreButtonLabel>
    </CoreButton>
  );
};

Button.displayName = "Button";
const ComponentWithRef = forwardRef(Button);
export { ComponentWithRef as Button };

function isPurchaseProps(
  props: ButtonProps,
): props is ButtonPurchaseButtonProps {
  return (props as ButtonPurchaseButtonProps).purchase !== undefined;
}

function isStatusAlertButton(
  props: ButtonProps,
): props is ButtonStatusAlertButtonProps {
  return (
    ((props as ButtonStatusAlertButtonProps).statusAlertIcon ||
      (props as ButtonStatusAlertButtonProps).statusAlertText) !== undefined
  );
}

function isLoadingButton(
  props: ButtonProps,
): props is ButtonLoadingButtonProps {
  return (props as ButtonLoadingButtonProps).state !== undefined;
}
