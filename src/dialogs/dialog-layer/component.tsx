import * as PopperJS from "@popperjs/core";

import {
  FC,
  MutableRefObject,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { PopperProps, usePopper } from "react-popper";
import { Transition, TransitionProps, TransitionType } from "../../transition";

import ReactModal from "react-modal";
import { ScReactModal } from "../utils/sc-react-modal";
import { cn } from "@uuixjs/uuixweb-lib";
import { useConfigureReactModal } from "../utils/use-configure-react-modal";
import { useDelayedUnmount } from "../utils/use-delayed-unmount";

export interface DialogLayerProps {
  /** Show the dialog when true, hide the dialog when false */
  show: boolean;
  /** Ref to the element the dialog should be positioned next to, usually the `<Button>` which opens the dialog when clicked. */
  anchorRef: PopperProps<{}>["referenceElement"] | null;
  /** Accepts any valid Popper.js options. See https://popper.js.org/docs */
  options?: Partial<PopperJS.Options>;
  /** Allows you to obtain a Ref to the underlying Popper.js instance */
  popperRef?: MutableRefObject<ReturnType<typeof usePopper> | null>;

  /** Callback when user clicks outside dialog or presses escape key */
  onRequestClose:
    | ((event: ReactMouseEvent | ReactKeyboardEvent | MouseEvent) => void)
    | null;
  /** Callback when dialog enter transition has completed. */
  onEnterComplete?: () => void;
  /** Callback when dialog exit transition has completed. */
  onExitComplete?: () => void;

  transitionType?: TransitionProps["type"];
  transitionDuration?: TransitionProps["duration"];
  disableCloseOnClickOut?: boolean;
  disableCloseOnEsc?: boolean;
  disableFocusAfterRender?: boolean;
  disableReturnFocusAfterClose?: boolean;
  /**
   * By default, the application root receives the “aria-hidden” attribute while
   * a dialog is open. Use this to prevent adding the “aria-hidden” attribute
   * while the dialog is open.
   */
  disableAriaHideApp?: boolean;

  portalClassName?: string;

  role?: string;
  ["aria-label"]?: string;
  ["aria-labelledby"]?: string;
  ["aria-describedby"]?: string;
  ["aria-modal"]?: boolean | "false" | "true";
}

export const DialogLayer: FC<DialogLayerProps> = (props) => {
  useConfigureReactModal();

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
const PortaledPopperWithTransition: FC<DialogLayerProps> = ({
  popperRef,
  anchorRef,
  onRequestClose,
  disableCloseOnClickOut,
  disableAriaHideApp,
  ...props
}) => {
  const [dialogRef, setDialogRef] = useState<HTMLDivElement | null>(null);

  const popperInstance = usePopper(anchorRef, dialogRef, {
    placement: "bottom-end",
    ...props.options,
  });

  useEffect(() => {
    if (popperRef) {
      popperRef.current = popperInstance;
    }
  }, [popperInstance, popperRef]);

  const onClickOut = useCallback(
    (e: MouseEvent) => {
      if (disableCloseOnClickOut) {
        return;
      }
      if (
        e.target &&
        anchorRef &&
        anchorRef instanceof Element &&
        anchorRef.contains(e.target as HTMLElement)
      ) {
        return;
      }
      if (onRequestClose) {
        onRequestClose(e);
      }
    },
    [anchorRef, onRequestClose, disableCloseOnClickOut],
  );

  useOnClickOutside(dialogRef, onClickOut);

  return (
    <ScReactModal
      // Aria props:
      role={props.role}
      contentLabel={props["aria-label"]}
      aria={{
        labelledby: props["aria-labelledby"],
        describedby: props["aria-describedby"],
      }}
      ariaHideApp={!disableAriaHideApp}
      // Style props:
      style={dialogLayerModalCss}
      portalClassName={cn(props.portalClassName, "tw-dialog-layer")}
      // Behavior props:
      isOpen // always set to true because the parent will handle un-mount when not visible; ReactModal does not remove the portal when not visible
      onRequestClose={onRequestClose || undefined}
      shouldCloseOnEsc={!props.disableCloseOnEsc}
      shouldCloseOnOverlayClick={!disableCloseOnClickOut}
      shouldFocusAfterRender={!props.disableFocusAfterRender}
      shouldReturnFocusAfterClose={!props.disableReturnFocusAfterClose}
    >
      <div
        ref={setDialogRef}
        style={popperInstance.styles.popper}
        {...popperInstance.attributes.popper}
      >
        <Transition
          type={props.transitionType || TransitionType.Fade}
          duration={props.transitionDuration}
          show={props.show}
          transitionInitialMount
          onExitComplete={props.onExitComplete}
          onEnterComplete={props.onEnterComplete}
        >
          {props.children}
        </Transition>
      </div>
    </ScReactModal>
  );
};

const dialogLayerModalCss: ReactModal.Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    /**
     * Set width/height to 1px because even though we don't want the overlay to cover anything,
     * this is how react-modal determines if child contents are tabbable or not and having some
     * height/width set helps react-modal understand the content is visible:
     *
     * See https://github.com/reactjs/react-modal/blob/v3.11.2/src/helpers/tabbable.js#L15-L28
     */
    width: 1,
    height: 1,
  },
  content: {
    /** BEGIN TEMPORARY SHIM, TO BE REMOVED BY https://jira.xarth.tv/browse/COREUI-3376  */
    color: "var(--color-text-base)",
    /** END TEMPORARY SHIM */
  },
};

function useOnClickOutside(
  ref: HTMLElement | null,
  handler: (e: MouseEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref || ref.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
