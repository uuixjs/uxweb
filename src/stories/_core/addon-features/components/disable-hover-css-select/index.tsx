import {
  CHANGE_DISABLEHOVERCSS,
  DISABLEHOVERCSS_STORAGE_KEY,
} from "../../constants";

import { API } from "@storybook/api";
import { ScFormLabel } from "../sc-form-label";
import { useEffect } from "react";
import { useStoredDisableHoverCSS } from "../theme.config";

interface Props {
  api: API;
}

export const DisableHoverCSSSelect = ({ api }: Props) => {
  const [value, setValue] = useStoredDisableHoverCSS();

  useEffect(() => {
    api.emit(CHANGE_DISABLEHOVERCSS, value);
  }, [value, api]);

  return (
    <ScFormLabel>
      <input
        type="checkbox"
        checked={!value}
        onChange={(e) => setValue(!e.currentTarget.checked)}
      />
      Hover CSS
    </ScFormLabel>
  );
};
