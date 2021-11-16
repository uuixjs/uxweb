import { useCallback, useRef, useState } from "react";
import { DialogLayerProps } from "../dialog-layer";

/**
 * Helper for state management and anchor configuration of a <DialogLayer>.
 *
 * Basic usage:
 *
 *   const { anchorProps, dialogProps, toggle } = useDialogState();
 *
 *   <div {...anchorProps}>
 *     <Button onClick={toggle}>Click me</Button>
 *   </div>
 *   <DialogLayer {...dialogLayerProps}>Hello World</DialogLayer>
 *
 *
 * Advanced usage:
 *
 * const { anchorRef, setAnchorRef, open, close, isOpen } = useDialogState();
 *
 *   <SplitButton
 *     dropdown={{
 *       refHandler: setAnchorRef
 *       onClick: open
 *     }}
 *   />
 *
 *   <DialogLayer
 *     show={isOpen}
 *     anchorRef={anchorRef}
 *     onRequestClose={close}
 *   >
 *     Hello World
 *   </DialogLayer>
 *
 */
export const useDialogState = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);
  const [anchorRef, setAnchorRef] = useState<HTMLElement | null>(null);
  const popperRef: DialogLayerProps["popperRef"] = useRef(null);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((previous) => !previous);
  }, []);

  return {
    isOpen,
    setIsOpen,
    open,
    close,
    toggle,
    anchorRef,
    setAnchorRef,
    popperRef,

    /**
     * Provided for convenience:
     *
     * <button {...anchorProps}>Click me</button>
     */
    anchorProps: {
      ref: setAnchorRef,
      onClick: toggle,
    },
    /**
     * Provided for convenience:
     *
     * <DialogLayer {...dialogProps}>Hello World</DialogLayer>
     */
    dialogProps: {
      show: isOpen,
      onRequestClose: close,
      anchorRef,
      popperRef,
    },
  };
};
