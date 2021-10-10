import {
  CHANGE_CSSVARS,
  CHANGE_DISABLEHOVERCSS,
  CHANGE_THEME,
} from "../../constants";
import { FC, useEffect, useRef } from "react";

import { CoreUIRoot } from "v2";
import addons from "@storybook/addons";
import { useStoredCssVarsMode } from "../css-vars-mode-select";
import { useStoredDisableHoverCSS } from "../disable-hover-css-select";
import { useStoredTheme } from "../theme-select";

export const RootClassesDecorator: FC = (props) => {
  const [theme, setTheme] = useStoredTheme();
  const [cssVars, setCssVars] = useStoredCssVarsMode();
  const [disableHoverCSS, setDisableHoverCSS] = useStoredDisableHoverCSS();

  // Connect storybook channel listeners
  const channelRef = useRef(addons.getChannel());
  useEffect(() => {
    const channel = channelRef.current;

    channel.on(CHANGE_THEME, setTheme);
    channel.on(CHANGE_CSSVARS, setCssVars);
    channel.on(CHANGE_DISABLEHOVERCSS, setDisableHoverCSS);

    return () => {
      channel.removeListener(CHANGE_THEME, setTheme);
      channel.removeListener(CHANGE_CSSVARS, setCssVars);
      channel.removeListener(CHANGE_DISABLEHOVERCSS, setDisableHoverCSS);
    };
  }, [setTheme, setCssVars, setDisableHoverCSS]);

  return (
    <CoreUIRoot
      theme={theme}
      cssVars={cssVars}
      disableHoverCSS={disableHoverCSS}
    >
      {props.children}
    </CoreUIRoot>
  );
};
