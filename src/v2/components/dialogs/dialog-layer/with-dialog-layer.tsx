import { ComponentType } from "react";
import { DialogLayer, DialogLayerProps } from "./component";

/**
 * Use this to compose components which are always wrapped in DialogLayers.
 *
 * Example:
 *
 * Instead of
 *
 * <DialogLayer anchorRef={} show={}>
 *   <DropDownMenuWrapper children="Hello World" />
 * </DialogLayer>
 *
 * use this HOC to create:
 *
 * <DropDownMenu anchorRef={} show={} children="Hello World" />
 *
 * @param WrappedComponent
 */
export function withDialogLayer<P>(WrappedComponent: ComponentType<P>) {
  const result = ({
    show,
    anchorRef,
    options,
    popperRef,
    onRequestClose,
    onEnterComplete,
    onExitComplete,
    transitionType,
    transitionDuration,
    disableAriaHideApp,
    disableCloseOnClickOut,
    disableCloseOnEsc,
    disableFocusAfterRender,
    disableReturnFocusAfterClose,
    portalClassName,
    role,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    "aria-modal": ariaModal,
    ...componentProps
  }: DialogLayerProps & P) => (
    <DialogLayer
      show={show}
      anchorRef={anchorRef}
      options={options}
      popperRef={popperRef}
      onRequestClose={onRequestClose}
      onEnterComplete={onEnterComplete}
      onExitComplete={onExitComplete}
      transitionType={transitionType}
      transitionDuration={transitionDuration}
      disableAriaHideApp={disableAriaHideApp}
      disableCloseOnClickOut={disableCloseOnClickOut}
      disableCloseOnEsc={disableCloseOnEsc}
      disableFocusAfterRender={disableFocusAfterRender}
      disableReturnFocusAfterClose={disableReturnFocusAfterClose}
      portalClassName={portalClassName}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-modal={ariaModal}
    >
      <WrappedComponent {...((componentProps as unknown) as P)} />
    </DialogLayer>
  );

  result.displayName = `withDialogLayer(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return result;
}
