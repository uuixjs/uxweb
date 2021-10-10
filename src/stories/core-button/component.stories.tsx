import * as React from "react";

import {
  BorderRadius,
  CoreButton,
  CoreButtonLabel,
  CoreButtonProps,
  CoreButtonRounding,
  CoreButtonSize,
  CoreButtonType,
  Layout,
  Title,
  TitleSize,
  Tower,
  TowerGutter,
} from "v2";
import { ExampleBG, OverlayPreview } from "../components/overlay-preview";

export default { title: CoreButton.displayName };

const renderAllButtonTypes = (
  props?: Pick<CoreButtonProps, "linkTo" | "disabled" | "rounding" | "size">,
) => (
  <Layout padding={1} borderRadius={BorderRadius.Medium} border>
    <Tower gutterSize={TowerGutter.Small}>
      <div>
        <CoreButton {...props}>
          <CoreButtonLabel>Default</CoreButtonLabel>
        </CoreButton>
      </div>
      <div>
        <CoreButton variant={CoreButtonType.Primary} {...props}>
          <CoreButtonLabel>Primary</CoreButtonLabel>
        </CoreButton>
      </div>
      <div>
        <CoreButton variant={CoreButtonType.Secondary} {...props}>
          <CoreButtonLabel>Secondary</CoreButtonLabel>
        </CoreButton>
      </div>
      <div>
        <CoreButton variant={CoreButtonType.Text} {...props}>
          <CoreButtonLabel>Text</CoreButtonLabel>
        </CoreButton>
      </div>
      <div>
        <CoreButton variant={CoreButtonType.Destructive} {...props}>
          <CoreButtonLabel>Destructive</CoreButtonLabel>
        </CoreButton>
      </div>
      <div>
        <CoreButton variant={CoreButtonType.Success} {...props}>
          <CoreButtonLabel>Success</CoreButtonLabel>
        </CoreButton>
      </div>
    </Tower>
  </Layout>
);

export const configurations = () => (
  <>
    <Layout margin={{ bottom: 3 }}>
      <Layout margin={{ bottom: 1 }}>
        <Title>Types</Title>
      </Layout>
      {renderAllButtonTypes()}
    </Layout>

    <Layout margin={{ bottom: 3 }}>
      <Layout margin={{ bottom: 1 }}>
        <Title>As Links</Title>
      </Layout>
      {renderAllButtonTypes({ linkTo: "https://twitch.tv/" })}
    </Layout>

    <Layout margin={{ bottom: 3 }}>
      <Layout margin={{ bottom: 1 }}>
        <Title>Disabled</Title>
      </Layout>
      {renderAllButtonTypes({ disabled: true })}
    </Layout>

    <Layout margin={{ bottom: 3 }}>
      <Title>Size</Title>
      <Layout margin={{ top: 2, bottom: 1 }}>
        <Title size={TitleSize.Small}>Small</Title>
      </Layout>
      {renderAllButtonTypes({ size: CoreButtonSize.Small })}

      <Layout margin={{ top: 2, bottom: 1 }}>
        <Title size={TitleSize.Small}>Default</Title>
      </Layout>
      {renderAllButtonTypes({ size: CoreButtonSize.Default })}

      <Layout margin={{ top: 2, bottom: 1 }}>
        <Title size={TitleSize.Small}>Large</Title>
      </Layout>
      {renderAllButtonTypes({ size: CoreButtonSize.Large })}
    </Layout>

    <Title>Rounding</Title>
    <Layout margin={{ top: 2, bottom: 1 }}>
      <Title size={TitleSize.Small}>Left</Title>
    </Layout>
    {renderAllButtonTypes({ rounding: CoreButtonRounding.Left })}

    <Layout margin={{ top: 2, bottom: 1 }}>
      <Title size={TitleSize.Small}>Default</Title>
    </Layout>
    {renderAllButtonTypes({ rounding: CoreButtonRounding.Default })}

    <Layout margin={{ top: 2, bottom: 1 }}>
      <Title size={TitleSize.Small}>Right</Title>
    </Layout>
    {renderAllButtonTypes({ rounding: CoreButtonRounding.Right })}
  </>
);

// export const examples = () => renderExamples();

export const withOverlay = () => (
  <OverlayPreview defaultBg={ExampleBG.Photo2}>
    <Layout margin={{ bottom: 3 }}>
      <Layout margin={{ bottom: 1 }}>
        <Title>Types</Title>
      </Layout>
      {renderAllButtonTypes()}
    </Layout>

    <Layout margin={{ bottom: 3 }}>
      <Layout margin={{ bottom: 1 }}>
        <Title>As Links</Title>
      </Layout>
      {renderAllButtonTypes({ linkTo: "https://twitch.tv/" })}
    </Layout>

    <Layout margin={{ bottom: 3 }}>
      <Layout margin={{ bottom: 1 }}>
        <Title>Disabled</Title>
      </Layout>
      {renderAllButtonTypes({ disabled: true })}
    </Layout>
  </OverlayPreview>
);

export const withFullWidth = () => (
  <>
    <Layout margin={{ bottom: 2 }}>
      <CoreButton fullWidth>
        <CoreButtonLabel>Default</CoreButtonLabel>
      </CoreButton>
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <CoreButton variant={CoreButtonType.Primary} fullWidth>
        <CoreButtonLabel>Primary</CoreButtonLabel>
      </CoreButton>
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <CoreButton variant={CoreButtonType.Secondary} fullWidth>
        <CoreButtonLabel>Secondary</CoreButtonLabel>
      </CoreButton>
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <CoreButton variant={CoreButtonType.Text} fullWidth>
        <CoreButtonLabel>Text</CoreButtonLabel>
      </CoreButton>
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <CoreButton variant={CoreButtonType.Destructive} fullWidth>
        <CoreButtonLabel>Destructive</CoreButtonLabel>
      </CoreButton>
    </Layout>
  </>
);
