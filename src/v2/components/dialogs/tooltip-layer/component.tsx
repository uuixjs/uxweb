import * as PopperJS from "@popperjs/core";

import { FC, MutableRefObject, useEffect, useState } from "react";
import { PopperProps, usePopper } from "react-popper";
import {
  Transition,
  TransitionDuration,
  TransitionProps,
  TransitionType,
} from "../../transition";

import ReactModal from "react-modal";
import { ScReactModal } from "../utils/sc-react-modal";
import { TooltipPopperArrow } from "./components/tooltip-popper-arrow";
import { cn } from "lib/ui-utils";
import { useDelayedUnmount } from "../utils/use-delayed-unmount";

export interface TooltipLayerProps {
  id?: string;
  /** Show the tooltip when true, hide the tooltip when false */
  show: boolean;
  /** Ref to the element the tooltip should be positioned next to, usually the `<Button>` which opens the tooltip when hovered. */
  anchorRef: PopperProps<{}>["referenceElement"] | null;
  /** Accepts any valid Popper.js options. See https://popper.js.org/docs */
  options?: Partial<PopperJS.Options>;
  /** Allows you to obtain a Ref to the underlying Popper.js instance */
  popperRef?: MutableRefObject<ReturnType<typeof usePopper> | null>;

  /** Callback when tooltip enter transition has completed. */
  onEnterComplete?: () => void;
  /** Callback when tooltip exit transition has completed. */
  onExitComplete?: () => void;

  transitionType?: TransitionProps["type"];
  transitionDuration?: TransitionProps["duration"];

  portalClassName?: string;
}

export const TooltipLayer: FC<TooltipLayerProps> = (props) => {
  const { isMounted, onExitComplete } = useDelayedUnmount(
    props.show,
    props.onExitComplete,
  );

  if (!isMounted) {
    return null;
  }

  return (
    <PortaledPopperWithTransition {...props} onExitComplete={onExitComplete} />
  );
};

// Needs to be its own component so that the usePopper hook runs effect cleanup when it is unmounted
const PortaledPopperWithTransition: FC<TooltipLayerProps> = ({
  popperRef,
  anchorRef,
  ...props
}) => {
  const [dialogRef, setDialogRef] = useState<HTMLDivElement | null>(null);
  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null);

  const popperInstance = usePopper(anchorRef, dialogRef, {
    ...props.options,
    modifiers: [
      {
        name: "arrow",
        options: {
          element: arrowRef,
          padding: 8, // arbitrary number; prevent arrow from reaching rounded corners of tooltip
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, 10], // arbitrary number; creates space between trigger and tooltip container
        },
      },
      ...(props.options?.modifiers || []),
    ],
  });

  useEffect(() => {
    if (popperRef) {
      popperRef.current = popperInstance;
    }
  }, [popperInstance, popperRef]);

  return (
    <ScReactModal
      // Aria props:
      ariaHideApp={false}
      role="tooltip"
      // Behavior props:
      isOpen // always set to true because the parent will handle un-mount when not visible; ReactModal does not remove the portal when not visible
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
      shouldFocusAfterRender={false}
      shouldReturnFocusAfterClose={false}
      style={tooltipLayerModalCss}
      portalClassName={cn(props.portalClassName, "tw-tooltip-layer")}
    >
      <div
        id={props.id}
        ref={setDialogRef}
        style={popperInstance.styles.popper}
        {...popperInstance.attributes.popper}
      >
        <Transition
          type={props.transitionType || TransitionType.ScaleOver}
          duration={props.transitionDuration || TransitionDuration.Short}
          show={props.show}
          transitionInitialMount
          onExitComplete={props.onExitComplete}
          onEnterComplete={props.onEnterComplete}
        >
          <TooltipPopperArrow
            ref={setArrowRef}
            style={popperInstance.styles.arrow}
          />
          {props.children}
        </Transition>
      </div>
    </ScReactModal>
  );
};

const tooltipLayerModalCss: ReactModal.Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    /**
     * Defining a width/height is necessary to allow the tooltip container width to grow normally
     * but also word wrap when the max width of the container is reached. Without a set width
     * the tooltip text breaks on every word.
     */
    width: "100%",
    height: "100%",
    /**
     * pointerEvents: "none" is applied in order to prevent the tooltip content
     * from blocking a mouse interaction during the exit transition of the tooltip.
     * For example: if the mouse moves over the tooltip and an exit transition begins,
     * mouse hover on content below the tooltip is blocked for the duration of the exit
     * transition.
     *
     * It is okay to disable pointer events because there is no supported use case for
     * interacting with content inside of a tooltip; if interaction is required, switch
     * to using DialogLayer which provides aria attributes and keyboard focus assistance
     * required for interactions.
     */
    pointerEvents: "none",
  },
  content: {
    /** BEGIN TEMPORARY SHIM, TO BE REMOVED BY https://jira.xarth.tv/browse/COREUI-3376  */
    color: "var(--color-text-base)",
    /** END TEMPORARY SHIM */
  },
};
