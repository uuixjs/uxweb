import { createContext, FC, useCallback, useMemo, useRef } from "react";

type ReactModalConfigContext = {
  appRootElementId: string;
  isReactModalConfigured: () => boolean;
  setReactModalConfigured: () => void;
};

const DEFAULT_APP_ROOT_ELEMENT_ID = "root";

/**
 * Coordinates react-modal configuration from CoreUiRoot, preventing
 * duplicate or clobbering just-in-time registrations by modal and dialog
 * components. Only for internal usage inside the package; not exported.
 */
export const reactModalConfigContext = createContext<ReactModalConfigContext>({
  appRootElementId: DEFAULT_APP_ROOT_ELEMENT_ID,
  isReactModalConfigured: () => false,
  setReactModalConfigured: () => undefined,
});

/**
 * Configuration and coordination abstraction to allow `useConfigureReactModal`
 * in both central and JIT config situations. Only to be used in `CoreUIRoot`.
 * Currently does not support apps that change the id of their root element.
 */
function useReactModalConfigContext(
  appRootElementId: string,
): ReactModalConfigContext {
  const reactModalIsConfiguredRef = useRef(false);
  const isReactModalConfigured = useCallback(
    () => reactModalIsConfiguredRef.current,
    [],
  );
  const setReactModalConfigured = useCallback(() => {
    reactModalIsConfiguredRef.current = true;
  }, []);

  const reactModalConfigCtx = useMemo(
    () => ({
      appRootElementId,
      isReactModalConfigured,
      setReactModalConfigured,
    }),
    [appRootElementId, isReactModalConfigured, setReactModalConfigured],
  );

  return reactModalConfigCtx;
}

type ReactModalRootProps = {
  appRootElementId?: string;
};

export const ReactModalRoot: FC<ReactModalRootProps> = ({
  appRootElementId = DEFAULT_APP_ROOT_ELEMENT_ID,
  children,
}) => {
  const modalCtx = useReactModalConfigContext(appRootElementId);
  return (
    <reactModalConfigContext.Provider value={modalCtx} children={children} />
  );
};
