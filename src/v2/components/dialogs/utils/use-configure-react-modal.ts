import { useContext, useEffect } from "react";
import ReactModal from "react-modal";
import { reactModalConfigContext } from "../react-modal-root";

export function useConfigureReactModal() {
  const {
    appRootElementId,
    isReactModalConfigured,
    setReactModalConfigured,
  } = useContext(reactModalConfigContext);

  useEffect(() => {
    if (!isReactModalConfigured()) {
      const root = document.getElementById(appRootElementId);
      if (root) {
        ReactModal.setAppElement(root);
        setReactModalConfigured();
      }
    }
  }, [appRootElementId, isReactModalConfigured, setReactModalConfigured]);
}
