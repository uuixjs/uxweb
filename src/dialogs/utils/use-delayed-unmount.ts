import { useEffect, useState } from "react";

export function useDelayedUnmount(
  show: boolean,
  originalOnExitComplete?: () => void,
) {
  const [isMounted, setIsMounted] = useState(show);

  useEffect(() => {
    if (show) {
      setIsMounted(true);
    }
  }, [show]);

  return {
    isMounted,
    onExitComplete: () => {
      if (originalOnExitComplete) {
        originalOnExitComplete();
      }
      setIsMounted(false);
    },
  };
}
