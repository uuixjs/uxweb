import * as React from "react";

import {
  Animation,
  AnimationDelay,
  AnimationDuration,
  AnimationFillMode,
  AnimationTiming,
  AnimationType,
  Background,
  Display,
  FormGroup,
  JustifyContent,
  Layout,
  OverlayRegion,
  Position,
  SVG,
  SVGAsset,
  Toggle,
  ZIndex,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";

import { useState } from "react";

export default { title: Animation.displayName };

export const Examples = () => {
  const [enabled, setEnabled] = useState(true);
  const [loop, setLoop] = useState(true);

  return (
    <Layout padding={{ top: 5 }}>
      <Layout
        position={Position.Fixed}
        attachTop
        attachLeft
        attachRight
        border
        padding={1}
        background={Background.Overlay}
        elevation={2}
        zIndex={ZIndex.Above}
      >
        <OverlayRegion>
          <Layout display={Display.Flex} justifyContent={JustifyContent.Center}>
            <Layout padding={{ x: 2 }}>
              <FormGroup label="Enabled">
                <Toggle
                  checked={enabled}
                  onChange={(e) => {
                    setEnabled(e.currentTarget.checked);
                  }}
                />
              </FormGroup>
            </Layout>

            <Layout padding={{ x: 2 }}>
              <FormGroup label="Loop">
                <Toggle
                  checked={loop}
                  onChange={(e) => {
                    setLoop(e.currentTarget.checked);
                  }}
                />
              </FormGroup>
            </Layout>
          </Layout>
        </OverlayRegion>
      </Layout>
      <CombinationGenerator
        mode={CombinationMode.Simple}
        fields={[
          {
            propKey: "type",
            propEnum: AnimationType,
            propEnumName: "AnimationType",
          },
          {
            propKey: "delay",
            propEnum: AnimationDelay,
            propEnumName: "AnimationDelay",
          },

          {
            propKey: "duration",
            propEnum: AnimationDuration,
            propEnumName: "AnimationDuration",
          },
          {
            propKey: "fillMode",
            propEnum: AnimationFillMode,
            propEnumName: "AnimationFillMode",
          },
          {
            propKey: "timing",
            propEnum: AnimationTiming,
            propEnumName: "AnimationTiming",
          },
        ]}
      >
        <Animation
          type={AnimationType.SlideInLeft}
          duration={AnimationDuration.ExtraLong}
          enabled={enabled}
          loop={loop}
        >
          <SVG asset={SVGAsset.LogoGlitch} width={40} height={40} />
        </Animation>
      </CombinationGenerator>
    </Layout>
  );
};
