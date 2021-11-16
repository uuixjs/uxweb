import {
  CHANGE_CSSVARS,
  CHANGE_DISABLEHOVERCSS,
  CHANGE_THEME,
  THEME_STORAGE_KEY,
} from "../../constants";
import { FC, useEffect, useRef } from "react";
import { useStoredCssVarsMode, useStoredDisableHoverCSS, useStoredTheme } from "../theme.config";

import { CoreUIRoot } from "v2";
import addons from "@storybook/addons";

export const RootClassesDecorator: FC = (props) => {
  const [theme, setTheme] = useStoredTheme<any>("light");
  const [cssVars, setCssVars] = useStoredCssVarsMode<any>();
  const [disableHoverCSS, setDisableHoverCSS] = useStoredDisableHoverCSS<boolean>(false);

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
      cssVars={cssVars} // @ts-ignore
      disableHoverCSS={disableHoverCSS}
    >
      {props.children}
    </CoreUIRoot>
  );
};
