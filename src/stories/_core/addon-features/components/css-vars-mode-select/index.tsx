// @ts-nocheck
import { CHANGE_CSSVARS, CSSVARS_STORAGE_KEY } from "../../constants";

import { API } from "@storybook/api";
import { ScFormLabel } from "../sc-form-label";
import { useEffect } from "react";
import { useStorage } from "beautiful-react-hooks";

export function useStoredCssVarsMode(): [any, any] {
  return useStorage<boolean>(CSSVARS_STORAGE_KEY);
}

interface Props {
  api: API;
}

export const CssVarsModeSelect = ({ api }: Props) => {
  const [value, setValue] = useStoredCssVarsMode();

  useEffect(() => {
    api.emit(CHANGE_CSSVARS, value);
  }, [value, api]);

  return (
    <ScFormLabel>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => setValue(e.currentTarget.checked)}
      />
      CSS Vars
    </ScFormLabel>
  );
};
