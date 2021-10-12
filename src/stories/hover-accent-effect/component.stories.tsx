import * as React from "react";

import {
  AccentRegion,
  Aspect,
  AspectRatio,
  Avatar,
  Background,
  BorderRadius,
  ChannelStatusTextIndicator,
  Color,
  CoreImage,
  CoreText,
  Display,
  HoverAccentEffect,
  Interactable,
  Layout,
  Position,
  Title,
  Tower,
  TowerChildWidth,
  TowerGutter,
  generateAccentRegionProps,
} from "v2";
import { Component, FormEvent, useState } from "react";

import { ExampleThumbnails } from "../assets";

export default { title: HoverAccentEffect.displayName };

export function WithAccentRegion() {
  const [color, setColor] = useState("#00FF00");

  return (
    <AccentRegion {...generateAccentRegionProps(color)}>
      <input
        style={{
          width: 60,
          height: 60,
          padding: 1,
        }}
        type="color"
        value={color}
        onChange={(e: FormEvent<HTMLInputElement>) => {
          const value = e.currentTarget.value;
          setColor(value);
        }}
      />
      <Layout margin={{ y: 3 }}>
        <Tower
          childWidth={TowerChildWidth.Large}
          gutterSize={TowerGutter.ExtraSmall}
          placeholderItems={20}
        >
          <div>
            <HoverAccentEffect show>
              <DemoPreviewCard />
            </HoverAccentEffect>
          </div>
        </Tower>
      </Layout>

      <Layout margin={{ top: 2 }}>
        <CoreText>
          The border above will match the color picker (green).
        </CoreText>
      </Layout>
    </AccentRegion>
  );
}

export const withColorProp = () => (
  <Layout margin={{ y: 3 }}>
    <Tower
      childWidth={TowerChildWidth.Large}
      gutterSize={TowerGutter.ExtraSmall}
      placeholderItems={20}
    >
      <div>
        <HoverAccentEffect color={"blue"} show>
          <DemoPreviewCard />
        </HoverAccentEffect>
      </div>
    </Tower>
    <Layout margin={{ top: 2 }}>
      <CoreText>The border above will always be blue.</CoreText>
    </Layout>
  </Layout>
);

export const defaultColor = () => (
  <Layout margin={{ y: 3 }}>
    <Tower
      childWidth={TowerChildWidth.Large}
      gutterSize={TowerGutter.ExtraSmall}
      placeholderItems={20}
    >
      <div>
        <HoverAccentEffect show>
          <DemoPreviewCard />
        </HoverAccentEffect>
      </div>
    </Tower>
    <Layout margin={{ top: 2 }}>
      <CoreText>
        The border above will be Twitch Purple when no other color is specified.
      </CoreText>
    </Layout>
  </Layout>
);

export const examples = () => <HoverAccentEffectPage />;

class HoverAccentEffectPage extends Component {
  public render() {
    return (
      <Layout fullWidth>
        <Layout margin={{ y: 5 }}>
          <Tower
            childWidth={TowerChildWidth.Large}
            gutterSize={TowerGutter.ExtraSmall}
            placeholderItems={20}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <Layout margin={{ y: 1 }} key={i}>
                <HoverAccentEffect>
                  <DemoPreviewCard />
                </HoverAccentEffect>
                <DemoPreviewCardMeta />
              </Layout>
            ))}
          </Tower>
        </Layout>

        <Title>Always Visble</Title>
        <Layout margin={{ y: 3 }}>
          <Tower
            childWidth={TowerChildWidth.Large}
            gutterSize={TowerGutter.ExtraSmall}
            placeholderItems={20}
          >
            <div>
              <HoverAccentEffect show>
                <DemoPreviewCard />
              </HoverAccentEffect>
            </div>
          </Tower>
        </Layout>

        <Title>Transparent Content Support</Title>
        <CoreText>
          The component should be fully transparent and allow whatever is behind
          it to be visible, except for the accent borders.
        </CoreText>
        <Layout margin={{ y: 3 }}>
          <Tower
            childWidth={TowerChildWidth.Large}
            gutterSize={TowerGutter.ExtraSmall}
            placeholderItems={20}
          >
            <div>
              <Layout background={Background.Alt2} padding={3}>
                <HoverAccentEffect show>
                  <Aspect ratio={AspectRatio.Aspect16x9}>
                    <Layout border fullHeight fullWidth />
                  </Aspect>
                </HoverAccentEffect>
              </Layout>
            </div>
          </Tower>
        </Layout>
      </Layout>
    );
  }
}

const DemoPreviewCard = () => (
  <Interactable>
    <Aspect ratio={AspectRatio.Aspect16x9}>
      <CoreImage src={ExampleThumbnails.missing} alt="" />
      <Layout>
        <Layout
          position={Position.Absolute}
          display={Display.InlineBlock}
          attachTop
          attachLeft
          margin={1}
        >
          <ChannelStatusTextIndicator label="Live" />
        </Layout>
        <Layout
          position={Position.Absolute}
          display={Display.InlineBlock}
          attachBottom
          attachLeft
          margin={1}
          padding={{ x: 0.5 }}
          borderRadius={BorderRadius.Medium}
          background={Background.Overlay}
          color={Color.Overlay}
        >
          123k viewers
        </Layout>
      </Layout>
    </Aspect>
  </Interactable>
);

const DemoPreviewCardMeta = () => (
  <Layout display={Display.Flex} margin={{ y: 1 }}>
    <Avatar src="" alt="" size={40} userLogin={undefined} />
    <Layout margin={{ left: 1 }}>
      <CoreText bold>Some Username</CoreText>
      <CoreText>Some subittle</CoreText>
    </Layout>
  </Layout>
);
