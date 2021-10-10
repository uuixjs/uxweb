import { forwardRef, ForwardRefRenderFunction, MouseEvent } from "react";
import {
  ButtonIcon,
  ButtonIconSize,
  ButtonIconType,
} from "../button/button-icon";
import { CoreInteractivePublicProps } from "../core-interactive";
import { SVGAsset } from "../svg";

export interface CloseButtonProps {
  /**
   * Passes an `aria-label` to the component to provide context to assistive
   * devices. All standard HTML aria attributes are now supported on Core UI
   * components — see https://www.w3.org/TR/html-aria/."
   */
  "aria-label": string;
  /**
   * MouseEvent handler to handle a user clicking on the Close button (x)
   */
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  title?: string;
}

export interface CoreDismissibleProps extends CoreInteractivePublicProps {
  /**
   * @deprecated Use `<OverlayRegion>` instead.
   */
  overlay?: boolean;
  size?: ButtonIconSize | "default" | "small" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  variant?: ButtonIconType | "primary" | "secondary" | "alert" | "success"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
}

const CoreDismissible: ForwardRefRenderFunction<
  HTMLElement,
  CoreDismissibleProps & CloseButtonProps
> = (props, ref) => {
  return (
    <ButtonIcon
      {...props}
      ref={ref}
      title={props.title}
      icon={SVGAsset.Close}
      overlay={props.overlay}
      size={props.size}
      variant={props.variant}
    />
  );
};

CoreDismissible.displayName = "CoreDismissible";
const ComponentWithRef = forwardRef(CoreDismissible);
export { ComponentWithRef as CoreDismissible };
