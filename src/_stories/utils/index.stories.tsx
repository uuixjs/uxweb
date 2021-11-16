import * as React from "react";

import { Layout, Typeset } from "v2";
import {
  focusVisible,
  focusVisibleReset,
  staticTokenRule,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";

import styled from "styled-components";

export default { title: "Utils | FocusVisible" };

const ExampleButton = styled.button`
  padding: ${staticTokenRule("space-2")};
  background-color: ${themeTokenRule("color-background-base")};

  width: 100%;
  box-shadow: inset 0 0 0 4px #fff;

  &:hover {
    background-color: ${themeTokenRule("color-background-interactable-hover")};
  }
`;

const FocusVisibleButton = styled(ExampleButton)`
  ${focusVisible`
    background-color: purple;
    color: white;
  `}
`;

const FocusVisibleResetButton = styled(ExampleButton)`
  ${focusVisibleReset`
    background-color: purple;
    color: white;
  `}
`;

export const Example = () => {
  return (
    <>
      <Layout margin={{ bottom: 4 }}>
        <Layout margin={{ bottom: 1 }}>
          <FocusVisibleButton>Focus Visible</FocusVisibleButton>
        </Layout>
        <Typeset>
          <p>
            Styles defined within the <code>focusVisible</code> mixin will
            display ONLY during keyboard interactions.
          </p>
          <p>
            When clicked or tapped, there will be no change to styles because
            the polyfill has defined this as a mouse/touch interaction.
          </p>
          <p>
            When focused with a keyboard, the background and text colors invert
            AND browser focus ring displays.
          </p>
        </Typeset>
      </Layout>
      <Layout margin={{ bottom: 1 }}>
        <FocusVisibleResetButton>Focus Visible Reset</FocusVisibleResetButton>
      </Layout>
      <Typeset>
        <p>
          The <code>focusVisibleReset</code> mixin can be used to declare styles
          that will be displayed when the
          <code>focus-visible</code> polyfill is loaded, but the element is has
          not received the <code>data-focus-visible-added</code> attribute (for
          example, during mouse interactions). This mixin is useful for hiding
          the browser focus ring on all interactive elements during all mouse
          interactions—this is already done in the base <code>core-ui</code>{" "}
          styles.
        </p>
        <p>
          When clicked or tapped, the background and text colors will invert but
          the browser focus ring will not display.
        </p>
        <p>
          When focused with a keyboard, only a browser focus ring will display.
        </p>
      </Typeset>
    </>
  );
};
