import * as React from "react";

import {
  Background,
  ButtonIcon,
  FormGroup,
  InputSize,
  Layout,
  OverlayRegion,
  Position,
  SVGAsset,
  TextArea,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";

import { ExampleSection } from "../../components/example-section";

export default { title: TextArea.displayName };

const longTextAreaMessage =
  "This is a long placeholder message that shows the usage of paddingLeft and paddingRight inside of text areas. The text portion of the textArea should not overlap over any icons on the left or the right, regardless of how long the text is. This is a multi-line message that shows that there is no overlap of the text and the icons on the layout when padding is used properly.";

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const examples = () => (
  <CombinationGenerator
    mode={CombinationMode.Simple}
    fields={[
      {
        propKey: "cols",
        propValues: [1, 5, 10],
      },
      {
        propKey: "rows",
        propValues: [1, 5, 10],
      },
      {
        propKey: "size",
        propEnum: InputSize,
        propEnumName: "InputSize",
      },
      {
        propKey: "noResize",
        propValues: [true],
      },
      {
        propKey: "error",
        propValues: [true],
      },
      {
        propKey: "paddingLeft",
        propValues: [0, 35, 100],
      },
      {
        propKey: "paddingRight",
        propValues: [0, 35, 100],
      },
      {
        propKey: "disabled",
        propValues: [true],
      },
      {
        propKey: "placeholder",
        propValues: ["This is a placeholder..."],
      },
    ]}
  >
    <TextArea />
    <TextArea value={loremIpsum} />
  </CombinationGenerator>
);

export const withOverlay = () => (
  <OverlayRegion overlay>
    <Layout background={Background.Overlay}>
      <Layout padding={3}>
        <Layout margin={{ bottom: 2 }}>
          <FormGroup label="Text Area (no value)">
            <TextArea />
          </FormGroup>
        </Layout>

        <Layout margin={{ bottom: 2 }}>
          <FormGroup label="Text Area (with text)">
            <TextArea value={loremIpsum} />
          </FormGroup>
        </Layout>

        <Layout margin={{ bottom: 2 }}>
          <FormGroup label="Error">
            <TextArea value={loremIpsum} error />
          </FormGroup>
        </Layout>

        <Layout margin={{ bottom: 2 }}>
          <FormGroup label="Disabled">
            <TextArea value={loremIpsum} disabled />
          </FormGroup>
        </Layout>
      </Layout>
    </Layout>
  </OverlayRegion>
);

export const chatIconsPaddingLeft = () => (
  <Layout position={Position.Relative}>
    <TextArea
      placeholder="Placeholder"
      paddingLeft={30}
      value={longTextAreaMessage}
    ></TextArea>
    <Layout position={Position.Absolute} attachTop attachLeft>
      <ButtonIcon icon={SVGAsset.Emoticons} aria-label="Emotes" />
    </Layout>
  </Layout>
);

export const chatIconsPaddingRight = () => (
  <Layout margin={{ bottom: 1 }} position={Position.Relative}>
    <TextArea
      placeholder="Placeholder"
      paddingRight={60}
      value={longTextAreaMessage}
    />
    <Layout position={Position.Absolute} attachBottom attachRight>
      <ButtonIcon icon={SVGAsset.Bits} aria-label="Bits" />
      <ButtonIcon icon={SVGAsset.Emoticons} aria-label="Emotes" />
    </Layout>
  </Layout>
);

export const TextAreaLayout = () => (
  <ExampleSection label="as a flex child">
    <div
      style={{
        width: "400px",
        height: "400px",
        border: "2px dashed orange",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <TextArea
        noResize
        rows={6}
        value="This TextArea should exactly fill the dashed orange border on the flex parent container and appear to be about 400px by 400px"
      />
    </div>
  </ExampleSection>
);
