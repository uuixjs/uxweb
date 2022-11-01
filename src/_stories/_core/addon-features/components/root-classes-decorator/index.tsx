import { CHANGE_THEME, THEME_STORAGE_KEY } from "../../constants";

import { API } from "@storybook/api";
import { ScFormLabel } from "../sc-form-label";
import { ThemeOption } from "v2";
import { styled } from "@storybook/theming";
import { useEffect } from "react";
import { useStoredTheme } from "../theme.config";

const ScWrapper = styled.div`
  height: 100%;
  display: flex;
  text-transform: capitalize;
`;

const themeOptions: ThemeOption[] = ["system", "dark", "light"];

interface Props {
  api: API;
}

export const ThemeSelect = ({ api }: Props) => {
  const [theme, setTheme] = useStoredTheme<ThemeOption>("light");

  useEffect(() => {
    api.emit(CHANGE_THEME, theme);
  }, [theme, api]);

  return (
    <ScWrapper>
      {themeOptions.map((option) => (
        <ScFormLabel key={option}>
          <input
            name="storybook-theme-select"
            type="radio"
            value={option}
            checked={theme === option}
            onChange={(e) => e.currentTarget.checked && setTheme(option)}
          />
          {option}
        </ScFormLabel>
      ))}
    </ScWrapper>
  );
};
