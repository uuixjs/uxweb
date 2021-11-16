import {
  FC,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import * as ReactModal from "react-modal";
import { ScReactModal } from "../../dialogs/utils/sc-react-modal";
import { useConfigureReactModal } from "../../dialogs/utils/use-configure-react-modal";
import { Background, Layout, Position, ZIndex } from "../../layout";
import {
  Transition,
  TransitionType,
  TransitionTypeOption,
} from "../../transition";

const backdropStyles: ReactModal.Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    outline: "none",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    /** BEGIN TEMPORARY SHIM, TO BE REMOVED BY https://jira.xarth.tv/browse/COREUI-3376  */
    color: "var(--color-text-base)",
    /** END TEMPORARY SHIM */
  },
};

export interface ModalLayerProps {
  onRequestClose:
    | ((
        event:
          | MouseEvent<Element, MouseEvent>
          | KeyboardEvent<Element>
          | MouseEvent,
      ) => void)
    | null;
  show: boolean;

  transitionType?: TransitionTypeOption;
  backdropTransitionType?: TransitionType.Fade | TransitionType.None;
  backdrop?: boolean | ReactNode;

  // Pass through:
  onEnterComplete?: () => void;
  onExitComplete?: () => void;
  disableCloseOnClickOut?: boolean;
  disableCloseOnEsc?: boolean;
  disableReturnFocusAfterClose?: boolean;

  role?: string;
  ["aria-label"]?: string;
  ["aria-labelledby"]?: string;
  ["aria-describedby"]?: string;
  ["aria-modal"]?: boolean | "false" | "true";
}

export const ModalLayer: FC<ModalLayerProps> = ({
  show,
  onRequestClose,
  transitionType = TransitionType.ScaleOver,
  backdropTransitionType = TransitionType.Fade,
  disableCloseOnClickOut = false,
  disableCloseOnEsc = false,
  disableReturnFocusAfterClose = false,
  backdrop = true,
  ...props
}) => {
  useConfigureReactModal();

  const [isMounted, setIsMounted] = useState(show);

  useEffect(() => {
    if (show) {
      setIsMounted(true);
    }
  }, [show]);

  if (!isMounted) {
    return null;
  }

  let backdropElement;

  if (backdrop === true) {
    /* <Transition> is more performant than using react-modal classNames; those wrap
      the content and we want more than just opacity/transform. transition on
      background-color triggers paint */
    backdropElement = (
      <Transition
        type={backdropTransitionType}
        show={show}
        transitionInitialMount
      >
        <Layout
          position={Position.Absolute}
          attachTop
          attachLeft
          attachRight
          attachBottom
          background={Background.Overlay}
          zIndex={ZIndex.Below} // necessary when the content layer does not establish a stacking context (i.e. has no transition)
        />
      </Transition>
    );
  } else if (typeof backdrop !== "boolean") {
    backdropElement = (
      <Transition
        type={backdropTransitionType}
        show={show}
        transitionInitialMount
      >
        {backdrop}
      </Transition>
    );
  }

  return (
    <ScReactModal
      // Aria props:
      role={props.role}
      contentLabel={props["aria-label"]}
      aria={{
        labelledby: props["aria-labelledby"],
        describedby: props["aria-describedby"],
      }}
      // Style props:
      style={backdropStyles}
      portalClassName="tw-modal-layer"
      // Behavior props:
      isOpen={true}
      onRequestClose={onRequestClose || undefined}
      shouldCloseOnEsc={!disableCloseOnEsc}
      shouldReturnFocusAfterClose={!disableReturnFocusAfterClose}
    >
      {backdropElement}

      <Transition
        type={transitionType}
        show={show}
        transitionInitialMount
        onEnterComplete={props.onEnterComplete}
        onExitComplete={() => {
          setIsMounted(false);
          if (props.onExitComplete) {
            props.onExitComplete();
          }
        }}
        injectChild
      >
        <div
          style={backdropStyles.content}
          onMouseDown={(e) => {
            if (disableCloseOnClickOut) {
              return;
            }
            if (e.target === e.currentTarget && onRequestClose) {
              onRequestClose(e);
            }
          }}
        >
          {props.children}
        </div>
      </Transition>
    </ScReactModal>
  );
};
