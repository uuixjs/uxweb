import { FOCUS_VISIBLE_ATTR, newUUIDv4 } from "lib";
import { FocusEvent, useCallback, useRef, useState } from "react";

import { TooltipLayerProps } from "../tooltip-layer";

export interface UseTooltipStateConfig {
  initialValue?: boolean;
  enterDelay?: number;
  id?: string;
}

/**
 * Helper for state management and anchor configuration of a <TooltipLayer>.
 */
export const useTooltipState = ({
  initialValue = false,
  enterDelay = 200,
  id: providedId,
}: UseTooltipStateConfig = {}) => {
  const [generatedId] = useState(providedId || newUUIDv4());
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);
  const [anchorRef, setAnchorRef] = useState<HTMLElement | null>(null);
  const popperRef: TooltipLayerProps["popperRef"] = useRef(null);
  const debounceTimer = useRef<number>();

  function cancelDebounce() {
    if (debounceTimer.current) {
      window.clearTimeout(debounceTimer.current);
    }
  }

  const openWithDelay = useCallback(() => {
    cancelDebounce();
    debounceTimer.current = window.setTimeout(() => {
      setIsOpen(true);
    }, enterDelay);
  }, [enterDelay]);

  const close = useCallback(() => {
    cancelDebounce();
    setIsOpen(false);
  }, []);

  const handleFocus = useCallback((e: FocusEvent<HTMLElement>) => {
    /**
     * A special compatibility with the focus-visible polyfill
     * which will prevent showing the tooltip on focus if it
     * was caused by a mouse click.
     *
     * This is mainly an issue when a button is wrapped in both a
     * tooltip and also a dialog/modal where closing the dialog/modal
     * via click outside would cause focus to be returned to the button.
     *
     * See https://github.com/WICG/focus-visible
     */
    if (
      // The js-focus polyfill is loaded on the page:
      document.querySelector("html[data-js-focus-visible]") !== null &&
      // The current target does not contain an element focused via keyboard:
      e.currentTarget.querySelector(FOCUS_VISIBLE_ATTR) === null &&
      // The current target was not focused via keyboard:
      !e.currentTarget.matches(FOCUS_VISIBLE_ATTR)
    ) {
      return;
    }

    setIsOpen(true);
  }, []);

  return {
    isOpen,
    setIsOpen,
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
      onMouseEnter: openWithDelay,
      onMouseLeave: close,
      onFocus: handleFocus,
      onBlur: close,
      "aria-describedby": generatedId,
    },
    /**
     * Provided for convenience:
     *
     * <TooltipLayer {...tooltipProps}>Hello World</TooltipLayer>
     */
    tooltipProps: {
      show: isOpen,
      anchorRef,
      popperRef,
      id: generatedId,
    },
  };
};
