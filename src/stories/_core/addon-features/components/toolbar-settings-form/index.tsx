import { API } from "@storybook/api";
import { CssVarsModeSelect } from "../css-vars-mode-select";
import { DisableHoverCSSSelect } from "../disable-hover-css-select";
import React from 'react';
import { Spaced } from "@storybook/components";
import { ThemeSelect } from "../theme-select";
import { styled } from "@storybook/theming";

const ScSpacedFlexbox = styled(Spaced)`
  display: flex;
  flex-direction: ${({ col }) => (col ? "row" : "column")};
`;

interface Props {
  api: API;
}

export const ToolbarSettingsForm = (props: Props) => {
  const menuContent = (
    <>
      <div>
        <ThemeSelect api={props.api} />
      </div>
      <div>
        <CssVarsModeSelect api={props.api} />
      </div>
      <div>
        <DisableHoverCSSSelect api={props.api} />
      </div>
    </>
  );

  return <ScSpacedFlexbox col={1}>{menuContent}</ScSpacedFlexbox>;
};
