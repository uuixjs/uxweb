import { API } from "@storybook/api";
import { Spaced } from "@storybook/components";
import { styled } from "@storybook/theming";
import { CssVarsModeSelect } from "../css-vars-mode-select";
import { DisableHoverCSSSelect } from "../disable-hover-css-select";
import { ThemeSelect } from "../theme-select";

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
